//This helper function initiates the socket connectio to my server.
//This is done for all users that connect to the website.

//Created: 11/20/2017, last edit: Bryan 11/24/2017

import openSocket from 'socket.io-client';
const socket = openSocket('https://stockchart.glitch.me/');

const subscribeToTimer = (cb) => {
  socket.on('serverUpdate', (data) => cb(null, data));
  socket.emit('socketChart');
}

export default subscribeToTimer;
