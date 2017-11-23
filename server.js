var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3001);

io.on('connection', (client) => {
  client.on('subscribeToTimer', () => {
    console.log('client is subscribing to timer with interval 1s');
    setInterval(() => {
      client.emit('timer', new Date());
    }, 1000);
  });
});

