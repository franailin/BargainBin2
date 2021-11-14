const express = require('express')
const fs = require('fs')
const app = express()
const port = 8080
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const dbUrl = 'mongodb://127.0.0.1:27017';
const db_name = "BargainBin"
// const db = new MongoClient(dbUrl);
let db;
let dbStories;
let dbCollections;
let dbAuthors;
let dbIsConnected = false;

/* Read later:
https://stackoverflow.com/questions/18650890/keeping-open-a-mongodb-database-connection


*/

/*
testing login data fetching in BargainBin database
json:
{
    name: {
        first: 'Donald',
        last: 'Trump'
    },
    user: 'DT',
    password: 'makeAmericaGr8Again'
}
*/

MongoClient.connect(dbUrl).then(client => {
  db = client.db(db_name)
  dbIsConnected = true
  dbStories = db.collection('stories');
  dbCollections = db.collection('collections');
  dbAuthors = db.collection('authors');
})


// next: want to move connect and close out of this function
// connecting to db should only be done once
async function addAuthor(authorJSON) {
  try {
    // await db.connect();

    let query = {'user': authorJSON.user}
    console.log(dbAuthors)
    let repeatedUsername = await dbAuthors.findOne(query) // returns a document with repeated user or null
    if (repeatedUsername != null) {
      console.log('username repeated');
      // await db.close();
      return null;
    }

    await dbAuthors.insertOne(authorJSON);
  
  } finally {
    // await db.close();
  }  
}
/*
async function addAuthor1(authorJSON) {
  if (!dbIsConnected) {
    console.log('db not connected');
    return new Promise();
  }

  let query = {'user': authorJSON.user}
  let repeatedUsername = await dbAuthors.findOne(query) // returns a document with repeated user or null
  if (repeatedUsername != null) {
    console.log('username repeated');    
    return new Promise();
  }

  await dbAuthors.insertOne(authorJSON);
}
*/

app.get('/', (req, res) => {
  // serve login_form.html

  /*
  fs.readFile('templates/login_form.html').then(data => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  }).catch(err => {
    res.writeHead(404, {'Content-Type': 'text/html'});
    return res.end('404 not found');
  })
  */

  fs.readFile('templates/login_form.html', (err, data) => {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");
    }
 
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  })
})

// in the front end, if you only mention <form action='/login'> and
// nothing else, then no data will be sent and the body will just
// be ''
// 
// that is because without a body-parser, req.body is always undefined.
// https://stackoverflow.com/questions/27237744/node-js-express-html-form-req-body-is-undefined
//

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
    console.log(JSON.stringify(newAuthor))
    // mongodb handles json here
    addAuthor(newAuthor);
  });
})

app.listen(port, () => {
  console.log(`loginServer listening at http://localhost:${port}`);
})



