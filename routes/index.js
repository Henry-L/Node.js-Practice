var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* GET Hello World page.  */
router.get('/helloworld', function(req,res) {
	res.render('helloworld', {title: 'Hello, World!'})
});

router.get('/userlist', function(req, res) {
	var db = req.db;
	var collection = db.get('usercollection');
	collection.find({},{},function(e, docs) {
		res.render('userlist', {
			"userlist" : docs
		});
	});
});

/* GET New User page */
router.get('/newuser', function(req, res) {
	res.render('newuser', {title: "Add New User"});
});

/* POST to Add User Service  */
router.post('/adduser', function(req,res) {
	var db = req.db;

	// Get form values, they rely on 'name' attribute
	var userName = req.body.username;
	var userEmail = req.body.useremail;

	var collection = db.get('usercollection');

	//Submit to DB
	collection.insert({
		"username" : userName,
		"email" : userEmail
	}, function (err, doc) {
		if (err) {
			res.send("There was an error");
		}
		else {
			// If it worked, set the header so the 
			// address bar doesnt still say /adduser
			res.location("userlist");
			res.redirect("userlist");
		}
	});
});

module.exports = router;
