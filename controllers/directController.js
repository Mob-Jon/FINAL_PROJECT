const Student = require('../models/studentModel')
const Faculty = require('../models/facultyModel')
const parseRequestBody = require("../utils/parseRequestBody");



module.exports = {
    async homepage(req, res) {
        try {
            const teachers = await Faculty.find()
            const students = await Student.find()
            const student = await Student.findOne({ _id: req.params.id })
            const teacher = await Faculty.findOne({ _id: req.params.id })
            res.render('content', { students: students, teachers: teachers, student: student, teacher: teacher });

        } catch (error) {
            console.log(error);
        }

    },
    async getAllStudent(req, res) {
        try {
            const students = await Student.find()
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
                course: req.body.course,
                yearlevel: req.body.yearlevel,
                schoolyear: req.body.schoolyear
            }

            const newStudent = new Student(student)
            const all = await newStudent.save()

            if (!all) {
                return res.status(404).json({
                    error: "Error in adding student"
                })
            }
            res.redirect('/#student')
            console.log(req.body)
        } catch (error) {
            console.log(error);
            console.log(req.body)
            return res.status(404).json({
                error: error
            })
        }

    },
    async getStudent(req, res) {
        try {
            const students = await Student.find()
            const teachers = await Faculty.find()
            const teacher = await Faculty.findOne({ _id: req.params.id })
            const student = await Student.findOne({ _id: req.params.id })

            if (!student || student.length == 0) {
                return res.status(404).json({
                    error: "No student recorded with this id"
                })
            }
            res.redirect({ student: student, students: students, teachers: teachers, teacher: teacher }, "/#student")
        } catch (error) {
            return res.status(404).json({
                error: error
            })
        }
    },

    async editStudent(req, res) {
        try {

            await Student.updateOne({ _id: req.params.id }, parseRequestBody(req.body), (error) => {
                if (error) {
                    console.log(error);
                    return res.status(404).json({
                        error: error
                    })

                }
                return res.redirect('/')
            })


        } catch (error) {
            // console.log(req.body)
            console.log(error)
            return res.status(404).json({
                error: error
            })
        }
    },
    async delStudent(req, res) {
        try {
            const result = await Student.deleteOne({ _id: req.params.id })
            if (!result) {
                return res.status(400).json({
                    error: "error",
                });
            }
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
            const teachers = Faculty.find()
            if (!teachers) {
                return res.status(404).json({
                    error: "Error in getting all teachers' information"
                })
            }
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
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                middlename: req.body.middlename,
                age: req.body.age,
                gender: req.body.gender,
                address: req.body.address,
                email: req.body.email,
                contact: req.body.contactnumber,
                course: req.body.course,
                yearlevel: req.body.yearlevel
            }
            const newTeacher = new Faculty(teacher)
            const all = await newTeacher.save()

            if (!all) {
                return res.status(404).json({
                    error: "Error in adding a teacher"
                })
            }
            res.redirect('/')
            console.log(req.body);
        } catch (error) {
            console.log(error)
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
        try {
            await Faculty.updateOne({ _id: req.params.id }, parseRequestBody(req.body), (teacher) => {
                if (!teacher) {
                    return res.status(404).json({
                        error: "Error in updating a teacher"
                    })
                }
                return res.redirect('/')
            })
        } catch (error) {
            return res.status(404).json({
                error: error
            })
        }
    },
    async delTeacher(req, res) {
        try {
            const result = await Faculty.deleteOne({ _id: req.params.id })
            if (!result) {
                return res.status(400).json({
                    error: "error",
                });
            }
            res.redirect('/')
        } catch (error) {
            return res.status(404).json({
                error: error
            })
        }

    }

}