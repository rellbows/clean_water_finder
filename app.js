// Program Name: Clean Water Finder
// Filename: app.js
// Author: Ryan Ellis
// Description: Main node.js script for the clean water finder web app.git 

// SERVER SIDE CODE

var express = require('express');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.use(bodyParser.urlencoded({extended:true}));
app.use('/static', express.static('public')); // where static .js files are served
app.set('view engine', 'handlebars');
app.set('port', process.argv[2]); // pulls port # from command line argument
app.set('mysql', mysql);

//brings up homepage
app.get('/', function(req, res){
	res.render('home.handlebars')
});

//brings up add_report page
app.use('/add_report', require('./add_report.js'));

//brindgs up filter_reports page
app.use('/filter_reports', require('./filter_reports.js'));

//bad url route
app.use(function(req, res){
	res.status(404);
	res.render('404');
});

//bad syntax route
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.type('plain/text');
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function(){
	console.log('Express started on http://localhost:' + app.get('port') + '; Press Ctrl-C to terminate.');
});