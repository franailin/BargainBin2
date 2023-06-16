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
        console.log('data read: ' + data);
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
        body += chunk;
    });
    req.on('end', () => {
      let newAuthor = JSON.parse(body);
      console.log('login info received:');
      console.log(newAuthor);
      // mongodb handles json here
      //addAuthor1(newAuthor);
    });
})

var server = app.listen(8080, function(){
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})

