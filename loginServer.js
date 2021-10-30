const express = require('express')
const fs = require('fs')
const app = express()
const port = 8080
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const dbUrl = 'mongodb://127.0.0.1:27017';
const db_name = "BargainBin"
const db = new MongoClient(dbUrl);

/*
testing login data fetching in BargainBin database
json:
{
    name: {
        first: 'Donald',
        last: 'Trump'
    }
    password: 'makeAmericaGr8Again'
}
*/

async function run() {
    try {
      // Connect the client to the server
      await db.connect();      
      let dbo = db.db(db_name);

      let donaldTrump = {
        name: {
            first: 'Donald',
            last: 'Trump'
        },
        password: 'makeAmericaGr8Again'
      } 

      await dbo.collection('authors').insertOne(donaldTrump).then(() => {
        console.log('1 document inserted');
      })

    } finally {
      // Ensures that the client will close when you finish/error
      await db.close();
    }
}
//run().catch(console.dir);



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

app.listen(port, () => {
  console.log(`loginServer listening at http://localhost:${port}`);
})

