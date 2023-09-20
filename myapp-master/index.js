var express = require('express')

var bodyParser= require('body-parser');

var session = require ('express-session');

var validator = require ('express-validator');

const app = express()

const port = 8000
//mongodb initialises database

var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost/myappdb";

MongoClient.connect(url, function(err, db) {

  if (err) throw err;

    console.log("Database created!");

      db.close();

      });
//sanitisation

const expressSanitizer = require('express-sanitizer');

app.use(expressSanitizer());
///added for session management
app.use(session({
	secret: 'somerandomstuffs',
	resave: false,
	saveUninitialized: false,
	
	cookie:{
			                expires: 600000                                                       
			                }

	                }));
app.use(bodyParser.urlencoded({ extended: true }));
// new code added to your Express web server
require('./routes/main')(app);

 app.set('views',__dirname + '/views');

 app.set('view engine', 'ejs');

 app.engine('html', require('ejs').renderFile);
/////////////
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
