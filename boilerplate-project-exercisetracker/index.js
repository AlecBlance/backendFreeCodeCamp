const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require('dotenv').config();

app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true });

const exerciseSchema = mongoose.Schema({
  username: String,
  count: Number,
  log: [{
    description: String,
    duration: Number,
    date: String
  }]
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.post('/api/users', (req, res) => {
  let exercise = new Exercise({
    username: req.body.username
  });
  exercise.save().then(data => res.json({_id: data._id, username: data.username}));
});

app.get('/api/users', (req, res) => {
  Exercise.find()
    .select({username: true, _id: true})
    .exec()
    .then(data => {
      res.send(data);
    })
});

app.post('/api/users/:_id/exercises', (req, res) => {
  const newData = {
      description: req.body.description, 
      duration: req.body.duration,
      date: req.body.date ? new Date(req.body.date).toDateString() : new Date().toDateString()
  };
  Exercise.findOneAndUpdate({
    _id: req.params._id
  }, {
    $inc: {count: 1},
    $push : {log: newData}
  }).then(data => res.json({
    username: data.username, 
    description: newData.description, 
    duration: parseInt(newData.duration), 
    _id: data._id,
    date: newData.date
  }));
});


app.get('/api/users/:_id/logs', (req, res) => {
  const {userId, from, to, limit} = req.query;
  Exercise.findOne({
    _id: req.params._id
  }).select({__v: false}).then(data => {
    if (from) data.log = data.log.filter(exercise => new Date(exercise.date) >= new Date(from));
    if (to) data.log = data.log.filter(exercise => new Date(exercise.date) <= new Date(to));
    if (limit) data.log = data.log.slice(0, parseInt(limit));
    res.json(data);
  });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
});
