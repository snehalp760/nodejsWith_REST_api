const express = require("express");
const router = express.Router();
const mysqlConnection = require("../connection");



//get all hotels
router.get("/hotel", (req, res) => {

    mysqlConnection.query("select * from hotel_mst", (err, rows, fields) => {

        if (!err) {
            res.send(rows);
        }
        else {
            console.log(err);
        }

    });
});

//create user
router.post("/createUser", (req, res) => {
    let user = req.body;
    mysqlConnection.query('insert into user_mst (username, pass) values (?,?)', [
        user.username,
        user.pass
    ],
        (err, rows, fields) => {

            if (!err) {
                res.send("user registered successfully.")
            }
            else {
                console.log(err);
            }

        });

});


//add hotel --admin part
router.post("/addHotel", (req, res) => {
    let hotel = req.body;
    mysqlConnection.query('insert into hotel_mst (name, street_address, city, postal_code, price) values (?,?,?,?,?)', [
        hotel.name,
        hotel.street_address,
        hotel.city,
        hotel.postal_code,
        hotel.price
    ],
        (err, rows, fields) => {

            if (!err) {
                res.send("hotel added successfully.")
                return res.json({
                    success: 1,
                    message: "hotel added!"
                });
            }
            else {
                console.log(err);
            }

        });

});


//book the hotel by passing hotel id and user id
//and get booking id as output.
router.post("/bookHotel", (req, res) => {
    let ids = req.body;
    var sql = "SET @user_id = ?;SET @hotel_id = ?;CALL hotel_booking(@user_id, @hotel_id, @booking_id); select @booking_id";


    mysqlConnection.query(sql, [
        ids.user_id,
        ids.hotel_id
    ],
        (err, rows, fields) => {

            if (!err) {
                res.send(rows);
                return res.json({
                    success: 1,
                    message: "please check your booking id below and track the status"
                });

            }
            else {
                console.log(err);
            }

        });

});


//delete booking details 
router.delete("/cancelbooking/:id", (req, res) => {
    mysqlConnection.query('delete from booking_dtl where booking_id = ?', [req.params.id],
        (err, rows, fields) => {

            if (!err) {
                res.send(rows);

            }
            else {
                console.log(err);
            }

        });

});



module.exports = router;