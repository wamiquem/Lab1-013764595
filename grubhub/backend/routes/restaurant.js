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
            res.status(500).send({ message: `Something failed when inserting record. ${err.message}`});
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
       res.status(500).send({ message: `Something failed when updating record. ${err.message}`});
        
    });
});

router.post('/addSection',function(req,res){
    console.log("Inside Restaurant Add Section Post Request");
    console.log("Req Body : ",req.body);
    const restaurant = req.body;

    queries.getRestaurantIdByOwnerId(req.cookies.cookie.id, result=> {
        queries.addSection({restId: result.id, name: restaurant.name}, row => {
            console.log("Number of records updated: " + row.affectedRows);
            res.status(200).send({message:'Section added', id: row.insertId, restId: result.id});
        }, err=>{
            if(err.code === 'ER_DUP_ENTRY'){
                res.status(401).send({ success: false, message: 'Section with the same name already exists' });
            }else{
                res.status(500).send({ message: `Something failed when adding section in the table. ${err.message}`});
            }
        });
    }, err => {
        res.status(500).send({ message: `Something failed when getting restaurant Id. ${err.message}`});
    });
});

router.get('/sections',function(req,res){
    console.log("Inside Restaurant Sections Get Request");
    console.log("Req Body : ",req.body);

    queries.getRestaurantIdByOwnerId(req.cookies.cookie.id, result=> {
        queries.getSectionByRestaurantId(result.id, row => {
            res.status(200).json({success: true, sections: row});
        }, err=>{
            res.status(500).send({ message: `Something failed when getting sections from the table. ${err.message}`});
        });
    }, err => {
        res.status(500).send({ message: `Something failed when getting restaurant Id. ${err.message}`});
    });
});

router.post('/deleteSection',function(req,res){
    console.log("Inside Restaurant Delete Section Post Request");
    console.log("Req Body : ",req.body);
    const section = req.body;

    queries.deleteMenu(section.id, result => {
        console.log("Number of menus deleted: " + result.affectedRows);
        queries.deleteSection(section.id, row => {
            console.log("Number of section deleted: " + row.affectedRows);
            res.status(200).send({message:'Section deleted'});
        }, err => {
            res.status(500).send({ message: `Something failed when deleting section from the table. ${err.message}`});
        });
    }, err => {
        res.status(500).send({ message: `Something failed when deleting menu from the table. ${err.message}`});
    });
});

router.post('/updateSection',function(req,res){
    console.log("Inside Restaurant Update Section Post Request");
    console.log("Req Body : ",req.body);
    const section = req.body;

    queries.updateSection(section, result => {
        console.log("Number of section updates: " + result.affectedRows);
        res.status(200).send({message:'Section updated'});
    }, err => {
        res.status(500).send({ message: `Something failed when updating section in the table. ${err.message}`});
    })
});

module.exports = router;