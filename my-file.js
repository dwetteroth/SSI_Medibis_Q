const enigma = require('enigma.js');
const WebSocket = require('ws');
const schema = require('enigma.js/schemas/12.20.0.json');

// create a new session:
const session = enigma.create({
  schema,
  url: 'ws://qlikdevavm.ssird.corp/sense/app/ed58d9de-eb6a-4d1e-be31-1fbcf57aa762',
  createSocket: url => new WebSocket(url),
});




// bind traffic events to log what is sent and received on the socket:
session.on('traffic:sent', data => console.log('sent:', data));
session.on('traffic:received', data => console.log('received:', data));

// open the socket and eventually receive the QIX global API, and then close
// the session:
session.open()
  .then((/*global*/) => console.log('We are connected!'))
  .then(() => session.close())
  .then(() => console.log('Session closed'))
  .catch(err => console.log('Something went wrong :(', err));
