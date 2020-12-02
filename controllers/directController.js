const studentModel = require('../models/studentModel')
const studentValidator = require('../validation/studentValidation')
const facultyModel = require('../models/facultyModel')
const parseRequestBody = require("../utils/parseRequestBody");
// const { getAllStudent } = require('./studentController');
// const { addTeacher } = require('./facultyController');


module.exports = {
    async homepage(req, res) {
        try {
            const teachers = await facultyModel.find()
            const students = await studentModel.find()
            const student = await studentModel.findOne({ _id: req.params.id })
            const teacher = await facultyModel.findOne({ _id: req.params.id })

            // console.log(students, teachers);
            res.render('content', { students: students, teachers: teachers, student: student, teacher: teacher });

        } catch (error) {
            console.log(error);
        }

    },
    async getAllStudent(req, res) {
        try {
            const students = await studentModel.find()
            if (!students) {
                return res.status(404).json({
                    error: "Error in getting all students information"
                })
            }
            res.render('content', { students: students });
        } catch (error) {
            return res.status(404).json({
                error: error
            })
        }
    },
    async addStudent(req, res) {
        try {
            const student = {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                age: req.body.age,
                gender: req.body.gender,
                address: req.body.address,
                email: req.body.email,
                contactnumber: req.body.contactnumber,
                course: req.body.course,
                year: req.body.year
            }

            const result = Joi.validate(studentValidator, student)
            const { value, error } = result
            const valid = error == null

            if (!valid) {
                console.log(error)
                return res.status(404).json({
                    error: "Error in adding student"
                })
            } else {
                const newStudent = new studentModel(student)
                const all = await newStudent.save()

                res.redirect('/#student')
                console.log(req.body)
            }

            // const newStudent = new studentModel(student)
            // const all = await newStudent.save()

            // if (!all) {
            //     return res.status(404).json({
            //         error: "Error in adding student"
            //     })
            // }
            // // res.status(200).json({
            // //     message: "added successfully",
            // //     all: all
            // // })
            // res.redirect('/#student')
            // console.log(req.body)
        } catch (error) {
            console.log(req.body)
            return res.status(404).json({
                error: error
            })
        }

    },
    async getStudent(req, res) {
        try {
            const student = await studentModel.findOne({ _id: req.params.id })

            if (!student || student.length == 0) {
                return res.status(404).json({
                    error: "No student recorded with this id"
                })
            }
            // res.status(200).json({
            //     student: student
            // })
            res.render('content', { student: student })
        } catch (error) {
            return res.status(404).json({
                error: error
            })
        }
    },

    async getModal(req, res) {
        try {
            const modal = !!req.body.update_modal

            res.render('content', { modal })
        } catch (error) {

        }
    },

    async editStudent(req, res) {
        // const updatestudent = parseRequestBody(req.body)
        try {
            const data = {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                middlename: req.body.middlename,
                age: req.body.age,
                address: req.body.address,
                email: req.body.email,
                contactnumber: req.body.contactnumber,
                course: req.body.course,
                year: req.body.year,
            }
            const result = studentModel.updateOne({ _id: req.params.id }, { $set: data })

            if (!result) {
                console.log("error")
                return res.status(404).json({
                    error: "Error in updating the student"
                })
            }
            // res.status(200).json({
            //     result: result
            // })
            res.redirect('/', { modal })
        } catch (error) {
            console.log("error")
            return res.status(404).json({
                error: error
            })
        }
    },
    async delStudent(req, res) {
        try {
            const result = await studentModel.deleteOne({ _id: req.params.id })
            if (!result) {
                return res.status(400).json({
                    error: "error",
                });
            }
            // $('#student').show()
            res.redirect('/')
        } catch (error) {
            console.log(error);
            return res.status(404).json({
                error: error
            })
        }
    },
    async getAllTeacher(req, res) {
        try {
            const teachers = facultyModel.find()
            if (!teachers) {
                return res.status(404).json({
                    error: "Error in getting all teachers' information"
                })
            }
            // res.status(200).json({
            //         teachers: teachers
            //     })
            res.render('content', { teachers: teachers })
        } catch (error) {
            return res.status(404).json({
                error: error
            })
        }
    },
    async addTeacher(req, res) {
        try {
            const teacher = {
                firstname1: req.body.firstname,
                lastname1: req.body.lastname,
                middlename1: req.body.middlename,
                age1: req.body.age,
                gender1: req.body.gender,
                address1: req.body.address,
                email1: req.body.address,
                contactnumber1: req.body.contactnumber,
                course1: req.body.course
            }
            const newTeacher = new facultyModel(teacher)
            const all = await newTeacher.save()

            if (!all) {
                return res.status(404).json({
                    error: "Error in adding a teacher"
                })
            }
            // res.status(200).json({
            //     message: "added successfully"
            // })
            res.redirect('/')
            console.log(req.body);
        } catch (error) {
            return res.status(404).json({
                error: error
            })
        }
    },
    async getTeacher(req, res) {
        try {
            const teacher = await teacherModel.findOne({ _id: req.params.id })

            if (!teacher || teacher.length == 0) {
                return res.status(404).json({
                    error: "No teacher recorded with this id"
                })
            }
            // res.status(200).json({
            //     teacher: teacher
            // })
            res.render('content', { teacher: teacher })
        } catch (error) {
            return res.status(404).json({
                error: error
            })
        }
    },
    async editTeacher(req, res) {
        const updateteacher = parseRequestBody(req.body)
        try {
            const result = facultyModel.updateOne({ _id: req.params.id }, { $set: updateteacher })

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
    },
    async delTeacher(req, res) {
        try {
            const result = await facultyModel.deleteOne({ _id: req.params.id })
            if (!result) {
                return res.status(400).json({
                    error: "error",
                });
            }

            // res.status(200).json({
            //     message: "Successfully deleting a tacher record",
            //     result: result,
            // });
            res.redirect('/')
        } catch (error) {
            return res.status(404).json({
                error: error
            })
        }

    }

}