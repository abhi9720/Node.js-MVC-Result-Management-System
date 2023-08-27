const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const teacherSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Teacher Name is required']
  },
  email: {
    type: String,
    required: [true, "Teacher Email is required"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 5
  }
});

teacherSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

teacherSchema.methods.generateAuthToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};
// Add an index on the 'email' field
teacherSchema.index({ email: 1 }, { unique: true }); 

const Teacher = mongoose.model('Teacher', teacherSchema);
module.exports = Teacher;
