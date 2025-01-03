const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors");
const { redis } = require("./utils/redis");
require("dotenv").config()

const app = express();
app.use(cors());
app.use(express.json());

redis.on('connect', () => {
    console.log("Connected to Redis!");
})

app.use("/api", require("./routes/todo.routes"))

app.use("*", (req, res) => {
    res.status(404).json({ message: "Resource NOT Found" })
})
app.use((err, req, res, next) => {
    if (err.status === 429) {
        return res.status(429).json({ status: 429, message: "you can only add 2 todos per minute. Plaese try again later" })
    }
    console.log(err)
    res.status(500).json({ status: 500, message: "Something went wrong", err })
})
mongoose.connect(process.env.MONGO_URL)
mongoose.connection.once("open", () => {
    console.log("MONGO CONNECTED!");
    app.listen(process.env.PORT, console.log("SERVER RUNNING🏃‍♂️"))
})
