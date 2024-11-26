const { default: Redis } = require("ioredis")
require("dotenv").config()

// const redis = new Redis({
//     host: process.env.REDIS_HOST,
//     port: process.env.REDIS_PORT || 6379,
// })
const redis = Redis.createClient(process.env.REDIS_URL)
// console.log(process.env.REDIS_URL)

redis.on('error', (err) => {
    console.error("Redis connection error:", err);
})
module.exports = { redis }