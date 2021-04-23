

const MOVE_UP = (body) => {
    Body.applyForce(body, body.position, {x: 0, y: -0.1});
};

const MOVE_DOWN = (body) => {
    Body.applyForce(body, body.position, {x: 0, y: 0.1});
};

const MOVE_RIGHT = (body) => {
    Body.applyForce(body, body.position, {x: 0.1, y: 0});
};

const MOVE_LEFT = (body) => {
    Body.applyForce(body, body.position, {x: -0.1, y: 0});
};

const MOVE = {
    "UP": MOVE_UP,
    "DOWN": MOVE_DOWN,
    "RIGHT": MOVE_RIGHT,
    "LEFT": MOVE_LEFT,
};

function Square(x_init, y_init, playerEvent) {
    const body = Bodies.rectangle(x_init, y_init, 80, 80);
    Body.setMass(body, 10);

    function move(to) {
        MOVE[to](body);
    };

    window.addEventListener(playerEvent, (e) => move(e.detail.direction));
    
    return body;
};
