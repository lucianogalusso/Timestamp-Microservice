// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date?", function (req, res) {

  //time param
  const date = req.params.date;

  //no date param
  if (date === undefined) {
    let dateTime = new Date();
    let timestamp = dateTime.getTime();
    let dateUTC = dateTime.toUTCString();  
    return res.json({unix: timestamp, utc: dateUTC});
  }
    
  //digits regex
  const regexDigits = /^\d+$/;

  let dateTime;
  if (regexDigits.test(date)) 
    dateTime = new Date(parseInt(date));
  else 
    dateTime = new Date(date);

  let timestamp = dateTime.getTime();
  let dateUTC = dateTime.toUTCString();  

  if (isNaN(timestamp))
    return res.json({error: "Invalid Date"});

  return res.json({unix: timestamp, utc: dateUTC});
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
