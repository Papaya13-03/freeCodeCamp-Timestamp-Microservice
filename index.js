// index.js
// where your node app starts

// init project
require("dotenv").config();
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
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:param",(req, res)=>{
  let utc = new Date(req.params.param).toUTCString();
  let unix = parseInt(new Date(req.params.param).getTime());
  if(utc == "Invalid Date") {
    utc = new Date(req.params.param*1).toUTCString();
    unix = parseInt(req.params.param);
  }
  if(utc == "Invalid Date") {
    res.json({ error : "Invalid Date" });
  }
  else {
    res.json({
      unix,
      utc
    });
  }
})


app.get("/api",(req, res)=>{
  utc = new Date().toUTCString();
  unix = parseInt(new Date().getTime());
  res.json({
    unix,
    utc
  });
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
