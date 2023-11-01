document.addEventListener("DOMContentLoaded", function() {
    const joinButton = document.getElementById("joinButton");
    const status = document.getElementById("status");

    let playerCount = 0;

    //créez une connexion WebSocket vers le serveur
    const socket = new WebSocket("ws://localhost:8080");

    socket.addEventListener("open", function(event){
        joinButton.addEventListener("click", function(){
            if (playerCount === 0) {
                playerCount = 1;
                joinButton.disabled = true;
                joinButton.innerText = "En attente du joueur 2...";
                // Envoie un message au serveur pour signaler qu'un joueur a rejoins le serveur
                status.innerText = "En attente d'un deuxième joueur"
                socket.send("Player 1 joined");
                console.log(playerCount)
            } else if (playerCount === 1) {
                playerCount = 2;
                joinButton.disabled = true;
                joinButton.innerText = "Lobby complet";
                status.innerText = "Les deux joueurs sont prêts !"
                //envoie un message au serveur
                socket.send("Both players are ready")
                console.log(playerCount)
            }
        })
    })

 socket.addEventListener("message", function(event) {
        // Traitez les messages reçus du serveur
        const message = event.data;
        // Exemple : si le serveur envoie un message "Game started", démarrez le jeu
        if (message === "Game started") {
            startGame();
        }
    });

    socket.addEventListener("close", function(event) {
        // Gérez la fermeture de la connexion WebSocket
        if (event.wasClean) {
            console.log("La connexion WebSocket a été fermée proprement.");
        } else {
            console.error("La connexion WebSocket a été interrompue de manière inattendue.");
        }
    });

    socket.addEventListener("error", function(event) {
        // Gérez les erreurs de la connexion WebSocket
        console.error("Erreur de connexion WebSocket : " + event.message);
    });

    function startGame() {
        // Ajoutez ici le code pour démarrer le jeu avec deux joueurs
    }
})