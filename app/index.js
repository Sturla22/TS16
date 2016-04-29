var express = require('express');
var http = require('http');
var io = require('socket.io');
var fs = require('fs');
var app = express();
var server = http.createServer(app);
var serv_io = io.listen(server);
var fileName = "/dev/ttyUSB0";
serv_io.sockets.on('connection',function(socket){
  var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(fileName)
  });

  lineReader.on('line', function (line) {
    if (line.replace(/\s+/g, '')){
      socket.emit('line',line);
    }
  });

});
server.listen(process.env.PORT||5000);
app.use(express.static(__dirname+'/bin/'));
