const express = require('express');
// allows us to bypass CORS
const cors = require('cors');
// allows us to connect to MongoDB Database
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();
var port = process.env.PORT || 3001;
var host = process.env.HOST || '0.0.0.0';

// Middleware Functions
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());



// Setting up connection to the MongDB Atlas
const uri = process.env.ATLAS_URI;
mongoose
  .connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
  .catch(err => console.log(err))

const connection = mongoose.connection;

connection.once('open', () => { console.log('MongoDB database connection established successfully'); })
  .catch(err => console.log(err));

// Importing the CRUD operations allowing updating the database
const exercisesRouter = require('./routes/api/exercises');
const usersRouter = require('./routes/api/users');
const habitsRouter = require('./routes/api/habits');
const blogsRouter = require('./routes/api/blogs');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);
app.use('/habits', habitsRouter);
app.use('/blogs', blogsRouter);

if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
  });
}

app.listen(port, host, function() {
  console.log(`api running on port ${port}`);
 });