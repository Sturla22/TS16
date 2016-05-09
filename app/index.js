var express = require('express');
var http = require('http');
var fs = require('fs');
var app = express();
var server = http.createServer(app);
var WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({ server:server });
var fileName = "/dev/ttyUSB0";
// var fileName = "../pi/sampledata.txt";
wss.on('connection', function connection(ws) {
  var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(fileName)
  });
  lineReader.on('line', function (line) {
    if (line.replace(/\n/g, '')){
      d = line.split(" ");
      ax = parseInt(d[0])/100;
      ay = parseInt(d[1])/100;
      az = parseInt(d[2])/100;
      sp = parseInt(d[3]);
      o = {ax:ax,ay:ay,az:az,sp:sp}
      ws.send(JSON.stringify(o));
    }
  });
});
server.listen(5000);
app.use(express.static(__dirname+'/bin/'));
