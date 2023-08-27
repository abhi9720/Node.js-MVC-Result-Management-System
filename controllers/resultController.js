const Result = require("../models/result");

// Controller to handle displaying the create result form
exports.showCreateForm = (req, res) => {
    res.render('create-result');
};

exports.createRecord = async (req, res) => {
    try {
        const { rollno, name, dob, score } = req.body;
        const newResult = new Result({
            rollno,
            name,
            dob,
            score
        });

        await newResult.save();
        res.redirect('/teacher/dashboard');  
    } catch (error) {
        if (error.code === 11000) {
            // Duplicate entry error
            res.render('create-result', { error: 'Roll Number already exists.', formData : req.body  });
        } else if (error.name === 'ValidationError') {
            // Validation error (missing fields)
            const errorMessages = Object.values(error.errors).map(err => err.message);
            res.render('create-result', { error: errorMessages.join('\n'),  formData : req.body  });
        } else {
            console.error('Error creating record:', error);
            res.render('create-result', { error: 'An error occurred while creating the record.' ,  formData : req.body  });
        }
    }
};


// Controller to handle editing a result record
exports.showEditForm = async (req, res) => {
  const recordId = req.params.id;
  console.log("recordId : ",recordId);
  try {
    const result = await Result.findById(recordId);
    
    if (result) {
      res.render('edit-result', { result });
    } else {
      res.render('edit-result', {  error: 'No record found for the provided ID.' });
    }
  } catch (error) {
    console.error('Error fetching record:', error);
    res.render('edit-result', {  error: 'An error occurred while fetching the record.' });
  }
};


exports.updateRecord = async (req, res) => {
  const recordId = req.params.id;
  try {
    const { rollno, name, dob, score } = req.body;

    const existingRecord = await Result.findById(recordId);

    if (!existingRecord) {
      return res.render('edit-result', { error: 'No record found for this ID.' });
    }

    // Update the properties
    existingRecord.rollno = rollno;
    existingRecord.name = name;
    existingRecord.dob = dob;
    existingRecord.score = score;

    // Run validation on the updated properties
    const validationError = existingRecord.validateSync();
    if (validationError) {
      const errorMessages = Object.values(validationError.errors).map(err => err.message);
      return res.render('edit-result', { error: errorMessages.join('\n'), result: existingRecord });
    }

    await existingRecord.save();

    res.redirect('/teacher/dashboard');  
  } catch (error) {
    console.error('Error updating record:', error);
    res.render('edit-result', { error: 'An error occurred while editing the record.' });
  }
};


exports.deleteRecord = async (req, res) => {
  const recordId = req.params.id;
  try {
    await Result.findByIdAndDelete(recordId);
    res.redirect('/teacher/dashboard');  
  } catch (error) {
    console.error('Error deleting record:', error);
    res.redirect('/teacher/dashboard');  
  }
};

exports.showResultDetails = async (req, res) => {
  const recordId = req.params.id;
  try {
    const result = await Result.findById(recordId);
    res.render('result-details', { result });
  } catch (error) {
    console.error('Error fetching record details:', error);
    res.redirect('/'); // Redirect to the home page with an error message
  }
};

