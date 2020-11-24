const facultyModel = require('../models/facultyModel')
const parseRequestBody = require("../utils/parseRequestBody");


const getAllTeacher = async(req, res) => {
    try {
        const teachers = await facultyModel.find()
        if (!teachers) {
            return res.status(404).json({
                error: "Error in getting all teachers' information"
            })
        }
        res.status(200).json({
            teachers: teachers
        })
    } catch (error) {
        return res.status(404).json({
            error: error
        })
    }
}

const addTeacher = async(req, res) => {
    try {
        const teacher = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            middlename: req.body.middlename,
            age: req.body.age,
            address: req.body.address,
            contactnumber: req.body.contactnumber,
            course: req.body.course
        }
        const newTeacher = new facultyModel(teacher)
        const all = await newTeacher.save()

        if (!all) {
            return res.status(404).json({
                error: "Error in adding a teacher"
            })
        }
        res.status(200).json({
            message: "added successfully"
        })
    } catch (error) {
        return res.status(404).json({
            error: error
        })
    }
}

const getTeacher = async(req, res) => {
    try {
        const teacher = await facultyModel.find({ _id: req.params.id })

        if (!teacher || teacher.length == 0) {
            return res.status(404).json({
                error: "No teacher recorded with this id"
            })
        }
        res.status(200).json({
            teacher: teacher
        })
    } catch (error) {
        return res.status(404).json({
            error: error
        })
    }
}

const editTeacher = async(req, res) => {
    const updateteacher = parseRequestBody(req.body)
    try {
        const result = await facultyModel.updateOne({ _id: req.params.id }, { $set: updateteacher })

        if (!result) {
            return res.status(404).json({
                error: "Error in updating a teacher"
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

const delTeacher = async(req, res) => {
    try {
        await facultyModel.deleteOne({ _id: req.params.id }, (error, result) => {
            if (error) {
                return res.status(400).json({
                    error: error,
                });
            }

            res.status(200).json({
                message: "Successfully deleting a tacher record",
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
    getAllTeacher,
    addTeacher,
    getTeacher,
    editTeacher,
    delTeacher
}