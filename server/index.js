var app = require('express')(),
    http = require('http').Server(app),
	io = require('socket.io')(http),
	_ = require('lodash'),
	util = require('util'),
	path = require('path'),

	referee = require('./referee'),

	players = [],
	buzzes = [];

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, '/../app/index.html'));
});

app.get('/client/*.css', function(req, res){
  res.sendFile(path.join(__dirname, '/../app/', req.path));
});

app.get('/client/*.js', function(req, res){
  res.sendFile(path.join(__dirname, '/../app/', req.path));
});



app.use('/referee', referee); // mount the admin sub app


http.listen(3000, function(){
  console.log('listening on *:3000');
});


io.on('connection', function(socket){

  // TODO: auto-join the user if they have a cookie

  socket.on('disconnect', function(msg){
    console.log('-> user disconnected: ', msg);
  });

  socket.on('joining', function(msg) {
  	var name = msg.name,
  		displayName = name,
  		n;

  	if(_.find(players, 
		function(player) {
			return player.name === name && player.id === socket.id;
		})
  	) {
  		console.log('already added "%s"', name);
  	} else {
	  	n = _.filter(players, function(player) {
	  		return player.name === name && player.id !== socket.id;
	  	}).length;
	  	if(n > 0) {
	  		displayName = name + ' [' + (n + 1) + ']';
	  	}
	  	players.push({
	  		id: socket.id, 
	  		name: name,
	  		displayName: displayName,
	  		score: 0});

	  	console.log('Added player: %s', displayName);

	  	socket.broadcast.emit(
	  		'players', 
			{
				players: _.map(players, function(player) {
					return player.displayName;
				})
			});
  	}
  });

  socket.on('buzz', function(msg, b) {
  	buzzes.push(msg);

  	// TODO: publish to referee
  });
});
