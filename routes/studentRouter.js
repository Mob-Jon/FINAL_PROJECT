const express = require('express')
const router = express.Router()

const studentController = require('../controllers/studentController')

router.get("/", studentController.getAllStudent)
router.post("/addstudent", studentController.addStudent)
router.get("/:id", studentController.getStudent)
router.patch("/:id", studentController.editStudent)
router.delete("/:id", studentController.delStudent)

module.exports = router