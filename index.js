var express = require('express');
var app = express();
var db = require('./models');

var ejsLayouts = require('express-ejs-layouts');
app.use(ejsLayouts);

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');

app.get('/', function(req, res){
	//contains a form where user can enter a url
	res.render('index');
});

app.post('/links/', function(req, res) {
//accepts data from the form
	var data = req.body.q;
//stores the url in the database
	db.link.create({ url: data, hash: '' }).then(function(link) {

//redirects the user to the show page
	res.redirect('/links/' + link.id);

});
});

app.get('/links/:id', function(req, res) {
	var linkID = parseInt(req.params.id);
	db.link.findById(linkID).then(function(foundLink) {
	res.render('links/show', {item: foundLink});
	});
});

module.exports = db;

app.listen(3000)

