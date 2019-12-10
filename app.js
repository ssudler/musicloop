var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
app.use(express.static('public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/views/index.html');
});

app.get('/content', function(req, res) {
  res.sendFile(__dirname + '/public/views/content.html');
});

io.on('connection', function(socket) {
  console.log('User connected');
  socket.on('disconnect', function() {
    console.log('User disconnected');
  })
})

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

http.listen(port, function() {
  console.log('Listening on port 8000');
});
