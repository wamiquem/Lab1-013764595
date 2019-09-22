var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
var queries = require('../queries');
// const con = require('../dbconnection');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
    }
  })
  
var upload = multer({ storage: storage }).single('image');

router.post('/buyer-profile-image', (req, res) => {
    upload(req, res, function(err){
        if(err){
            res.status(500).send({message: 'Image uploaded failed due to internal issue'});
            return;
        }
        queries.updateBuyerImage({id: req.body.id, image: req.file.filename}, sqlresult => {
            console.log("Number of records updated: " + sqlresult.affectedRows);
            res.status(200).send({message:'Buyer image updated succesfully.'});    
        }, err => {
            res.status(500).json(`Something wrong when updating buyer image in the table. ${err}`);
        }); 
    });
});

router.post('/restaurant-image', (req, res) => {
    upload(req, res, function(err){
        if(err){
            res.status(500).send({message: 'Image uploaded failed due to internal issue'});
            return;
        }
        queries.updateBuyerImage({id: req.body.id, image: req.file.filename}, sqlresult => {
            console.log("Number of records updated: " + sqlresult.affectedRows);
            res.status(200).send({message:'Buyer image updated succesfully.'});    
        }, err => {
            res.status(500).json(`Something wrong when updating buyer image in the table. ${err}`);
        }); 
    });
});

module.exports = router;