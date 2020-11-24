const express = require('express')
const router = express.Router()

const studentController = require('../controllers/studentController')

router.get("/student", studentController.getAllStudent)
router.post("/addstudent", studentController.addStudent)
router.get("/student/:id", studentController.getStudent)
router.patch("/student/:id", studentController.editStudent)
router.delete("/student/:id", studentController.delStudent)

module.exports = router