const express = require('express')
const app = express()

const database = require('./services/studentDatabase')
    // const studentController = require('./controllers/studentController')
const router = require('./routes/studentRouter')

// app.use(express.json())
app.set("view engine", "ejs")
app.use(express.static('public'))
app.use("/", router)


database.connect()


app.listen(2000, () => {
    console.log("Port listening to 2000")
})