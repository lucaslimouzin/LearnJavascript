const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

// Utilisez un ensemble pour stocker toutes les connexions actives
const clients = new Set();

wss.on('connection', (ws) => {
  console.log('Nouvelle connexion WebSocket établie');
  
  // Ajoutez la nouvelle connexion à l'ensemble
  clients.add(ws);

  ws.on('message', (message) => {
    console.log(`Message reçu : ${message}`);

    // Vous pouvez parcourir l'ensemble 'clients' pour envoyer un message à tous les clients
    clients.forEach(client => {
      client.send(message);
    });
  });

  ws.on('close', () => {
    console.log('Connexion WebSocket fermée');
    
    // Supprimez la connexion de l'ensemble lorsque la connexion est fermée
    clients.delete(ws);
  });
});
