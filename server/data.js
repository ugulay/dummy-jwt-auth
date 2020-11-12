const _enums = require("./enums")

const user = [
    {
        "username": "JohnDoe",
        "password": "123",
        "status": _enums.STATUS.ACTIVE,
        "admin" : true
    },
    {
        "username": "MaryDoe",
        "password": "123",
        "status": _enums.STATUS.PASSIVE,
        "admin" : false
    }
]

module.exports = {
    user
}