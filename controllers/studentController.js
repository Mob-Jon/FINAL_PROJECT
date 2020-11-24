const studentModel = require('../models/studentModel')
const parseRequestBody = require("../utils/parseRequestBody");


const getAllStudent = async(req, res) => {
    try {
        const students = await studentModel.find()
        if (!students) {
            return res.status(404).json({
                error: "Error in getting all students information"
            })
        }
        res.status(200).json({
            students: students
        })
    } catch (error) {
        return res.status(404).json({
            error: error
        })
    }
}

const addStudent = async(req, res) => {
    try {
        const student = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            middlename: req.body.middlename,
            age: req.body.age,
            address: req.body.address,
            contactnumber: req.body.contactnumber,
            course: req.body.course
        }
        const newStudent = new studentModel(student)
        const all = await newStudent.save()

        if (!all) {
            return res.status(404).json({
                error: "Error in adding student"
            })
        }
        res.status(200).json({
            message: "added successfully"
        })
    } catch (error) {
        return res.status(404).json({
            error: error
        })
        console.log(error);
    }
}

const getStudent = async(req, res) => {
    try {
        const student = await studentModel.find({ _id: req.params.id })

        if (!student || student.length == 0) {
            return res.status(404).json({
                error: "No student recorded with this id"
            })
        }
        res.status(200).json({
            student: student
        })
    } catch (error) {
        return res.status(404).json({
            error: error
        })
    }
}

const editStudent = async(req, res) => {
    const updatestudent = parseRequestBody(req.body)
    try {
        const result = await studentModel.updateOne({ _id: req.params.id }, { $set: updatestudent })

        if (!result) {
            return res.status(404).json({
                error: "Error in updating the student"
            })
        }
        res.status(200).json({
            result: result
        })
    } catch (error) {
        return res.status(404).json({
            error: error
        })
    }
}

const delStudent = async(req, res) => {
    try {
        await studentModel.deleteOne({ _id: req.params.id }, (error, result) => {
            if (error) {
                return res.status(400).json({
                    error: error,
                });
            }

            res.status(200).json({
                message: "Successfully deleting a student",
                result: result,
            });
        });
    } catch (error) {
        return response.status(400).json({
            error: error,
        });
    }
}

module.exports = {
    getAllStudent,
    addStudent,
    getStudent,
    editStudent,
    delStudent
}