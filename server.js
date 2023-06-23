const express = require('express')
const fs = require('fs')
const app = express()
const port = 8080;
const mysql2 = require('mysql2');
const path = require('path');

const db = mysql2.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'BargainBin2'
});

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.get('/login', (req, res) => {
    fs.readFile(path.join(__dirname, 'templates', 'login_form_html.html'), function(err, data) {
        res.send(data);
    });
    //const dynamicContent = '<p>Login Placeholder</p>';

    //res.send(dynamicContent);
})
  
app.post('/create_account', (req, res) => {
  // get json string from req
  let body = '';
  req.setEncoding('utf8'); // Get the data as utf8 strings
  req.on('error', err => {
    console.error(err);
  });
  req.on('data', chunk => {
    body += chunk;
  });
  req.on('end', () => {
    let newAuthor = JSON.parse(body);
    let firstName = newAuthor.name.first;
    let lastName = newAuthor.name.last;
    let userName = newAuthor.user;
    let password = newAuthor.password;

    console.log('new user: ');
    console.log(newAuthor);
  
    db.query("SELECT * FROM author WHERE first_name = ? AND last_name = ?", [firstName, lastName], (error, results) => {
      if (error) {
        res.status(500).json({ message: "An error occurred while processing your request." });
      } else {
        if (results.length > 0) {
          res.status(401).json({ message: "user already existed." });
        } else {
          insertQuery = 'INSERT INTO author (first_name, last_name, username, pwd) VALUES(?, ?, ?, ?);';
          db.query(insertQuery, [firstName, lastName, userName, password]);
          // how do you deal with primary key:
          // https://stackoverflow.com/questions/59964895/node-js-doesnt-insert-primary-key-in-mysql-table
          // https://stackoverflow.com/questions/1485668/how-to-set-initial-value-and-auto-increment-in-mysql
        }
      }
    });
  


  });
})

var server = app.listen(8080, function(){
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})

