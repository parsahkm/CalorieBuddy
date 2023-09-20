module.exports = function(app)
{
	const { check, validationResult } = require('express-validator');
	const redirectLogin = (req, res, next) => {
		if (!req.session.userId ) {
			res.redirect('./login')
		} else { next (); }
	}
	app.get('/',function(req,res){
		 res.render('index.html');
	});
	app.get('/about',function(req,res){
		res.render('about.html');
	});
	app.get('/search',redirectLogin,function(req,res){
		res.render("search.html");
	});

	//----------- Search Page ------------//
	app.get('/search-result', redirectLogin, function (req, res) {

		                var MongoClient = require('mongodb').MongoClient;

		                //      searching in the database
		                      var expression = new RegExp(req.query.keyword,'i');
		                       var url = 'mongodb://localhost';
		                       MongoClient.connect(url, function(err,client){
	                                         if(err) throw err;
	                                         var db = client.db('myappdb');
	                                         db.collection('foods').find({name: expression}).toArray((findErr, result) => {
	                                                     if(findErr){ throw err; }
	                                                     else{ console.log(result + ", " + expression);
			                                         res.render('list.ejs', {availablefoods: result});
		
		                                     }
		
		              client.close(); 
						 });
				       });
		                 });
		//--------  Register Page ---------//
		app.get('/register', function (req,res){
			 res.render('register.html');
			                      });
		app.post('/registered',[check('email').isEmail()], function (req,res) {

			                  const errors = validationResult(req);
					  // validate email input
					  if (!errors.isEmpty()) {
						  res.redirect('./register'); }
			                         else {


						//saving data in database
						var MongoClient = require('mongodb').MongoClient;

							                   var url = 'mongodb://localhost';

							                 const bcrypt = require('bcrypt');
							 		const saltRounds = 10;
							 		const plainPassword = req.sanitize(req.body.password);

							           bcrypt.hash(plainPassword, saltRounds, function(err, hashedPassword) {
									   // Store hashed password in your database
									   MongoClient.connect(url, function(err, client){                                                                                                                                                         if(err) throw err;
									                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       var db = client.db('myappdb');
									                                                                                                                                                                                                                                                                                                                                                                                                                  db.collection('users').insertOne({                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             username: req.body.username,                                                                                                                                                                              password: hashedPassword,                                                                                                                                                                              email: req.body.email,                                                                                                                                                                                firstname: req.body.first,                                                                                                                                                                              lastname: req.body.last               
																																																											  });
										   client.close();                                                                                                           // confirm registration to user
										   res.send('Hello '+ req.body.first + ' '+ req.body.last +' you are now registered! '+ '<br />' +'Your hashed password is: '+ hashedPassword+ '<br />'+ ' We will send an email to your email address: ' + req.body.email + '<br />'+   '<a href='+'./'+'> Home</a>')
                          });
                 });
       }
});
	//------------- Login Page -----------//
	app.get('/login', function(req,res){

		                res.render('login.html');

		        });
	app.post('/loggedin', function(req,res) {
		//searching in the database
		const bcrypt = require('bcrypt');
		const plainPassword = req.body.password;
		var MongoClient = require('mongodb').MongoClient;
		var url = 'mongodb://localhost';
		MongoClient.connect(url,function(err,client){
			if(err) throw err;
			var db = client.db('myappdb');
			db.collection('users').findOne({username:req.body.username}, function(findErr, results){
				if(findErr) throw findErr;
				//check if there are any users stored already
				if(results == null){
					res.send('Login unsuccessful - user not found <a href='+'./login'+'>Retry</a>');
				}
				else
				{
					//check if password matches
					bcrypt.compare(plainPassword, results.password, function(err, result){
						if(result == true)
						{
							req.session.userId = req.body.username;
							res.send('Login successful <a href='+'./'+'>Home</a>');
						}
								else
								{
									res.send('Password incorrect <a href='+'./login'+'>Retry</a>');
								}
							});
				}
					client.close();
						});
					});
				});
//------------ List Page -----------//
app.get('/list',redirectLogin, function(req, res) {
	//initalise connection to database
	var MongoClient = require('mongodb').MongoClient;
	var url = 'mongodb://localhost';
	MongoClient.connect(url, function (err, client) {
		if (err) throw err;
		var db = client.db('myappdb');
		//return all available foods
		db.collection('foods').find().toArray((findErr, results) => {
			if (findErr) throw findErr;
			else {
				res.render('list.ejs', {availablefoods:results});
			}
			client.close();
		});
	});
});

//--------- Add Food Page ----------//
app.get('/addfood',redirectLogin, function(req,res){
	res.render('addfood.html');
});
//------ Food added -------//
app.post('/foodadded', function (req,res) {
	//save data in database
	var MongoClient = require('mongodb').MongoClient;
	var url = 'mongodb://localhost';
	MongoClient.connect(url, function(err, client) {
		if (err) throw err;
		var db = client.db ('myappdb');
		db.collection('foods').insertOne({
			name: req.body.name,
			value: req.body.value,
			unit: req.body.unit,
			calories: req.body.calories,
			carbs: req.body.carbs,
			fat: req.body.fat,
			protein: req.body.protein,
			salt: req.body.salt,
			sugar: req.body.sugar
		});
		client.close();
		res.send(' This food is added to the database, name: '+ req.body.name + ' typical values per: '+ req.body.value + '<br />' + '  unit of the typical value: '+ req.body.unit + '<br />' + ' Calories: '+ req.body.calories + '<br />' +  + '  Carbs: '+ req.body.carbs + '<br />'  + '  Fat: '+ req.body.fat + '<br />'  + '  Protein: '+ req.body.protein + '<br />'  + '  Salt: '+ req.body.salt + '<br />'  + '  Sugar: '+ req.body.sugar + '<br />'+'<a href='+'./'+'>Home</a>');
	});
});
	//--------- Log Out Page -------//
		
		app.get('/logout', redirectLogin, (req,res) => {
			req.session.destroy(err => {
				if (err) {
					return res.redirect('./')
				}
				res.send('You are now logged out. Goodbye. <a href='+'./'+'>Home</a>');
			});
		});

//------  Update food Page -----//

app.get('/update', redirectLogin, function(req,res){
	res.render('update.html');
});

app.get('/update-result', redirectLogin, function (req, res) {
	var MongoClient = require('mongodb').MongoClient;
	//      searching in the database
	var expression = new RegExp(req.query.keyword,'i');
	var url = 'mongodb://localhost';
	 MongoClient.connect(url, function(err,client){
		 if(err) throw err;
		 var db = client.db('myappdb');
		 // find list requested
		 db.collection('foods').find({name: expression}).toArray((findErr, result) => {
			 if(findErr){ throw err; }
			 else{ console.log(result + ", " + expression);

				                                 res.render('updatedlist.ejs', {availablefoods: result});

				                         }
			 client.close();
		 });
	 });
});
app.post('/updated-result',redirectLogin, function(req,res){
	//if no lists are found
	if(!errors.isEmpty()){
		res.send('List incorrect <a href='+'/update-result'+'>Retry</a>');
	}
	else {
		//connect to database
		var MongoClient = require('mongodb').MongoClient;
		var url = 'mongodb://localhost';
		MongoClient.connect(url, function(err,client){
			if(err) throw err;
			var db = client.db('myappdb');
			var NewName = req.body.update;
			var NewValue = req.body.input;

			// if name is requested to be updated
			if(NewName == 'name'){
				db.collection('foods').findOneAndUpdate({'name':req.query.name},{$set:{values: updateValue}},{new:true}, function(err,doc){
					if(err) return res.send(500, {error: err});
					res.send('Update Successful');
				});
			}
			//if calories is requested to be updated
			else if(NewName == 'calories'){
				db.collection('foods').findOneAndUpdate({'name':req.query.name},{$set:{calories: updateValue}},{new:true}, function(err,doc){
					if(err) return res.send(500,{error:err});
					res.send('Update Successful');
				});
			}
			// if carbs is requested to be updated
			else if(NewName == 'carbs'){
				db.collection('foods').findOneAndUpdate({'name':req.query.name},{$set:{carbs: updateValue}},{new:true}, function(err,doc){
					if(err) return res.send(500,{error:err});

					                                        res.send('Update Successful');

					                                });

				                        }
			//if fat is requested to be updated
			else if(NewName == 'fat'){
				db.collection('foods').findOneAndUpdate({'name':req.query.name},{$set:{fat:updateValue}},{new:true}, function(err,doc){
					if(err) return res.send(500,{error:err});
					res.send('Update Successful');
				});
			}

			// if protein is requested to be updated
			else if(NewName == 'protein'){
				db.collection('foods').findOneAndUpdate({'name':req.query.name},{$set:{protein:updateValue}},{new:true}, function(err,doc){
					if(err) return res.send(500,{error:err});
					res.send('Update Successful');
				});
			}
			// if salt is requested to be updated
			else if(NewName == 'salt'){
				db.collection('foods').findOneAndUpdate({'name':req.query.name},{$set:{salt:updateValue}},{new:true}, function(err,doc){
					if(err) return res.send(500,{error:err});
					res.send('Update Successful');
				});
			}
			//if sugar is requested to be updated
			else if(NewName == 'sugar'){
				db.collection('foods').findOneAndUpdate({'name':req.query.name},{$set:{sugar:updateValue}},{new:true}, function(err,doc){
					if(err) return res.send(500,{error:err});
					res.send('Update Successful');
				});
			};
			
		});
	}
});


	//------- API ----------//
	app.get('/api', function (req,res) {
		//search database
		var MongoClient = require('mongodb').MongoClient;
		var url = 'mongodb://localhost';
		MongoClient.connect(url, function (err, client){
			if (err) throw err
			var db = client.db('myappdb');
			// find data and output
			db.collection('foods').find().toArray((findErr, results) => {
				if (findErr) throw findErr;
				else{
					res.json(results);
					client.close();
				}
			});
		});
	});

//---------- Delete User -------//
// when delete user chosen open page
app.get('/deleteuser', function(req,res){
	res.render('deleteuser.html');
});
app.post('/deleted', function(req,res){
	//search the database
	var MongoClient = require('mongodb').MongoClient;
	var url = 'mongodb://localhost';
	MongoClient.connect(url,function(err,client){
		 if(err) throw err;
		 var db = client.db('myappdb');
	 	 db.collection('users').findOne({username:req.body.username}, function(findErr, results){
			 if(findErr) throw findErr;
			 //check if there are any users stored already
			 // if no users found retry
			 if(results == null){
				 res.send('Delete unsuccessful - user not found <a href='+'./deleteuser'+'>Retry</a>');
				 }
			 //if user found, delete
			 else
			 {
				 db.collection('users').deleteOne({'username':req.body.username});                                                                                                                                                                                                                                           res.send('Delete successful <a href='+'./'+'>Home</a>');
			 }
				 });
		
			 client.close();
			 });
});
		
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
