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
            res.status(200).send({success: true, message:'Buyer created'});
        }, err => {
            if(err.code === 'ER_DUP_ENTRY'){
                res.status(401).send({ success: false, message: 'Email already exists. Plz sign up with a different email id' });
            }else{
                res.status(500).send({ success: false, message: `Something failed when inserting record. ${err.message}`});
            }
        });
    }, err => {
        res.status(500).send({ success: false, error: 'Something failed when gnerating hash' });
    });
});

router.post('/login',function(req,res){
    console.log("Inside Buyer Login Post Request");
    console.log("Req Body : ",req.body);

    const email = req.body.email;
    const password = req.body.password;

    queries.getBuyerPasswordByEmail(email, row => {
        if(row){
            encrypt.confirmPassword(password,row.password, result => {
                if (result){
                    res.cookie('cookie',{id: row.buyer_id},{maxAge: 900000, httpOnly: false, path : '/'});
                    req.session.user = email;
                    res.status(200).json({success: true, message: "Buyer Login successful"});
                }else{
                    res.status(401).json({success: false, message: "Incorrect Password"});
                }
            }, err => {
                res.status(500).json({success: false, message: "Something wrong with bcrypt"});
            });
        }else{
            res.status(401).json({success: false, message: "Email does not exists. Please try again"});
        }
    }, err => {
        res.status(500).json({success: false, message: "Something wrong when reading the record"});
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
    console.log("Inside Buyer Update Password Post Request");
    console.log("Req Body : ",req.body);

    queries.updateBuyerAddress(req.body, sqlresult => {
        console.log("Number of records updated: " + sqlresult.affectedRows);
        res.status(200).send({message:'Buyer address updated succesfully.'});    
    }, err => {
        res.status(500).json(`Something wrong when updating buyer address. ${err}`);
    });
});

router.post('/updateProfile',function(req,res){
    console.log("Inside Buyer Update Profile Post Request");
    console.log("Req Body : ",req.body);

    queries.updateBuyerProfile(req.cookies.cookie.id, req.body, sqlresult => {
        console.log("Number of records updated: " + sqlresult.affectedRows);
        res.status(200).send({message:'Buyer profile updated succesfully.'});    
    }, err => {
        res.status(500).json(`Something wrong when updating buyer profile. ${err}`);
    });
});

router.get('/firstName',function(req,res){
    console.log("Inside First Name Get Request");
    console.log("Req Cookie : ",req.cookies);
 
    queries.getBuyerFirstNameById(req.cookies.cookie.id, row => {
        res.status(200).json({success: true, firstName: row.fname});
    }, err => {
        res.status(500).json({success: false, message: `Something wrong when reading buyer first name. ${err}`});
    })
});

router.get('/details',function(req,res){
    console.log("Inside Details Get Request");
    console.log("Req Cookie : ",req.cookies);
 
    queries.getBuyerDetailsById(req.cookies.cookie.id, row => {
        res.status(200).json({success: true, firstName: row.fname, lastName: row.lname, phone: row.phone,
            street: row.street_address, unit: row.unit_no, city: row.city, state: row.state, zip: row.zip_code});
    }, err => {
        res.status(200).json({success: false, message: `Something wrong when reading buyer first name. ${err}`});
    })
});

module.exports = router;