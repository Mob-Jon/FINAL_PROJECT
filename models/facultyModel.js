const mongoose = require('mongoose')
const Schema = mongoose.Schema

const facultySchema = Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    middlename: { type: String, required: false },
    age: { type: Number, required: true },
    address: { type: String, required: true },
    contactnumber: { type: String, required: true },
    course: { type: Array, required: true }
})

const student = mongoose.model("faculty", facultySchema)

module.exports = student