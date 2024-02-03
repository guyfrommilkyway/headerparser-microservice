// packages
require('dotenv').config();
const express = require('express');
const requestIp = require('request-ip');

const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

app.use(express.static('public'));
app.get('/', function (req, res) {
	res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
	res.json({ greeting: 'hello API' });
});

app.get('/api/whoami', (req, res) => {
	res.json({
		ipaddress: requestIp.getClientIp(req),
		language: req.headers['accept-language'],
		software: req.headers['user-agent'],
	});
});

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function () {
	console.log('Your app is listening on port ' + listener.address().port);
});
