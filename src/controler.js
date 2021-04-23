
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
const Controler = (player1Event, player2Event) => {

    window.addEventListener('keydown', function (e) {
        const { player, direction } = keyDic[e.keyCode]
        // console.log(player, direction)

        if (direction === "SWITCH") {
            window.dispatchEvent(new CustomEvent("SWITCH"));
        } else {
            eventName = player + direction
            if (player === 1) {
                window.dispatchEvent(new CustomEvent(player, {
                    bubbles: true,
                    detail:{
                        direction: direction,
                        start: true
                    }
                }));
            } else if (player === 2) {
                window.dispatchEvent(new CustomEvent(player2Event, {
                    bubbles: true,
                    detail:{
                        direction: direction,
                        start: true
                    }
                }));
            }
        }
    }, false);
};
