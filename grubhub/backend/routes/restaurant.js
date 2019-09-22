var express = require('express');
var router = express.Router();
const queries = require('../queries');
const encrypt = require('../encrypt');

router.post('/create',function(req,res){
    console.log("Inside Create Restaurant Post Request");
    console.log("Req Body : ",req.body);
    const restaurant = req.body;

    queries.createRestaurant(restaurant, result => {
        console.log("Number of records inserted: " + result.affectedRows);
        res.status(200).send({message:'Restaurant created'});
    }, err => {
        if(err.code === 'ER_DUP_ENTRY'){
            res.status(401).send({ message: 'A restaurant with this name already exists.' });
        }else{
            res.status(500).send({ error: `Something failed when inserting record. ${err.message}`});
        }
    });
});

router.post('/update',function(req,res){
    console.log("Inside Update Restaurant Post Request");
    console.log("Req Body : ",req.body);
    const restaurant = req.body;

    queries.updateRestaurant(restaurant, result => {
        console.log("Number of records updated: " + result.affectedRows);
        res.status(200).send({message:'Restaurant updated'});
    }, err => {
       res.status(500).send({ error: `Something failed when updating record. ${err.message}`});
        
    });
});

module.exports = router;