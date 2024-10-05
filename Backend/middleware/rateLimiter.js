
const redis = require('./redis-client.js')

function rateLimiter({ secWindow, allowedHits }) {
    return async function (req, res, next) {

        const user_Id = req.params
        const request = await redis.incr(user_Id)
        let expiryTime
        if (request === 1) {
            await redis.expire(user_Id, secWindow)
            expiryTime = secWindow
        } else {
            expiryTime = await redis.expiryTime(user_Id)
        }
        if (request > allowedHits) {
            return req.statusCode(503).json({
                response: 'No more than 20 request in a minute',
                callsInMinutes: request,
                expiryTime
            })
        } else {
            req.request = request
            next()
        }
    }
}

module.exports = rateLimiter