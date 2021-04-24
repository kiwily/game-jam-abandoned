


function Square(x_init, y_init, playerEvent) {
    let isMoving = {
        "UP": false,
        "DOWN": false,
        "RIGHT": false,
        "LEFT": false,
    };
    const body = Bodies.rectangle(x_init, y_init, 80, 80, {label: playerEvent});
    Body.setMass(body, 10);
    let jumpable = false

    function move(to, triggered) {
        isMoving[to] = triggered;
    };

    window.addEventListener(playerEvent, (e) => move(e.detail.direction, e.detail.triggered));
    Events.on(engine, 'collisionStart', function(event) {
        var aElm = event.pairs[0].bodyA.label;
        var bElm = event.pairs[0].bodyB.label;
        //console.log("collision", event.pairs[0].bodyA, event.pairs[0].bodyB, body.label)
        if (aElm === body.label || bElm === body.label){
            jumpable = true;
            console.log("jumpable", body.label)
        }
    });
    Events.on(engine, 'beforeUpdate', function(event) {
        let xForce = 0;
        let yForce = 0;
        if (isMoving["UP"]){
            if (jumpable){
                console.log("JUMPINNG", body.label)
                yForce = -0.3;
                jumpable = false;
            }
        }
        if (isMoving["DOWN"]){
            yForce = 0.01;
        }
        if (isMoving["RIGHT"]){
            xForce = 0.01;
        }
        if (isMoving["LEFT"]){
            xForce = -0.01;
        }
        Body.applyForce(body, body.position, {x: xForce, y: yForce});
    });
    return body;
};
