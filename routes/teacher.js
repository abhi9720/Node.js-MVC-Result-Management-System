const express = require('express');
const router = express.Router();

const teacherController = require('../controllers/teacherController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware,  teacherController.showLoginForm );
router.get('/create', authMiddleware , teacherController.showCreateTeacherForm);

router.get('/dashboard',authMiddleware, teacherController.viewDashboard);
router.post('/create', teacherController.createTeacher);
router.post('/login', teacherController.loginTeacher);
router.get('/logout', teacherController.logoutTeacher);






module.exports = router;
