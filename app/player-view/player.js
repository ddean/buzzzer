(function() {
  var socket = io(),
      name;

  // send when user joins
  $('button.join').click(function(){
    name = $('input.player')[0].value;
    socket.emit('joining', {at: Date.now(), name: name});
    //$('#m').val('');
    // TODO: show name, hide entry UI
    return false;
  });

  // send when user buzzes
  $('button.answer').click(function(){
    socket.emit('buzz', {player: '', at: Date.now()});
    return false;
  });

  // received after joining and then whenever others join
  socket.on('players', function(msg) {
    console.log(msg.players);
  });

  // received when the score changes
  socket.on('score', function(msg){
    // update score
    console.log(msg);
  });

  // TODO: enable / disable

})();
