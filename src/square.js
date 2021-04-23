

const MOVE_UP = (body) => {
    Body.setVelocity(body, { x: 0, y: -10 });
};

const MOVE_DOWN = (body) => {
    Body.setVelocity(body, { x: 0, y: 10 });
};

const MOVE_RIGHT = (body) => {
    Body.setVelocity(body, { x: 10, y: 0 });
};

const MOVE_LEFT = (body) => {
    Body.setVelocity(body, { x: -10, y: 0 });
};

const MOVE = {
    "UP": MOVE_UP,
    "DOWN": MOVE_DOWN,
    "RIGHT": MOVE_RIGHT,
    "LEFT": MOVE_LEFT,
};

function Square(x_init, y_init, playerEvent) {
    const body = Bodies.rectangle(x_init, y_init, 80, 80);
    console.log("inst", playerEvent)

    function move(to) {
        MOVE[to](body);
    };

    window.addEventListener(playerEvent, (e) => move(e.detail.direction));

    return body;
};
