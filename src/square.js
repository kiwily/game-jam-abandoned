const MOVE_UP = (body) => {
    body.setVelocity(bodyA, { x: 0, y: -10 });
};

const MOVE_DOWN = (body) => {
    body.setVelocity(bodyA, { x: 0, y: 10 });
};

const MOVE_RIGHT = (body) => {
    body.setVelocity(bodyA, { x: 10, y: 0 });
};

const MOVE_LEFT = (body) => {
    body.setVelocity(bodyA, { x: -10, y: 0 });
};

const MOVE = {
    "UP": MOVE_UP,
    "DOWN": MOVE_DOWN,
    "RIGHT": MOVE_RIGHT,
    "LEFT": MOVE_LEFT,
};

function Square(x_init, y_init, playerEvent) {
    body = Bodies.rectangle(x_init, y_init, 50, 50);

    document.addEventListener(playerEvent, function (e) {
        MOVE[e.direction](body)
    }, false);

    return body;
};
