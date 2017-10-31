var express 		= require('express');
var app					= express();
var moment			= require('moment');

app.use(express.static('public'));

//============
// ROUTES
//============
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/views/index.html');
});

app.get('/:string', function(req, res) {
	var string = req.params.string.replace('%20', ' ');

	// if the string is a date
	// convert the string to utc time, then convert to unix
	if ( moment(string).isValid() ) {
		var utcTime = moment.utc(string);
		var utcToUnix = moment(utcTime).unix();
		var longDateFormat = moment(utcTime).format('LL');
		res.json({"unix": utcToUnix, "natural": longDateFormat});
	}
	// if the string is a unix timestamp
	// convert the string to utc time
	else if ( moment.unix(string) ) {
		var unixToUtc = moment.unix(string).format('LL');		
		res.json({"unix": string , "natural": unixToUtc});
	}
	// if the string is invalid
	// return null for both properties
	else {
		res.json({"unix": null, "natural": null});
	}
});

app.listen(3000, function() {
	console.log('App is running on port 3000');
});