


function Square(x_init, y_init, playerEvent, cId) {
    let colorId = cId;
    // Map for fluid movements
    let isMoving = {
        "UP": false,
        "DOWN": false,
        "RIGHT": false,
        "LEFT": false,
    };
    // Instantiating the rectangle with its color
    const body = Bodies.rectangle(x_init, y_init, 20, 20, {
        friction: 0.3,
        label: playerEvent,
        render: {
            fillStyle: PLAYERS_COLOR[colorId],
            lineWidth: 3
       }
    });
    Body.setMass(body, 15);
    let jumpable = false;

    // Update movement
    function move(to, triggered) {
        isMoving[to] = triggered;
    };

    // Event for key pressed
    window.addEventListener(playerEvent, (e) => move(e.detail.direction, e.detail.triggered));

    window.addEventListener('switch', function (e) {
        colorId ++;
        if (colorId >= PLAYERS_COLOR_LENGTH){
            colorId = 0;
        };
        body.render.fillStyle = PLAYERS_COLOR[colorId];
        isMoving = {
            "UP": false,
            "DOWN": false,
            "RIGHT": false,
            "LEFT": false,
        }
    });

    // Check collisions to allow a new jump
    Events.on(engine, 'collisionStart', function(event) {
        var aElm = event.pairs[0].bodyA.label;
        var bElm = event.pairs[0].bodyB.label;
        if (aElm === body.label || bElm === body.label){
            jumpable = true;
        }
    });

    Events.on(engine, 'beforeUpdate', function(event) {
        // Sortie sur les bords
        if (body.position.x < -5){
            Body.setPosition(body, {x: WIDTH + 2, y: body.position.y});
        }
        if (body.position.x > WIDTH + 5){
            Body.setPosition(body, {x: -2, y: body.position.y});
        }
        // Sortie en bas
        if (body.position.y < -30){
            window.dispatchEvent(new CustomEvent("lost", { 
                bubbles: true,
                detail:{
                    player: colorId,
                }
            }));
            Body.setPosition(body, {x: body.position.x, y: -40});
        }
        // Periodic update for fluid movements
        let xForce = 0;
        let yForce = 0;
        if (isMoving["UP"]){
            if (jumpable){
                console.log("JUMPINNG", body.label)
                yForce = -0.4;
                jumpable = false;
            }
        }
        if (isMoving["DOWN"]){
            yForce = 0.01;
        }
        if (isMoving["RIGHT"]){
            xForce = 0.015;
        }
        if (isMoving["LEFT"]){
            xForce = -0.015;
        }
        Body.applyForce(body, body.position, {x: xForce, y: yForce});
    });
    return body;
};
