try {

    const express = require("express")
    const bodyParser = require("body-parser")
    const cors = require("cors")
    const routes = require("./routes")
    const cluster = require('cluster')
    const enums = require('./enums')

    //Get CPU Cores : number
    const cpuCount = require('os').cpus().length;

    if (cluster.isMaster) {

        for (var i = 0; i < cpuCount; i += 1) {
            cluster.fork();
        }

        cluster.on('exit', function (worker) {
            console.log('Worker %d died :(', worker.id);
            cluster.fork();
        });

    } else {

        var server = express()

        server.use(
            bodyParser.json({ extended: true }),
            bodyParser.urlencoded({ extended: true }),
            cors(),
            routes
        )

        //404
        server.use((req, res) => res.status(404).send("404"))

        //Error handlers
        server.use((err, req, res, next) => {
                console.error(err.stack)
                res.status(500).json({ status: enums.STATUS.ERROR, msg: "INTERNAL_SERVER_ERROR" })
                next(err)
        })

        //Listen
        server.listen((process.env.PORT || 8001), () => {
            console.log(`Dummy backend started -> PID:${process.pid}`)
        })

    }

} catch (e) {
    console.error(e)
}