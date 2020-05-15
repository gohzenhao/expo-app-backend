const express = require('express');
const mysql = require('mysql');

const app = express();
app.use(require('body-parser').json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'myexpoapp'
});

db.connect((e) => {
    if(e) {
        console.log(e);
    } else{
        console.log('connected');
    }
})

app.post('/login', (req, res, next) => {
    var username = req.body.username;
    var password = req.body.password;
    let query = db.query(
        "SELECT * FROM user WHERE username = ? AND password = ?", [username, password], (err, row, field) => {
            if(err) {
                console.log(err);
                res.send({success: false, message: 'could not connect to db'});
            }

            if(row.length > 0) {
                res.send({success: true, user: row[0].username});
            } else {
                res.send({success: false, message: 'user not found'});
            }
        }
    );
});
app.listen('5000', () => {
    console.log("Listening on port 5000");
})