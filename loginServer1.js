const express = require('express');
const fs = require('fs');
const app = express();
const port = 8080;
const mysql2 = require('mysql2');
const path = require('path');

const db = mysql2.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'BargainBin2'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

/*
db.end((err) => {
  if (err) {
    console.error('Error closing connection:', err);
  } else {
    console.log('Connection closed');
  }
});
*/

app.get('/', (req, res) => {
  // serve login_form.html
  res.sendFile(path.join(__dirname, 'templates', 'login_form.html'));
});

app.post('/login', (req, res) => {
  //let name = req.body.name;
  //let password = req.body.password;
  //console.log(`name: ${name}`);
  //console.log(`password: ${password}`);
  console.log(`body: ${req.body}`);
  return res.end('received login info');
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
    
    db.query("SELECT * FROM author WHERE first_name = ? AND last_name = ?", [firstName, lastName], (error, results) => {
      if (error) {
        res.status(500).json({ message: "An error occurred while processing your request." });
      } else {
        if (results.length > 0) {
          res.status(401).json({ message: "user already existed." });
        } else {
          db.query('INSERT INTO author VALUES(?, ?, ?, ?, ?);', [1111, firstName, lastName, userName, password]);
          // how do you insert primary key???
          // https://stackoverflow.com/questions/59964895/node-js-doesnt-insert-primary-key-in-mysql-table
        }
      }
    });



  });
})

app.listen(port, () => {
  console.log(`loginServer listening at http://localhost:${port}`);
})



