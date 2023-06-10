require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dns = require('dns');
// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use('/public', express.static(`${process.cwd()}/public`));
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect('MONGODB', { useNewUrlParser: true, useUnifiedTopology: true });

const urlShortenerSchema = mongoose.Schema({
  short_url: {
    type: Number,
    required: true
  },
  original_url: {
    type: String,
    required: true
  },
});

let UrlShortener = mongoose.model('UrlShortener', urlShortenerSchema);

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint

app.get('/api/shorturl/:short_url', function(req, res) {
  UrlShortener.findOne({
    short_url: req.params.short_url
  }).then(data => res.redirect(data.original_url));
});

app.post('/api/shorturl/', function(req, res) {
  const url = req.body.url;
  dns.lookup(new URL(url).hostname, (err, address, family) => {
    if (err) res.json({error: 'invalid url'});
    UrlShortener.estimatedDocumentCount().then(count => {
      let urlShorten = new UrlShortener({
        short_url: count + 1,
        original_url: url
      });
      urlShorten.save().then(data => res.json(data));
    });
  });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
