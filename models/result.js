const mongoose = require('mongoose');
const { Schema } = mongoose;

const resultSchema = new Schema({
  rollno: {
    type: Number,
    required: [true, "Student rollno is required"],
    unique: true
  },
  name: {
    type: String,
    required: [true, "Student name is required"]
  },
  dob: {
    type: Date,
    required: [true, "Student DOB is required"]
  },
  score: {
    type: Number,
    required: [true, "Student Score is required"],
    min: [0, 'Minimum Marks Can be 0'],
    max: [100, 'Maximum marks can be 100']
  }
});

resultSchema.index({ rollno: 1 }, { unique: true }); 

const Result = mongoose.model('Result', resultSchema);

module.exports = Result;
