const _enums = {
    SECRET: "secret",
    STATUS: {
        ERROR: -2,
        DELETED: -1,
        PASSIVE: 0,
        ACTIVE: 1
    }
}

Object.freeze(_enums)

module.exports = _enums