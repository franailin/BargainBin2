const express = require('express')
const fs = require('fs')
const app = express()
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const url = 'mongodb://127.0.0.1:27017';
db_name = "BargainBin"

app.get('/', function(req, res) {
    fs.readFile("G:/Frank/Website Project/templates/record.html", 'utf8', function(err, data){
        
    })
})

var server = app.listen(8081, function(){
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})

console.log('Server has started');