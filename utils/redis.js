const { default: Redis } = require("ioredis")
require("dotenv").config()

// const redis = Redis.createClient(process.env.REDIS_URL)
const redis = new Redis(process.env.REDIS_URL)
redis.on('error', (err) => {
    console.error("Redis connection error:", err);
})

// const redis = new Redis({
//     host: process.env.REDIS_HOST,
//     port: process.env.REDIS_PORT,
// })

module.exports = { redis }