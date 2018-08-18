module.exports = function(){
	var express = require('express');
	var router = express.Router();

	//pulls current water report data from db
	function getReports(res, mysql, context, complete){
		mysql.pool.query('SELECT reportID, address, city, state, zip, price, quantity, Measure FROM reports', function(error, results, fields){
			if(error){
				console.log(JSON.stringify(error));
				res.write(JSON.stringify(error));
				res.end();
			}
			context.reports = results;
			complete();
		})
	}

	// filter results based off user entered criteria
	function getFilteredReports(res, mysql, context, state, zip, maxPrice, minQuantity, measure, complete){
		sql = 'SELECT reportID, address, city, state, zip, price, quantity, Measure FROM reports WHERE state LIKE ? AND zip LIKE ? AND price <= ? AND quantity >= ? AND Measure LIKE ?';
		var inserts = [state, zip, maxPrice, minQuantity, measure];
		mysql.pool.query(sql, inserts, function(error, results, fields){
			if(error){
				console.log(JSON.stringify(error));
				res.write(JSON.stringify(error));
				res.end();
			}
			context.reports = results;
			complete();
		});
	}

	//adds state names and abbreviations to context
	function getStates(context, complete){
			context.states = [
			    {
			    	"name": "Alabama", 
			    	"abbreviation": "AL"
			    },
			    {
			        "name": "Alaska",
			        "abbreviation": "AK"
			    },
			    {
			        "name": "American Samoa",
			        "abbreviation": "AS"
			    },
			    {
			        "name": "Arizona",
			        "abbreviation": "AZ"
			    },
			    {
			        "name": "Arkansas",
			        "abbreviation": "AR"
			    },
			    {
			        "name": "California",
			        "abbreviation": "CA"
			    },
			    {
			        "name": "Colorado",
			        "abbreviation": "CO"
			    },
			    {
			        "name": "Connecticut",
			        "abbreviation": "CT"
			    },
			    {
			        "name": "Delaware",
			        "abbreviation": "DE"
			    },
			    {
			        "name": "District Of Columbia",
			        "abbreviation": "DC"
			    },
			    {
			        "name": "Federated States Of Micronesia",
			        "abbreviation": "FM"
			    },
			    {
			        "name": "Florida",
			        "abbreviation": "FL"
			    },
			    {
			        "name": "Georgia",
			        "abbreviation": "GA"
			    },
			    {
			        "name": "Guam",
			        "abbreviation": "GU"
			    },
			    {
			        "name": "Hawaii",
			        "abbreviation": "HI"
			    },
			    {
			        "name": "Idaho",
			        "abbreviation": "ID"
			    },
			    {
			        "name": "Illinois",
			        "abbreviation": "IL"
			    },
			    {
			        "name": "Indiana",
			        "abbreviation": "IN"
			    },
			    {
			        "name": "Iowa",
			        "abbreviation": "IA"
			    },
			    {
			        "name": "Kansas",
			        "abbreviation": "KS"
			    },
			    {
			        "name": "Kentucky",
			        "abbreviation": "KY"
			    },
			    {
			        "name": "Louisiana",
			        "abbreviation": "LA"
			    },
			    {
			        "name": "Maine",
			        "abbreviation": "ME"
			    },
			    {
			        "name": "Marshall Islands",
			        "abbreviation": "MH"
			    },
			    {
			        "name": "Maryland",
			        "abbreviation": "MD"
			    },
			    {
			        "name": "Massachusetts",
			        "abbreviation": "MA"
			    },
			    {
			        "name": "Michigan",
			        "abbreviation": "MI"
			    },
			    {
			        "name": "Minnesota",
			        "abbreviation": "MN"
			    },
			    {
			        "name": "Mississippi",
			        "abbreviation": "MS"
			    },
			    {
			        "name": "Missouri",
			        "abbreviation": "MO"
			    },
			    {
			        "name": "Montana",
			        "abbreviation": "MT"
			    },
			    {
			        "name": "Nebraska",
			        "abbreviation": "NE"
			    },
			    {
			        "name": "Nevada",
			        "abbreviation": "NV"
			    },
			    {
			        "name": "New Hampshire",
			        "abbreviation": "NH"
			    },
			    {
			        "name": "New Jersey",
			        "abbreviation": "NJ"
			    },
			    {
			        "name": "New Mexico",
			        "abbreviation": "NM"
			    },
			    {
			        "name": "New York",
			        "abbreviation": "NY"
			    },
			    {
			        "name": "North Carolina",
			        "abbreviation": "NC"
			    },
			    {
			        "name": "North Dakota",
			        "abbreviation": "ND"
			    },
			    {
			        "name": "Northern Mariana Islands",
			        "abbreviation": "MP"
			    },
			    {
			        "name": "Ohio",
			        "abbreviation": "OH"
			    },
			    {
			        "name": "Oklahoma",
			        "abbreviation": "OK"
			    },
			    {
			        "name": "Oregon",
			        "abbreviation": "OR"
			    },
			    {
			        "name": "Palau",
			        "abbreviation": "PW"
			    },
			    {
			        "name": "Pennsylvania",
			        "abbreviation": "PA"
			    },
			    {
			        "name": "Puerto Rico",
			        "abbreviation": "PR"
			    },
			    {
			        "name": "Rhode Island",
			        "abbreviation": "RI"
			    },
			    {
			        "name": "South Carolina",
			        "abbreviation": "SC"
			    },
			    {
			        "name": "South Dakota",
			        "abbreviation": "SD"
			    },
			    {
			        "name": "Tennessee",
			        "abbreviation": "TN"
			    },
			    {
			        "name": "Texas",
			        "abbreviation": "TX"
			    },
			    {
			        "name": "Utah",
			        "abbreviation": "UT"
			    },
			    {
			        "name": "Vermont",
			        "abbreviation": "VT"
			    },
			    {
			        "name": "Virgin Islands",
			        "abbreviation": "VI"
			    },
			    {
			        "name": "Virginia",
			        "abbreviation": "VA"
			    },
			    {
			        "name": "Washington",
			        "abbreviation": "WA"
			    },
			    {
			        "name": "West Virginia",
			        "abbreviation": "WV"
			    },
			    {
			        "name": "Wisconsin",
			        "abbreviation": "WI"
			    },
			    {
			        "name": "Wyoming",
			        "abbreviation": "WY"
			    }
			];
			complete();
	}

	//brings up submit report page
	router.get('/', function(req, res){
		var callbackCount = 0;
		var context = {};
		var mysql = req.app.get('mysql');
		context.jsscripts = [];
		getReports(res, mysql, context, complete);
		getStates(context, complete);
		function complete(){
			callbackCount++;
			if(callbackCount >= 2){
				res.render('filter_reports.handlebars', context);
			}
		}
	});

	router.post('/', function(req, res){

		console.log(req.body);
		// process input to make sure it'll work in the query
		if(req.body.zip == ''){
			req.body.zip = '%';
		}
		if(req.body.price == ''){
			req.body.price = Number.MAX_VALUE;
		}
		if(req.body.quantity == ''){
			req.body.quantity = '0';
		}
		if(req.body.measure == ''){
			req.body.measure = '%';
		}
		console.log(req.body);
		var callbackCount = 0;
		var context = {};
		var mysql = req.app.get('mysql');
		context.jsscripts = [];
		getFilteredReports(res, mysql, context, req.body.states, req.body.zip, req.body.price, req.body.quantity, req.body.measure, complete);
		getStates(context, complete);
		function complete(){
			callbackCount++;
			if(callbackCount >= 2){
				res.render('filter_reports.handlebars', context);
			}
		}
	});

	return router;

}();