var express = require('express');
var app = express();
var db = require('./models');

var ejsLayouts = require('express-ejs-layouts');
app.use(ejsLayouts);

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

var Hashids = require("hashids"),
    hashids = new Hashids("gyro");
 

app.set('view engine', 'ejs');

app.get('/', function(req, res){
	//contains a form where user can enter a url
	res.render('index');
});

app.get('/links', function(req, res){
	db.link.findAll({order: 'count DESC'}).then(function(links) {
  	res.render('links/list', {links: links});
	});	
});

app.post('/links/', function(req, res) {
//accepts data from the form
	var data = req.body.q;
//stores the url in the database
	db.link.create({ url: data }).then(function(link) {
		var hashID = hashids.encode(link.id);
		link.hash = hashID;
		link.save().then(function() {
		//redirects the user to the show page
		res.redirect('/links/' + link.id);
		});
	});
});

app.get('/links/:id', function(req, res) {
	var linkID = req.params.id;
	db.link.findById(linkID).then(function(link) {
	res.render('links/show', {item: link});
	});
});

app.get('/:hash', function(req, res){
	var hash = req.params.hash;
	db.link.find({where: {hash: hash}}).then(function(link) {
		link.count++;
		link.save().then(function(){
		res.redirect('http://' + link.url);		
		})
	});
});

module.exports = db;

app.listen(3000)

