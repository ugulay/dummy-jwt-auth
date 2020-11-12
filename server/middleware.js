const jwt = require("jsonwebtoken")
const _enums = require("./enums")

_middleware = async (req, res, next) => {

    try {
        // get bearer token from authorization
        const token = req.headers.authorization.split("Bearer ")[1]
        const decodedToken = await jwt.verify(token, _enums.SECRET)
        req.userData = decodedToken
        next()
    } catch (error) {
        return res.status(401).send({
            msg: "FAIL.AUTH_FAILED"
        })
    }

}

module.exports = _middleware