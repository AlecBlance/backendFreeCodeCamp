let express = require('express');
let bodyParser = require('body-parser')
let app = express();

app.use('/public', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use((req, res, next)=> {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});
app.get('/now', (req, res, next) => {
  req.time = new Date().toString();
  next();
}, (req, res) =>{
  res.send({time: req.time});
})

app.get('/:word/echo', (req, res)=>{
    res.send({echo: req.params.word});
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.post('/name',(req, res)=>{
  res.send({name: `${req.body.first} ${req.body.last}`});
});

app.get('/json', (req, res) => {
    res.json({message: (process.env.MESSAGE_STYLE == 'uppercase') ? 'HELLO JSON' :'Hello json' });
});




































 module.exports = app;
