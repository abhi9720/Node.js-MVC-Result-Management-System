const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/',  authMiddleware, (req, res) => {
  console.log("Here.........");
  res.render('home');
});

router.use('/student', require('./student'));
router.use('/teacher', require('./teacher'));
router.use('/result', require('./result'));


module.exports = router;
