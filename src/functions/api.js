
import openSocket from 'socket.io-client';
const socket = openSocket('https://stockchart.glitch.me/');

const subscribeToTimer = (cb) => {
  socket.on('serverUpdate', (data) => cb(null, data));
  socket.emit('socketChart');
}

export default subscribeToTimer;
