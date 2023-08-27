const Result = require('../models/result');
const jwt = require('jsonwebtoken');
const Teacher = require('../models/teacher');
const bcrypt = require('bcrypt');


exports.showLoginForm =  async(req, res) => {
  if(req.teacherId){
    return res.redirect('/teacher/dashboard');
  }
  res.render('teacher-login');
}

exports.showCreateTeacherForm  =  async (req, res) => {
   
  res.render('create-teacher');
}

// return all results
exports.viewDashboard = async (req, res) => {
  try {
    const results = await Result.find();
    res.render('teacher-dashboard', { results });
  } catch (error) {
    console.error('Error fetching results:', error);
    res.render('teacher-dashboard', { error: 'An error occurred while fetching results.' });
  }
};


exports.createTeacher = async (req, res) => {
  
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).render('create-teacher', {
        error: 'All fields are required',
        name,
        email,
        password
      });
    }

    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher) {
      return res.status(401).render('create-teacher', { name, email, password,error: 'Email already exists' });  
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newTeacher = new Teacher({
      name,
      email,
      password: hashedPassword,
    });

    await newTeacher.save();


    res.redirect('/teacher/dashboard');

  
};


exports.loginTeacher = async (req, res) => {
 
    console.log(req.body);
    const { email, password } = req.body;

    console.log(email,password);

    const teacher = await Teacher.findOne({ email });
    if (!teacher) {
         return res.status(401).render('teacher-login', { error: 'Invalid email or password' });  
    }

    const isPasswordMatch = await teacher.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(401).render('teacher-login', { error: 'Invalid email or password' });  
    }

    const token = teacher.generateAuthToken();
    res.cookie('token', token);
    res.redirect('/teacher/dashboard');
   
  
};

exports.logoutTeacher = (req, res) => {
  // Clear the 'token' cookie
  res.clearCookie('token');
  res.redirect('/');
};