const { Router } = require("express")
const router = Router()
const moment = require("moment")
const jwt = require("jsonwebtoken")
const _enums = require("./enums")
const _data = require("./data")
const _middleware = require("./middleware")

router.get('/ping', (req, res, next) => {
    return res.send("pong")
})

router.post('/user/login', async (req, res, next) => {

    try {

        const username = req.body.username
        const password = req.body.password

        let _found = false
        _data.user.forEach(element => {
            if (element.username == username &&
                element.password == password &&
                element.status == _enums.STATUS.ACTIVE) {
                return _found = element
            }
        })

        if (_found !== false) {

            const JWT = await jwt.sign({
                username: username,
                user: _found,
                exp: moment().add(10, 'minutes').unix()
            }, _enums.SECRET)

            return res.json({
                "status": _enums.STATUS.ACTIVE,
                "msg": "LOGGED_IN",
                "data": _found,
                "token": JWT
            })

        }

        return res.json({
            "status": _enums.STATUS.PASSIVE,
            "msg": "USER_NOT_FOUND",
            "data": false,
        })

    } catch (e) {
        next(e)
    }

})

router.get('/user/profile', [_middleware], async (req, res, next) => {

    try {

        let _found = false
        _data.user.forEach(element => {
            if (element.username == req.userData.username) {
                return _found = element
            }
        })

        return res.json({
            "status": _enums.STATUS.ACTIVE,
            "msg": "USER_FOUND",
            "data": _found
        })

    } catch (e) {
        next(e)
    }

})

module.exports = router