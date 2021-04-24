
function HostControler() {
    // Switch commands during a switch event
    window.addEventListener('switch', function (e) {
        const shuffledPlayersEventValues = PLAYERS_ID_TO_EVENT.values.sort((a, b) => 0.5 - Math.random());
        Object.keys(PLAYERS_ID_TO_EVENT).forEach((key, i) => {
            PLAYERS_ID_TO_EVENT[key] = shuffledPlayersEventValues[i];
        });
    });

    // Function to fire the right player's movement
    function handleKey(playerId, keyCode, triggered){
        const data = KEY_DICT[keyCode] || null;

        if (data === null) {
          return;
        };

        window.dispatchEvent(new CustomEvent(PLAYERS_ID_TO_EVENT[playerId], {
            bubbles: true,
            detail:{
                direction: data.direction,
                triggered
            }
        }));
    }

    // Dispatch key pressed
    window.addEventListener('keydown', function (e) {
        handleKey(PLAYER_ID, e.keyCode, true)
    }, false);

    // Dispatch key released
    window.addEventListener('keyup', function (e) {
        handleKey(PLAYER_ID, e.keyCode, false)
    }, false);

    socket.on("host client keyboard", (e) => {
      handleKey(e.playerId, e.keyCode, e.keyDown)
    });
};
