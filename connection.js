const mysql = require("mysql");

var mysqlConnection = mysql.createConnection({
    host: "localhost",
    user : "root",
    password : "Admin@123",
    database : "test",
    multipleStatements: true
    
});

mysqlConnection.connect((err) =>{
    if(!err){
        console.log("connected");
    }
    else{
        console.log("connection failed"+err);
    }
});

module.exports = mysqlConnection;