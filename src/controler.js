
const keyDic = {
    87: {
        "player": 1,
        "direction": "UP"
    },
    65: {
        "player": 1,
        "direction": "LEFT"
    },
    68: {
        "player": 1,
        "direction": "RIGHT"
    },
    83: {
        "player": 1,
        "direction": "DOWN"
    },
    81: {
        "player": 1,
        "direction": "SWITCH"
    },
    38: {
        "player": 2,
        "direction": "UP"
    },
    37: {
        "player": 2,
        "direction": "LEFT"
    },
    39: {
        "player": 2,
        "direction": "RIGHT"
    },
    40: {
        "player": 2,
        "direction": "DOWN"
    },
    191: {
        "player": 2,
        "direction": "SWITCH"
    }
}
const controler = (player1Event, player2Event) => {

    document.addEventListener('keydown', function (e) {
        player, direction = keyDic[e.code]
        
        if (direction === "SWITCH") {
            elem.dispatchEvent(new CustomEvent("SWITCH"));
        } else {
            if (player === 1) {
                console.log("Player 1 moving ", direction)
                elem.dispatchEvent(new CustomEvent(player1Event, { direction: direction }));
            } else if (player === 2) {
                console.log("Player 2 moving ", direction)
                elem.dispatchEvent(new CustomEvent(player2Event, { direction: direction }));
            }
        }
    }, false);
};

export { controler };