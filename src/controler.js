
const keyDic = {
    87: {
        "player": 1,
        "direction": "UP",
        "undirection": "DOWN"
    },
    65: {
        "player": 1,
        "direction": "LEFT",
        "undirection": "RIGHT"
    },
    68: {
        "player": 1,
        "direction": "RIGHT",
        "undirection": "LEFT"
    },
    83: {
        "player": 1,
        "direction": "DOWN",
        "undirection": "UP"
    },
    81: {
        "player": 1,
        "direction": "SWITCH"
    },
    38: {
        "player": 2,
        "direction": "UP",
        "undirection": "DOWN"
    },
    37: {
        "player": 2,
        "direction": "LEFT",
        "undirection": "RIGHT"
    },
    39: {
        "player": 2,
        "direction": "RIGHT",
        "undirection": "LEFT"
    },
    40: {
        "player": 2,
        "direction": "DOWN",
        "undirection": "UP"
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
            if (player === 1) {
                window.dispatchEvent(new CustomEvent(player1Event, { 
                    bubbles: true,
                    detail:{
                        direction: direction,
                        triggered: true
                    } 
                }));
            } else if (player === 2) {
                window.dispatchEvent(new CustomEvent(player2Event, {
                    bubbles: true,
                    detail:{
                        direction: direction,
                        triggered: true
                    } 
                }));
            }
        }
    }, false);
    window.addEventListener('keyup', function (e) {
        const { player, direction } = keyDic[e.keyCode]
        
        if (direction === "SWITCH") {
            window.dispatchEvent(new CustomEvent("SWITCH"));
        } else {
            if (player === 1) {
                window.dispatchEvent(new CustomEvent(player1Event, { 
                    bubbles: true,
                    detail:{
                        direction: direction,
                        triggered: false
                    } 
                }));
            } else if (player === 2) {
                window.dispatchEvent(new CustomEvent(player2Event, { 
                    bubbles: true,
                    detail:{
                        direction: direction,
                        triggered: false
                    } 
                }));
            }
        }
    }, false);
};
