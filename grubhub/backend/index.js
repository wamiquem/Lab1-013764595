var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');

var buyer = require('./routes/buyer');
var owner = require('./routes/owner');
var upload = require('./routes/upload');
app.use(bodyParser.json());
app.use('/buyer', buyer);
app.use('/owner', owner);
app.use('/upload', upload);

// app.use(cors({ origin: 'http://localhost:4001', credentials: false }));

// app.use(bodyParser.json());

//Route to handle Post Request Call
// app.post('/',function(req,res){
//     console.log("Inside Post Request");
//     console.log("Req Body : ",req.body);

//     try{
//         var result = eval(req.body.expression);
//         res.status(200).json(result);
//     }catch(err){
//         res.status(500).json('Error');
//     }
// });

//start your server on port 3101
app.listen(3101);
console.log("Server Listening on port 3101.");