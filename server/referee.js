var app = require('express'),
    http = require('http').Server(app),
	io = require('socket.io')(http),
	path = require('path'),
	_ = require('lodash');

// TODO: admin paths
// - enable / disable
// - add point
//   socket.on('score', ...); 
//   buzzes = [];
var referee = app(); // the sub app

referee.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/../app/', req.path));
});

module.exports = referee;
