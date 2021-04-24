

let MOVE = {
    "UP": false,
    "DOWN": false,
    "RIGHT": false,
    "LEFT": false,
};

function Square(x_init, y_init, playerEvent) {
    const body = Bodies.rectangle(x_init, y_init, 80, 80);
    Body.setMass(body, 10);
    let jumpable = false

    function move(to, triggered) {
        MOVE[to] = triggered;
        console.log(to, triggered, playerEvent)
    };

    window.addEventListener(playerEvent, (e) => move(e.detail.direction, e.detail.triggered));
    Events.on(engine, 'collisionStart', function(event) {
        var aElm = document.getElementById(event.pairs[0].bodyA.elementId);
        var bElm = document.getElementById(event.pairs[0].bodyB.elementId);
        if (aElm === body.elementId || bElm === body.elementId){
            jumpable = true;
        }
    });
    Events.on(engine, 'beforeUpdate', function(event) {
        let xForce = 0;
        let yForce = 0;
        if (MOVE["UP"]){
            if (jumpable){
                yForce = -0.3;
                jumpable = false;
            }
        }
        if (MOVE["DOWN"]){
            yForce = 0.01;
        }
        if (MOVE["RIGHT"]){
            xForce = 0.1;
        }
        if (MOVE["LEFT"]){
            xForce = -0.1;
        }
        Body.applyForce(body, body.position, {x: xForce, y: yForce});
    });
    return body;
};
