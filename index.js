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

app.get("/api/:date", function (req, res) {
  //acquire parameter after (api/...)
  const {date} = req.params;

  const checkDate = new Date(date);
  //console.log(checkDate.getTime());
  //check if date format is readable
  if(!isNaN(checkDate.getTime())){
    res.json({unix: checkDate.getTime(), utc:checkDate.toUTCString()});
    return;
  }
  //check if date format is ACTUALLY valid (if not then return error)
  if(!isNaN(date)) {
    //date format valid then covert unix to timestamp
    const checkTimestamp = new Date(parseInt(date, 10));
    //console.log(timestamp);
    if(!isNaN(checkTimestamp.getTime())) {
      res.json({unix: checkTimestamp.getTime(), utc:checkTimestamp.toUTCString()});
      return;
    }
  }
  //return error if nothing found
  res.json({ error: "Invalid Date" });
});

app.get("/api", function (req, res) {
  const currentDate = new Date();
  res.json({unix: currentDate.getTime(), utc:currentDate.toUTCString()});
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
