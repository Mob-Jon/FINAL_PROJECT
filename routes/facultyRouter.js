const express = require('express')
const router = express.Router()

const facultyController = require('../controllers/facultyController')

router.get("/teacher", facultyController.getAllTeacher)
router.post("/addTeacher", facultyController.addTeacher)
router.get("/teacher/:id", facultyController.getTeacher)
router.patch("/teacher/:id", facultyController.editTeacher)
router.delete("/teacher/:id", facultyController.delTeacher)

module.exports = router