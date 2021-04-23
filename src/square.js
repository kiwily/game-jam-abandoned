

const moveUp = (body) => {
    body.setVelocity(bodyA, { x: 0, y: -10 });
}
const moveDown = (body) => {
    body.setVelocity(bodyA, { x: 0, y: 10 });
}
const moveRight = (body) => {
    body.setVelocity(bodyA, { x: 10, y: 0 });
}
const moveLeft = (body) => {
    body.setVelocity(bodyA, { x: -10, y: 0 });
}

const moveDic = {
    "UP": moveUp,
    "DOWN": moveDown,
    "RIGHT": moveRight,
    "LEFT": moveRight
}

const square = (x_init, y_init, playerEvent) => {
    body = Bodies.rectangle(x_init, y_init, 50, 50);

    document.addEventListener(playerEvent, function (e) {
        moveDic[e.direction](body)
    }, false);
};

        Body.setVelocity(bodyA, { x: 0, y: py - bodyA.position.y });