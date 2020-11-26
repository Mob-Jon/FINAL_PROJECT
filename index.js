const express = require('express')
const path = require('path')
const app = express()

const database = require('./services/studentDatabase')


app.use(express.static('./public'))
    // app.use("views", path.join(__dirname, "views"))



app.get("/", (req, res) => {
    res.sendFile(path.resolve('views/content.html'));
})

database.connect()

app.listen(2000, () => {
    console.log("Port listening to 2000");
})