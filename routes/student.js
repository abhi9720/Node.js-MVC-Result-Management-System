const express = require('express');
const router = express.Router();

const studentController = require('../controllers/studentController');

router.get('/', (req, res) => {
  res.render('student-result-form');
});

router.get('/result', studentController.viewResult);

module.exports = router;
