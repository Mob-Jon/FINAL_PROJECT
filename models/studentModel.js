const mongoose = require('mongoose')
const { string } = require('joi')
const Schema = mongoose.Schema

const studentSchema = Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true },
    course: { type: String, required: true },
    yearlevel: { type: String, required: true },
    schoolyear: { type: String, required: true }
})

const student = mongoose.model("student", studentSchema)

module.exports = student