const asyncHandler = require("express-async-handler")
const Todo = require("../models/Todo")
const { redis } = require("../utils/redis")
const cron = require('node-cron')

exports.AddTodo = asyncHandler(async (req, res) => {
    await Todo.create(req.body)
    res.json({ message: "Create Successs" })
})
exports.getTodo = asyncHandler(async (req, res) => {
    try {
        const todo = 'todos'
        const exists = await redis.exists(todo)
        let value
        if (exists) {
            console.log("***TRUE****")
            value = await redis.get(todo)
            await redis.expire(todo, 10)
            console.log(value, "Data From Direct Redis")

        } else {
            console.log("***False****")
            const result = await Todo.find()
            await redis.set(todo, JSON.stringify(result))
            await redis.expire(todo, 10)
            // await redis.set(todo, JSON.stringify(result))
            value = await redis.get(todo)
            console.log(JSON.parse(value), "Data From DataBase")
        }
        const parseData = JSON.parse(value)
        // console.log('Value from Redis:', parseData)
        res.json({ message: "Fetch Successs", result: parseData })
    } catch (err) {
        console.error('Error interacting with Redis:', err)
    }
})
// exports.getTodo = asyncHandler(async (req, res) => {
//     cron.schedule('38 15 25 11 *', async () => {
//         console.log('running a task every minute');
//         const result = await Todo.find()
//         console.log(result)
//         res.json({ message: "Fetch Successss", result })
//     })
// })