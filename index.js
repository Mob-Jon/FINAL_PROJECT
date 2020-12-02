const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const database = require('./services/database')
const router = require('./routes/insideRouter')
const PORT = process.env.PORT || 2000



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
    // app.use(express.json())
app.set("view engine", "ejs")
app.use(express.static('public'))

app.use('/', router)



database.connect()


app.listen(PORT, () => {
    console.log(`Connected to port ${PORT}`)
})