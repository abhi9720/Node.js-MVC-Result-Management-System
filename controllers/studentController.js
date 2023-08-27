const Result = require('../models/result');

// Controller to handle viewing a student's result
exports.viewResult = async (req, res) => {
  const { rollno, dob } = req.query;

  console.log(rollno , dob);
  try {
    const result = await Result.findOne({ rollno, dob });

    if (result) {
      res.render('student-result', { result });
    } else {
      res.render('student-result', { result: null, error: 'No result found for the provided Roll Number and Name.' });
    }
  } catch (error) {
    console.error('Error fetching result:', error);
    res.render('student-result', { error: 'An error occurred while fetching the result.' });
  }
};
