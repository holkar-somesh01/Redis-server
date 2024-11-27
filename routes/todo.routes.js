const { AddTodo, getTodo } = require("../controller/Todo.controller")
const { Limiter } = require("../middleware/RateLimit")

const router = require("express").Router()

router
    // .post('/Add', Limiter, AddTodo)
    .post('/Add', AddTodo)
    .get('/get', getTodo)

module.exports = router