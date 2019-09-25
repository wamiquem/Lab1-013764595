const con = require('./dbconnection');

var queries = {};

queries.createBuyer = (buyer, hash, successcb, failurecb) => {
    let sql = "INSERT INTO buyers (email, password, fname, lname) VALUES ?";
    const values = [buyer.email, hash, buyer.firstName, buyer.lastName]
    con.query(sql, [[values]], function (err, result){
        if (err){
            failurecb(err);
            return;
        }
        successcb(result);
    });
}

queries.getBuyerPasswordByEmail = (email, successcb, failurecb) => {
    let sql = 'SELECT password, buyer_id FROM buyers WHERE email = ?';
    con.query(sql, [email], function (err, row){
        if (err){
            failurecb(err);
            return;
        }
        successcb(row[0]);
    });
}

queries.getBuyerPasswordById = (id, successcb, failurecb) => {
    let sql = 'SELECT password FROM buyers WHERE buyer_id = ?';

    con.query(sql, [id], function (err, row){
        if (err){
            failurecb(err);
            return;
        }
        successcb(row[0]);
    });
}

queries.getBuyerFirstNameById = (id, successcb, failurecb) => {
    let sql = 'SELECT fname FROM buyers WHERE buyer_id = ?';

    con.query(sql, [id], function (err, row){
        if (err){
            failurecb(err);
            return;
        }
        successcb(row[0]);
    });
}

queries.getBuyerDetailsById = (id, successcb, failurecb) => {
    let sql = `SELECT fname, lname, phone, street_address, unit_no, city, state, zip_code
    FROM buyers WHERE buyer_id = ?`;

    con.query(sql, [id], function (err, row){
        if (err){
            failurecb(err);
            return;
        }
        successcb(row[0]);
    });
}

queries.updateBuyerName = (buyer, successcb, failurecb) => {
    let sql = `UPDATE buyers SET fname = ?,  lname = ? WHERE buyer_id = ?`;
    let values = [buyer.fname, buyer.lname, buyer.id];
    
    con.query(sql, values, function (err, result){
        if (err){
            failurecb(err);
            return;
        }
        successcb(result);
    });
}

queries.updateBuyerEmail = (buyer, successcb, failurecb) => {
    let sql = `UPDATE buyers SET email = ? WHERE buyer_id = ?`;
    let values = [buyer.email, buyer.id];
    
    con.query(sql, values, function (err, result){
        if (err){
            failurecb(err);
            return;
        }
        successcb(result);
    });
}

queries.updateBuyerPassword = (buyer, successcb, failurecb) => {
    let sql = `UPDATE buyers SET password = ? WHERE buyer_id = ?`;
    let values = [buyer.password, buyer.id];
    
    con.query(sql, values, function (err, result){
        if (err){
            failurecb(err);
            return;
        }
        successcb(result);
    });
}

queries.updateBuyerAddress = (buyer, successcb, failurecb) => {
    let sql = `UPDATE buyers 
    SET phone = ?, street_address = ?, unit_no = ?, city = ?, state = ?, zip_code = ?
    WHERE buyer_id = ?`;
    let values = [buyer.phone, buyer.street, buyer.unit, buyer.city, buyer.state, buyer.zip, buyer.id];
    
    con.query(sql, values, function (err, result){
        if (err){
            failurecb(err);
            return;
        }
        successcb(result);
    });
}

queries.updateBuyerProfile = (id, buyer, successcb, failurecb) => {
    let sql = `UPDATE buyers 
    SET fname =?, lname =?, phone = ?, street_address = ?, unit_no = ?, city = ?, state = ?, zip_code = ?
    WHERE buyer_id = ?`;
    let values = [buyer.fname, buyer.lname, buyer.phone, buyer.street, buyer.unit, buyer.city, buyer.state, buyer.zip, id];
    
    con.query(sql, values, function (err, result){
        if (err){
            failurecb(err);
            return;
        }
        successcb(result);
    });
}

queries.updateBuyerImage = (buyer, successcb, failurecb) => {
    let sql = `UPDATE buyers 
    SET image = ?
    WHERE buyer_id = ?`;
    let values = [buyer.image, buyer.id];
    con.query(sql, values, function (err, result){
        if (err){
            failurecb(err);
            return;
        }
        successcb(result);
    });
}



queries.createOwner = (owner, hash, successcb, failurecb) => {
    let sql = `INSERT INTO owners 
    (email, password, fname, lname, phone, rest_name, rest_zip) 
    VALUES ?`;
    let values = [owner.email, hash, owner.fname, 
        owner.lname, owner.phone, owner.restName, owner.restZip];
    con.query(sql, [[values]], function (err, result){
        if (err){
            failurecb(err);
            return;
        }
        successcb(result);
    });
}

queries.getOwnerPasswordByEmail = (email, successcb, failurecb) => {
    let sql = 'SELECT password, owner_id FROM owners WHERE email = ?';
    con.query(sql, [email], function (err, row){
        if (err){
            failurecb(err);
            return;
        }
        successcb(row[0]);
    });
}

queries.getOwnerPasswordById = (id, successcb, failurecb) => {
    let sql = 'SELECT password FROM owners WHERE owner_id = ?';

    con.query(sql, [id], function (err, row){
        if (err){
            failurecb(err);
            return;
        }
        successcb(row[0]);
    });
}

queries.getOwnerFirstNameById = (id, successcb, failurecb) => {
    let sql = 'SELECT fname FROM owners WHERE owner_id = ?';

    con.query(sql, [id], function (err, row){
        if (err){
            failurecb(err);
            return;
        }
        successcb(row[0]);
    });
}

queries.getOwnerDetailsById = (id, successcb, failurecb) => {
    let sql = `SELECT fname, lname, phone, rest_name, rest_zip
    FROM owners WHERE owner_id = ?`;

    con.query(sql, [id], function (err, row){
        if (err){
            failurecb(err);
            return;
        }
        successcb(row[0]);
    });
}

queries.updateOwnerName = (owner, successcb, failurecb) => {
    let sql = `UPDATE owners SET fname = ?,  lname = ? WHERE owner_id = ?`;
    let values = [owner.firstName, owner.lastName, owner.id];
    
    con.query(sql, values, function (err, result){
        if (err){
            failurecb(err);
            return;
        }
        successcb(result);
    });
}

queries.updateOwnerEmail = (owner, successcb, failurecb) => {
    let sql = `UPDATE owners SET email = ? WHERE owner_id = ?`;
    let values = [owner.email, owner.id];
    
    con.query(sql, values, function (err, result){
        if (err){
            failurecb(err);
            return;
        }
        successcb(result);
    });
}

queries.updateOwnerPassword = (owner, successcb, failurecb) => {
    let sql = `UPDATE owners SET password = ? WHERE owner_id = ?`;
    let values = [owner.password, owner.id];
    
    con.query(sql, values, function (err, result){
        if (err){
            failurecb(err);
            return;
        }
        successcb(result);
    });
}

queries.updateOwnerProfile = (id, owner, successcb, failurecb) => {
    let sql = `UPDATE owners 
    SET fname =?, lname =?, phone = ?, rest_name = ?, rest_zip = ?
    WHERE owner_id = ?`;
    let values = [owner.fname, owner.lname, owner.phone, owner.restName, owner.restZip, id];
    
    con.query(sql, values, function (err, result){
        if (err){
            failurecb(err);
            return;
        }
        successcb(result);
    });
}

// queries.checkIfRestaurantExists = (ownerId, successcb, failurecb) => {
//     let sql = 'SELECT restaurant_name FROM restaurants WHERE owner_id = ?';
//     con.query(sql, [ownerId], function (err, row){
//         if (err){
//             failurecb(err);
//             return;
//         }
//         if(row.length>0){
//             successcb({message: "Restaurant Exists", exists: true});
//         }else{
//             successcb({message: "Restaurant Does not Exists", exists: false});
//         }
        
//     });
// }

queries.createRestaurant = (ownerId, restaurant, successcb, failurecb) => {
    let sql = `INSERT INTO restaurants 
    (owner_id, name, street_address, city, state, zip, cuisine) 
    VALUES ?`;
    let values = [ownerId, restaurant.name, restaurant.street, restaurant.city, 
        restaurant.state, restaurant.zip, restaurant.cuisine];
    con.query(sql, [[values]], function (err, result){
        if (err){
            failurecb(err);
            return;
        }
        successcb(result);
    });
}

queries.updateRestaurant = (ownerId, restaurant, successcb, failurecb) => {
    let sql = `UPDATE owners 
    SET name = ?, street_address = ?, city =?, state = ?, zip = ?, cuisine = ?
    WHERE owner_id = ?`;
    let values = [restaurant.name, restaurant.street, restaurant.city, 
        restaurant.state, restaurant.zip, restaurant.cuisine, ownerId];
    con.query(sql, [[values]], function (err, result){
        if (err){
            failurecb(err);
            return;
        }
        successcb(result);
    });
}

module.exports = queries;