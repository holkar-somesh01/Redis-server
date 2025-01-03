const asyncHandler = require("express-async-handler")
const Todo = require("../models/Todo")
const { redis } = require("../utils/redis")
const cron = require('node-cron')

exports.AddTodo = asyncHandler(async (req, res) => {
    const { name, desc } = req.body
    await Todo.create({ name, desc })
    res.json({ message: "Create Successs" })
})
exports.getTodo = asyncHandler(async (req, res) => {
    try {
        const todo = 'todos'
        const exists = await redis.exists(todo)
        let value
        if (exists) {
            value = await redis.get(todo)
            await redis.expire(todo, 10)
            console.log(value, "Data From Direct Redis")
        } else {
            const result = await Todo.find()
            await redis.set(todo, JSON.stringify(result))
            await redis.expire(todo, 10)
            value = await redis.get(todo)
            console.log(JSON.parse(value), "Data From DataBase")
        }
        const parseData = JSON.parse(value)
        res.json({ message: "Fetch Success", result: parseData })
    } catch (err) {
        console.error('Error interacting with Redis:', err)
    }
})
exports.getTodoWithCorn = asyncHandler(async (req, res) => {
    cron.schedule('38 15 25 11 *', async () => {
        console.log('running a task every minute');
        const result = await Todo.find()
        console.log(result)
        res.json({ message: "Fetch Success", result })
    })
})


