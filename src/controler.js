
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
    // 81: {
    //     "player": 1,
    //     "direction": "SWITCH"
    // },
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
    // 190: {
    //     "player": 2,
    //     "direction": "SWITCH"
    // }
}
const Controler = (player1Event, player2Event) => {

    window.addEventListener('SWITCH', function (e) {
        [player1Event, player2Event] = [player2Event, player1Event]
    });
    function handleKey(e, triggered){
        const { player, direction } = keyDic[e.keyCode] || [null, null]
        // console.log(player, direction)

        if (direction === "SWITCH") {
            window.dispatchEvent(new Event("SWITCH"))
        } else {
            if (player === 1) {
                window.dispatchEvent(new CustomEvent(player1Event, { 
                    bubbles: true,
                    detail:{
                        direction: direction,
                        triggered
                    } 
                }));
            } else if (player === 2) {
                window.dispatchEvent(new CustomEvent(player2Event, {
                    bubbles: true,
                    detail:{
                        direction: direction,
                        triggered
                    } 
                }));
            }
        }
    }
    window.addEventListener('keydown', function (e) {
        handleKey(e, true)
    }, false);
    window.addEventListener('keyup', function (e) {
        handleKey(e, false)
    }, false);
};
