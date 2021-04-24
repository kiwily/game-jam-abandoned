
const keyDic = {
    38: {
        "direction": "UP"
    },
    37: {
        "direction": "LEFT"
    },
    39: {
        "direction": "RIGHT"
    },
    40: {
        "direction": "DOWN"
    }
}
const Controler = (playerEvents) => {
    let playerEvent = [...playerEvents];

    // Switch commands during a switch event
    window.addEventListener('switch', function (e) {
        playerEvent = [playerEvent[1], playerEvent[0]]
    });

    // Function to fire the right player's movement
    function handleKey(playerId, keyCode, triggered){
        const { player, direction } = keyDic[keyCode] || [null, null]
        window.dispatchEvent(new CustomEvent(playerEvent[playerId], {
            bubbles: true,
            detail:{
                direction: direction,
                triggered
            }
        }));
    }

    // Dispatch key pressed
    window.addEventListener('keydown', function (e) {
        handleKey(playerId, e.keyCode, true)
    }, false);

    // Dispatch key released
    window.addEventListener('keyup', function (e) {
        handleKey(playerId, e.keyCode, false)
    }, false);

    socket.on("host client keyboard", (e) => {
      handleKey(e.playerId, e.keyCode, e.keyDown)
    });
};
