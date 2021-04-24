
const keyDic = {
    87: {
        "player": 0,
        "direction": "UP"
    },
    65: {
        "player": 0,
        "direction": "LEFT"
    },
    68: {
        "player": 0,
        "direction": "RIGHT"
    },
    83: {
        "player": 0,
        "direction": "DOWN"
    },
    38: {
        "player": 1,
        "direction": "UP"
    },
    37: {
        "player": 1,
        "direction": "LEFT"
    },
    39: {
        "player": 1,
        "direction": "RIGHT"
    },
    40: {
        "player": 1,
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
    function handleKey(e, triggered){
        const { player, direction } = keyDic[e.keyCode] || [null, null]
        window.dispatchEvent(new CustomEvent(playerEvent[player], { 
            bubbles: true,
            detail:{
                direction: direction,
                triggered
            } 
        }));
    }

    // Dispatch key pressed
    window.addEventListener('keydown', function (e) {
        handleKey(e, true)
    }, false);

    // Dispatch key released
    window.addEventListener('keyup', function (e) {
        handleKey(e, false)
    }, false);
};
