var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use("/", express.static(__dirname + "/public"));

io.on('connection', function (socket) {

  
  var connectedUser;

  
  //Log de connexion d'un utilisateur (avant login) 
  console.log('a user connected');

  //Déconnexion d'un utilisateur : broadcast d'un 'service-message'
  socket.on('disconnect', function () {
    if (connectedUser !== undefined) {
      console.log('user disconnected : ' + connectedUser.username);
      var serviceMessage = {
        text: 'User "' + connectedUser.username + '" disconnected',
        type: 'logout'
      };
      socket.broadcast.emit('service-message', serviceMessage);
    }
  });

  /**
   * Connexion d'un utilisateur via le formulaire :
   *  - sauvegarde du user
   *  - broadcast d'un 'service-message'
   */
  socket.on('user-login', function (user) {
    connectedUser = user;
    if (connectedUser !== undefined) {
      var serviceMessage = {
        text: 'User "' + connectedUser.username + '" logged in',
        type: 'login'
      };
      socket.broadcast.emit('service-message', serviceMessage);
    }
  });


  //Réception de l'événement 'chat-message' et réémission vers tous les utilisateurs   
  socket.on('chat-message', function (message) {
    message.username = connectedUser.username;
    io.emit('chat-message', message);
    console.log('Message de : ' + connectedUser.username);
  });
});

http.listen(4242, function () {
  console.log('Server is listening on *:4242');
});