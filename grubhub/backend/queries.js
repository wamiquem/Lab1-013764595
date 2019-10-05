const con = require('./dbconnection');

var queries = {};

queries.createBuyer = (buyer, hash, successcb, failurecb) => {
    let sql = "INSERT INTO buyers (email, password, fname, lname, image) VALUES ?";
    const values = [buyer.email, hash, buyer.firstName, buyer.lastName, 'default_profile_pic.jpg']
    con.query(sql, [[values]], function (err, result){
        if (err){
            failurecb(err);
            return;
        }
        successcb(result);
    });
}

queries.getBuyerPasswordByEmail = (email, successcb, failurecb) => {
    let sql = 'SELECT password, id FROM buyers WHERE email = ?';
    con.query(sql, [email], function (err, row){
        if (err){
            failurecb(err);
            return;
        }
        successcb(row[0]);
    });
}

queries.getBuyerPasswordById = (id, successcb, failurecb) => {
    let sql = 'SELECT password FROM buyers WHERE id = ?';

    con.query(sql, [id], function (err, row){
        if (err){
            failurecb(err);
            return;
        }
        successcb(row[0]);
    });
}

queries.getBuyerFirstNameById = (id, successcb, failurecb) => {
    let sql = 'SELECT fname FROM buyers WHERE id = ?';

    con.query(sql, [id], function (err, row){
        if (err){
            failurecb(err);
            return;
        }
        successcb(row[0]);
    });
}

queries.getBuyerFirstAddressById = (id, successcb, failurecb) => {
    let sql = 'SELECT phone, street, unit_no, city, state, zip_code FROM buyers WHERE id = ?';

    con.query(sql, [id], function (err, row){
        if (err){
            failurecb(err);
            return;
        }
        successcb(row[0]);
    });
}

queries.getBuyerImageNameById = (id, successcb, failurecb) => {
    let sql = 'SELECT image FROM buyers WHERE id = ?';

    con.query(sql, [id], function (err, row){
        if (err){
            failurecb(err);
            return;
        }
        successcb(row[0]);
    });
}

queries.getBuyerDetailsById = (id, successcb, failurecb) => {
    let sql = `SELECT fname, lname, phone, street, unit_no, city, state, zip_code
    FROM buyers WHERE id = ?`;

    con.query(sql, [id], function (err, row){
        if (err){
            failurecb(err);
            return;
        }
        successcb(row[0]);
    });
}

queries.updateBuyerName = (buyer, successcb, failurecb) => {
    let sql = `UPDATE buyers SET fname = ?,  lname = ? WHERE id = ?`;
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
    let sql = `UPDATE buyers SET email = ? WHERE id = ?`;
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
    let sql = `UPDATE buyers SET password = ? WHERE id = ?`;
    let values = [buyer.password, buyer.id];
    
    con.query(sql, values, function (err, result){
        if (err){
            failurecb(err);
            return;
        }
        successcb(result);
    });
}

queries.updateBuyerAddress = (id, buyer, successcb, failurecb) => {
    let sql = `UPDATE buyers 
    SET phone = ?, street = ?, unit_no = ?, city = ?, state = ?, zip_code = ?
    WHERE id = ?`;
    let values = [buyer.phone, buyer.street, buyer.unit, buyer.city, buyer.state, buyer.zip, id];
    
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
    SET fname =?, lname =?, phone = ?, street = ?, unit_no = ?, city = ?, state = ?, zip_code = ?
    WHERE id = ?`;
    let values = [buyer.fname, buyer.lname, buyer.phone, 
        buyer.street, buyer.unit, buyer.city, buyer.state, buyer.zip, id];
    
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
    WHERE id = ?`;
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
    (email, password, fname, lname, phone, rest_name, rest_zip, image) 
    VALUES ?`;
    let values = [owner.email, hash, owner.fname, 
        owner.lname, owner.phone, owner.restName, owner.restZip, 'default_profile_pic.jpg'];
    con.query(sql, [[values]], function (err, result){
        if (err){
            failurecb(err);
            return;
        }
        successcb(result);
    });
}

queries.getOwnerPasswordByEmail = (email, successcb, failurecb) => {
    let sql = 'SELECT password, id FROM owners WHERE email = ?';
    con.query(sql, [email], function (err, row){
        if (err){
            failurecb(err);
            return;
        }
        successcb(row[0]);
    });
}

queries.getOwnerPasswordById = (id, successcb, failurecb) => {
    let sql = 'SELECT password FROM owners WHERE id = ?';

    con.query(sql, [id], function (err, row){
        if (err){
            failurecb(err);
            return;
        }
        successcb(row[0]);
    });
}

queries.getOwnerFirstNameById = (id, successcb, failurecb) => {
    let sql = 'SELECT fname FROM owners WHERE id = ?';

    con.query(sql, [id], function (err, row){
        if (err){
            failurecb(err);
            return;
        }
        successcb(row[0]);
    });
}

queries.getOwnerImageNameById = (id, successcb, failurecb) => {
    let sql = 'SELECT image FROM owners WHERE id = ?';

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
    FROM owners WHERE id = ?`;

    con.query(sql, [id], function (err, row){
        if (err){
            failurecb(err);
            return;
        }
        successcb(row[0]);
    });
}

queries.updateOwnerName = (owner, successcb, failurecb) => {
    let sql = `UPDATE owners SET fname = ?,  lname = ? WHERE id = ?`;
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
    let sql = `UPDATE owners SET email = ? WHERE id = ?`;
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
    let sql = `UPDATE owners SET password = ? WHERE id = ?`;
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
    WHERE id = ?`;
    let values = [owner.fname, owner.lname, owner.phone, owner.restName, owner.restZip, id];
    
    con.query(sql, values, function (err, result){
        if (err){
            failurecb(err);
            return;
        }
        successcb(result);
    });
}

queries.updateOwnerImage = (owner, successcb, failurecb) => {
    let sql = `UPDATE owners 
    SET image = ?
    WHERE id = ?`;
    let values = [owner.image, owner.id];
    con.query(sql, values, function (err, result){
        if (err){
            failurecb(err);
            return;
        }
        successcb(result);
    });
}

// queries.checkIfRestaurantExists = (ownerId, successcb, failurecb) => {
//     let sql = 'SELECT restaurant_name FROM restaurants WHERE id = ?';
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

queries.createRestaurant = (restaurant, successcb, failurecb) => {
    let sql = `INSERT INTO restaurants 
    (id, name, phone, street, city, state, zip, cuisine, image) 
    VALUES ?`;
    let values = [restaurant.ownerId, restaurant.name, restaurant.phone, restaurant.street, restaurant.city, 
        restaurant.state, restaurant.zip, restaurant.cuisine, 'rest_default_image.jpg'];
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
    SET name = ?, street = ?, city =?, state = ?, zip = ?, cuisine = ?
    WHERE id = ?`;
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

queries.getRestaurantIdByOwnerId = (ownerId, successcb, failurecb) => {
    let sql = 'SELECT id FROM restaurants WHERE owner_id = ?';

    con.query(sql, [ownerId], function (err, row){
        if (err){
            failurecb(err);
            return;
        }
        successcb(row[0]);
    });
}

queries.getOwnerIdByRestaurantId = (restId, successcb, failurecb) => {
    let sql = 'SELECT owner_id FROM restaurants WHERE id = ?';

    con.query(sql, [restId], function (err, row){
        if (err){
            failurecb(err);
            return;
        }
        successcb(row[0]);
    });
}

queries.addSection = (section, successcb, failurecb) => {
    let sql = `INSERT INTO sections 
    (rest_id, name) 
    VALUES ?`;
    let values = [section.restId, section.name];
    con.query(sql, [[values]], function (err, result){
        if (err){
            failurecb(err);
            return;
        }
        successcb(result);
    });
}

queries.getSectionByRestaurantId = (restId, successcb, failurecb) => {
    let sql = 'SELECT * FROM sections WHERE rest_id = ?';
    
    con.query(sql, [restId], function (err, result){
        if (err){
            failurecb(err);
            return;
        }
        successcb(result);
    });
}

queries.deleteSection = (id, successcb, failurecb) => {
    let sql = 'DELETE FROM sections WHERE id = ?';
    
    con.query(sql, [id], function (err, result){
        if (err){
            failurecb(err);
            return;
        }
        console.log("No err");
        successcb(result);
    });
}

queries.updateSection = (section, successcb, failurecb) => {
    let sql = `UPDATE sections 
    SET name = ?
    WHERE id = ?`;
    let values = [section.name, section.id];
    
    con.query(sql, values, function (err, result){
        if (err){
            failurecb(err);
            return;
        }
        successcb(result);
    });
}

queries.addMenu = (menu, successcb, failurecb) => {
    let sql = `INSERT INTO menus 
    (section_id, rest_id, name, description, price, image) 
    VALUES ?`;
    let values = [menu.sectionId, menu.restId, menu.name, menu.description, menu.price, 'menu_default_image.png'];
    con.query(sql, [[values]], function (err, result){
        if (err){
            failurecb(err);
            return;
        }
        successcb(result);
    });
}

queries.updateMenuImage = (menu, successcb, failurecb) => {
    let sql = `UPDATE menus 
    SET image = ?
    WHERE id = ?`;
    let values = [menu.image, menu.id];
    con.query(sql, values, function (err, result){
        if (err){
            failurecb(err);
            return;
        }
        successcb(result);
    });
}

queries.deleteMenuBySectionId = (sectionId, successcb, failurecb) => {
    let sql = 'DELETE FROM menus WHERE section_id = ?';
    
    con.query(sql, [sectionId], function (err, result){
        if (err){
            failurecb(err);
            return;
        }
        successcb(result);
    });
}

queries.deleteMenuByMenuId = (menuId, successcb, failurecb) => {
    let sql = 'DELETE FROM menus WHERE id = ?';
    
    con.query(sql, [menuId], function (err, result){
        if (err){
            failurecb(err);
            return;
        }
        successcb(result);
    });
}

queries.getMenuByRestaurantId = (restId, successcb, failurecb) => {
    let sql = `SELECT id, section_id, rest_id, name, description, price 
    FROM menus WHERE rest_id = ?`;
    
    con.query(sql, [restId], function (err, result){
        if (err){
            failurecb(err);
            return;
        }
        successcb(result);
    });
}

queries.getMenuImageNameById = (id, successcb, failurecb) => {
    let sql = 'SELECT image FROM menus WHERE id = ?';

    con.query(sql, [id], function (err, row){
        if (err){
            failurecb(err);
            return;
        }
        successcb(row[0]);
    });
}

queries.updateMenu = (menu, successcb, failurecb) => {
    let sql = `UPDATE menus 
    SET section_id = ?, name = ?, description = ?, price = ?
    WHERE id = ?`;
    let values = [menu.sectionId, menu.name, menu.description, menu.price, menu.id];
    
    con.query(sql, values, function (err, result){
        if (err){
            failurecb(err);
            return;
        }
        successcb(result);
    });
}

queries.createOrder = (order, successcb, failurecb) => {
    let sql = `INSERT INTO orders 
    (buyer_id, buyer_address, restaurant_id, owner_id, status, price) 
    VALUES ?`;
    let values = [order.buyerId, order.buyerAddress, order.restId, order.ownerId,'New', order.price];
    con.query(sql, [[values]], function (err, result){
        if (err){
            failurecb(err);
            return;
        }
        successcb(result);
    });
}

queries.createOrderDetails = (orderId, items, successcb, failurecb) => {
    // const items = [
            //     {name: 'alpha', description: 'describes alpha', value: 1},
            //     ...
            // ];
            
            // db.query(
            //     'INSERT INTO my_table (name, description, value) VALUES ?',
            //     [items.map(item => [item.name, item.description, item.value])],
            //     (error, results) => {...}
            // );
    
    let sql = `INSERT INTO order_details
    (order_id, menu_id, quantity, price) 
    VALUES ?`;
    let values = items.map(item => [orderId, item.id, item.quantity, item.price]);
    con.query(sql, [values], function (err, result){
        if (err){
            failurecb(err);
            return;
        }
        successcb(result);
    });
}

queries.getAllOrders = (owner_id, successcb, failurecb) => {
    let sql = `SELECT o.order_id, b.fname, b.lname, b.unit_no, b.street, b.city, b.zip_code, o.status, o.price 
    FROM orders o, buyers b 
    WHERE o.buyer_id = b.id
    AND o.owner_id = ?`;
    let values = [owner_id];
    
    con.query(sql, values, function (err, result){
        if (err){
            failurecb(err);
            return;
        }
        successcb(result);
    });
}

queries.getMenuItemsByOrderId = (order_id, successcb, failurecb) => {
    let sql = `SELECT  m.name, m.price, o.quantity from order_details o, menus m
    where o.menu_id = m.id
    AND o.order_id = ?`;
    
    con.query(sql, [order_id], function (err, result){
        if (err){
            failurecb(err);
            return;
        }
        successcb(result);
    });
}

queries.updateOrderStatus = (order, successcb, failurecb) => {
    let sql = `UPDATE orders 
    SET status = ?
    WHERE order_id = ?`;
    let values = [order.status, order.id];
    console.log("****=",values);
    
    con.query(sql, values, function (err, result){
        if (err){
            failurecb(err);
            return;
        }
        successcb(result);
    });
}

module.exports = queries;