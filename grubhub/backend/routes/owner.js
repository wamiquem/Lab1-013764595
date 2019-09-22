var express = require('express');
var router = express.Router();
const queries = require('../queries');
const encrypt = require('../encrypt');

router.post('/signup',function(req,res){
    console.log("Inside Owner signup Post Request");
    console.log("Req Body : ",req.body);
    const owner = req.body;

    encrypt.generateHash(owner.password, hash => {
        queries.createOwner(owner, hash, result => {
            console.log("Number of records inserted: " + result.affectedRows);
            res.status(200).send({message:'Owner created'});
        }, err => {
            if(err.code === 'ER_DUP_ENTRY'){
                res.status(401).send({ message: `Email already exists. Plz sign up with a different email id. ${err.message}` });
            }else{
                res.status(500).send({ error: `Something failed when inserting record. ${err.message}`});
            }
        });
    }, err => {
        res.status(500).send({ error: 'Something failed when gnerating hash' });
    });
});

router.post('/login',function(req,res){
    console.log("Inside Owner Login Post Request");
    console.log("Req Body : ",req.body);

    const email = req.body.email;
    const password = req.body.password;

    queries.getOwnerPasswordByEmail(email, row => {
        if(row){
            encrypt.confirmPassword(password,row.password, result => {
                if (result){
                    res.status(200).send({success: true, id: row.owner_id});
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
    const owner = req.body;
    
    queries.getOwnerPasswordById(owner.id, row => {
        encrypt.confirmPassword(owner.password,row.password, result => {
            if (result){
                queries.updateOwnerName(owner, sqlresult => {
                    console.log("Number of records updated: " + sqlresult.affectedRows);
                    res.status(200).send({message:'Owner name updated successfully.'});    
                }, err => {
                    res.status(500).json(`Something wrong when updating owner name. ${err}`);
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
    const owner = req.body;
    
    queries.getOwnerPasswordById(owner.id, row => {
        encrypt.confirmPassword(owner.password,row.password, result => {
            if (result){
                queries.updateOwnerEmail(owner, sqlresult => {
                    console.log("Number of records updated: " + sqlresult.affectedRows);
                    res.status(200).send({message:'Owner email updated succesfully.'});    
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
    const owner = req.body;
    
    queries.getOwnerPasswordById(owner.id, row => {
        encrypt.confirmPassword(owner.oldPassword,row.password, result => {
            if (result){
                encrypt.generateHash(owner.newPassword, hash => {
                    queries.updateOwnerPassword({id: owner.id, password: hash}, sqlresult => {
                    console.log("Number of records updated: " + sqlresult.affectedRows);
                    res.status(200).send({message:'Owner password updated succesfully.'});    
                }, err => {
                    res.status(500).json(`Something wrong when updating owner password. ${err}`);
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

module.exports = router;