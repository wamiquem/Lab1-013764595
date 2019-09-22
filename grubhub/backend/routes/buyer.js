var express = require('express');
var router = express.Router();
const queries = require('../queries');
const encrypt = require('../encrypt');

router.post('/signup',function(req,res){
    console.log("Inside Buyer signup Post Request");
    console.log("Req Body : ",req.body);
    const buyer = req.body;

    encrypt.generateHash(buyer.password, hash => {
        queries.createBuyer(buyer,hash, result => {
            console.log("Number of records inserted: " + result.affectedRows);
            res.status(200).send({message:'Buyer created'});
        }, err => {
            if(err.code === 'ER_DUP_ENTRY'){
                res.status(401).send({ message: 'Email already exists. Plz sign up with a different email id' });
            }else{
                res.status(500).send({ error: `Something failed when inserting record. ${err.message}`});
            }
        });
    }, err => {
        res.status(500).send({ error: 'Something failed when gnerating hash' });
    });
});

router.post('/login',function(req,res){
    console.log("Inside Buyer Login Post Request");
    console.log("Req Body : ",req.body);
    console.log("req.body.email-",req.body.email);

    const email = req.body.email;
    const password = req.body.password;

    queries.getBuyerPasswordByEmail(email, row => {
        if(row){
            encrypt.confirmPassword(password,row.password, result => {
                if (result){
                    res.status(200).send({success: true, id: row.buyer_id});
                }else{
                    res.status(401).json('Incorrect Password. Please try again');
                }
            }, err => {
                res.status(500).json('Something wrong with bcrypt');
            });
        }else{
            res.status(401).json('Email does not exists. Please try again');
        }
    }, err => {
        res.status(500).json('Something wrong when reading the record');
    });
});

router.post('/updateName',function(req,res){
    console.log("Inside Update Name Post Request");
    console.log("Req Body : ",req.body);

    const fname = req.body.firstName;
    const lname = req.body.lastName;
    const password = req.body.password;
    const buyerId = req.body.buyerId;
    
    queries.getBuyerPasswordById(buyerId, row => {
        encrypt.confirmPassword(password,row.password, result => {
            if (result){
                queries.updateBuyerName({id: buyerId, fname: fname, lname: lname}, sqlresult => {
                    console.log("Number of records updated: " + sqlresult.affectedRows);
                    res.status(200).send({message:'Buyer name updated successfully.'});    
                }, err => {
                    res.status(500).json(`Something wrong when updating buyer name. ${err}`);
                })
            }else{
                res.status(401).json('Incorrect Password. Please try again');
            }
        }, err => {
            res.status(500).json(`Something wrong with bcrypt compare. ${err.message}`);
        });     
    },err => {
        res.status(500).json(`Something wrong when reading password by id. ${err.message}`);
    });
});

router.post('/updateEmail',function(req,res){
    console.log("Inside Update Email Post Request");
    console.log("Req Body : ",req.body);

    const email = req.body.email;
    const password = req.body.password;
    const buyerId = req.body.buyerId;
    
    queries.getBuyerPasswordById(buyerId, row => {
        encrypt.confirmPassword(password,row.password, result => {
            if (result){
                queries.updateBuyerEmail({id: buyerId, email: email}, sqlresult => {
                    console.log("Number of records updated: " + sqlresult.affectedRows);
                    res.status(200).send({message:'Buyer email updated succesfully.'});    
                }, err => {
                    res.status(500).json(`Something wrong when updating buyer email. ${err}`);
                })
            }else{
                res.status(401).json('Incorrect Password. Please try again');
            }
        }, err => {
            res.status(500).json(`Something wrong with bcrypt compare. ${err.message}`);
        });     
    },err => {
        res.status(500).json(`Something wrong when reading password by id. ${err.message}`);
    });
});

router.post('/updatePassword',function(req,res){
    console.log("Inside Update Password Post Request");
    console.log("Req Body : ",req.body);

    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    const buyerId = req.body.buyerId;
    
    queries.getBuyerPasswordById(buyerId, row => {
        encrypt.confirmPassword(oldPassword,row.password, result => {
            if (result){
                encrypt.generateHash(newPassword, hash => {
                    queries.updateBuyerPassword({id: buyerId, password: hash}, sqlresult => {
                    console.log("Number of records updated: " + sqlresult.affectedRows);
                    res.status(200).send({message:'Buyer password updated succesfully.'});    
                }, err => {
                    res.status(500).json(`Something wrong when updating buyer password. ${err}`);
                })
                }, err => {
                    res.status(500).json(`Something wrong while bcrypt hashing. ${err}`);
                });    
            }else{
                res.status(401).json('Incorrect Old Password. Please try again');
            }
        }, err => {
            res.status(500).json(`Something wrong with bcrypt compare. ${err.message}`);
        });     
    },err => {
        res.status(500).json(`Something wrong when reading password by id. ${err.message}`);
    });
});

router.post('/updateAddress',function(req,res){
    console.log("Inside Update Password Post Request");
    console.log("Req Body : ",req.body);

    queries.updateBuyerAddress(req.body, sqlresult => {
        console.log("Number of records updated: " + sqlresult.affectedRows);
        res.status(200).send({message:'Buyer address updated succesfully.'});    
    }, err => {
        res.status(500).json(`Something wrong when updating buyer address. ${err}`);
    });
});

module.exports = router;