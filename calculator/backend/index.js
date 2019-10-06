var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');

app.use(cors({ origin: 'http://localhost:4001', credentials: false }));

app.use(bodyParser.json());

//Route to handle Post Request Call
app.post('/',function(req,res){
    console.log("Inside Post Request");
    console.log("Req Body : ",req.body);

    try{
        var result = eval(req.body.expression);
        console.log("Result=", result);
        res.status(200).json(result);
    }catch(err){
        res.status(500).json('Error');
    }
});

//start your server on port 4002
app.listen(4002);
console.log("Server Listening on port 4002.");