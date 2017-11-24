// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser');
const Request = require('superagent');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var server = require('http').Server(app);
var io = require('socket.io')(server);

//Updates user whenever the user is connected to the socket connection.
io.on('connection', (socket) => {
  socket.on('socketChart', () => {
    console.log('User connected');
    fs.readFile('.data/myfile.json', 'utf8', function readFileCallback(err, data){
      if (err) throw err;
      console.log((data));
      let newData = null;
      if(data.length > 0){
        newData = (JSON.parse(data));
      }else{
        newData = [];
      }
      fs.readFile('.data/stockCodes.json', 'utf8', function readFileCallback(err, data){
        if (err) throw err;
        console.log((data));
        let code = null;
        if(data.length > 0){
          code = (JSON.parse(data));
        }else{
          code = [];
        }
        io.emit('serverUpdate', [newData, code]);
      });
    });
  });
});

//Handles deletion of user selected stock code.
app.post('/deleteChart', function(req, res){
  fs.readFile('.data/myfile.json', 'utf8', function readFileCallback(err, data){
    if (err) throw err;
    let newData = (JSON.parse(data));
    newData.splice(req.body.index, 1);
    fs.writeFile('.data/myfile.json', JSON.stringify(newData), 'utf8', function(err) {
      if (err) throw err;
      console.log("Saved json");
    });
    fs.readFile('.data/stockCodes.json', 'utf8', function readFileCallback(err, data){
      if (err) throw err;
      let code = (JSON.parse(data));
      code.splice(req.body.index, 1);
      io.emit('serverUpdate', [newData, code]);
      res.json({success: true, msg: "Successful deletion"});
      fs.writeFile('.data/stockCodes.json', JSON.stringify(code), 'utf8', function(err) {
        if (err) throw err;
        console.log("Saved json");
      });
    });
  });
});

//Update clients when get request is made by user. Stock code is passed and then a get request is done to the quandl api.
app.post('/updateClients', function(req, res){ 
  io.emit('timer', new Date());
  let apiUrl = 'https://www.quandl.com/api/v3/datasets/WIKI/' + req.body.code + '/data.json?column_index=1&start_date=2017-01-01&api_key=zceFUw_gkp_mba6LuFnw'; 
  Request.get(apiUrl)
  .then((res, err) => {
    if (err) throw (err);
    fs.readFile('.data/myfile.json', 'utf8', function readFileCallback(err, data){
      if (err) throw err;
      let newData = null;
      if(data.length > 0){
        newData = (JSON.parse(data));
      }else{
        newData = [];
      }
      newData.push({ [req.body.code]: JSON.parse(res.text).dataset_data });
      
      fs.writeFile('.data/myfile.json', JSON.stringify(newData), 'utf8', function(err) {
        if (err) throw err;
        console.log("Saved json");
      });

      fs.readFile('.data/stockCodes.json', 'utf8', function readFileCallback(err, data){
        if (err) throw err;

        let code = null;
        if(data.length > 0){
          code = (JSON.parse(data));
        }else{
          code = [];
        }
        code.push(req.body.code);

        io.emit('serverUpdate', [newData, code]);
        fs.writeFile('.data/stockCodes.json', JSON.stringify(code), 'utf8', function(err) {
          if (err) throw err;
          console.log("Saved json");
        });
      });
    });
  });
  res.json({success: true, msg: "Successful request."});
});

// listen for requests :)
var listener = server.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
