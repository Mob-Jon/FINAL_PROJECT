const express = require('express')
const router = express.Router()

const direct = require("../controllers/directController")

router.get('/', direct.homepage)
router.get('/student', direct.getAllStudent)
router.post('/addstudent', direct.addStudent)
router.get('/getstudent/:id', direct.getStudent)
router.post('/modal', direct.getModal)
router.post('/updateStudent/:id', direct.editStudent)
router.post('/deleteStudent/:id', direct.delStudent)
router.get('/teacher', direct.getAllTeacher)
router.post('/addTeacher', direct.addTeacher)
router.get('/updateTeacher/:id', direct.editTeacher)
router.post('/deleteTeacher/:id', direct.delTeacher)


module.exports = router