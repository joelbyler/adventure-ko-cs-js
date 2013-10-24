var connect = require('connect');
 
var app = connect()
    .use(connect.static(__dirname + "/public"))
    .listen(3000);

var io = require('socket.io').listen(app)

io.sockets.on('connection', function(socket) {
  console.log('client connected');
});
