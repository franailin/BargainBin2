const express = require('express')
const fs = require('fs')
const app = express()
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const url = 'mongodb://127.0.0.1:27017';
db_name = "BargainBin"

app.get('/', (req, res) => {
    fs.readFile('templates/home.html', (err, data) => {
      if (err) {
        res.writeHead(404, {'Content-Type' : 'text/html'});
        return res.end("404 Not Found");
      }
      
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data); // Once we start populating our database with fake data, we can start replacing the "temps" in home.html
      return res.end()
    })
})

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
        body += chunk;
    });
    req.on('end', () => {
      let newAuthor = JSON.parse(body);
      // mongodb handles json here
      addAuthor1(newAuthor);
    });
})

var server = app.listen(8080, function(){
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})

console.log('Server has started');