if (process.env.NODE_ENV != "production") {
  require('dotenv').config();
}

const express = require('express');
const cookieParser = require('cookie-parser');
const connectToDB = require('./config/db');
const path = require('path')
var bodyParser = require('body-parser');
var morgan = require('morgan')
const processToken =  require('./middleware/processToken')



const app = express();
const PORT = process.env.PORT || 3000;

// Set up middleware
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'))
// parse application/json
app.use(bodyParser.json())

// Connect to MongoDB
connectToDB();

// Routes
const indexRoutes = require('./routes/index');
app.use('/',  processToken, indexRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error
  res.status(500).render('error'); // Render an error page
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
