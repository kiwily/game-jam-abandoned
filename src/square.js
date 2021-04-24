
const DEFAULT_MOVING = {
    "UP": false,
    "DOWN": false,
    "RIGHT": false,
    "LEFT": false,
    "JUMPABLE": true,
    "EXPLOSION": false,
    "EXPLOSION_X": 0,
    "EXPLOSION_Y": 0
};

function Square(x_init, y_init, playerEvent, cId, assets) {
    let colorId = cId;
    let currentAssetTime = 0;
    // Map for fluid movements
    let isMoving = Object.create(DEFAULT_MOVING);
    // Instantiating the rectangle with its color
    const body = Bodies.rectangle(x_init, y_init, 20, 20, {
        friction: 0.3,
        label: playerEvent,
        render: {
            fillStyle: PLAYERS_COLOR[colorId],
            lineWidth: 3,
            sprite: {
                texture: "./assets/jumperpack_kenney/PNG/Players/bunny1_ready.png",
                xScale: 0.18,
                yScale: 0.18
            }
       }
    });
    Body.setMass(body, 15);
    // Update movement
    function move(to, triggered) {
        isMoving[to] = triggered;
    };
    // Update movement
    function explose(label, xForce, yForce) {
        if (body.label === label){
            isMoving["EXPLOSION"] = true;
            isMoving["EXPLOSION_X"] = xForce;
            isMoving["EXPLOSION_Y"] = yForce;
        }
    };

    // Event for key pressed
    window.addEventListener(playerEvent, (e) => move(e.detail.direction, e.detail.triggered));
    // Event for explosion
    window.addEventListener("explosion", (e) => explose(e.detail.label, e.detail.xForce, e.detail.yForce));

    window.addEventListener('switch', function (e) {
        colorId ++;
        if (colorId >= PLAYERS_COLOR_LENGTH){
            colorId = 0;
        };
        body.render.fillStyle = PLAYERS_COLOR[colorId];
        isMoving = Object.create(DEFAULT_MOVING);
    });

    Events.on(engine, 'beforeUpdate', function(event) {
        console.log(body.angle)
        Body.rotate(body, -body.angle/30)
        // Update du sprite
        // currentAssetTime ++;
        // if (currentAssetTime >= 20){
        //     currentAssetTime = 0;
        // }
        // const t = Math.floor(currentAssetTime/10);
        // Sortie sur les bords
        if (body.position.x < -5){
            Body.setPosition(body, {x: WIDTH + 2, y: body.position.y});
        }
        if (body.position.x > WIDTH + 5){
            Body.setPosition(body, {x: -2, y: body.position.y});
        }
        // Sortie en bas
        if (body.position.y > HEIGHT + 40){
            document.dispatchEvent(new CustomEvent("lost", {
                bubbles: true,
                detail:{
                    player: colorId,
                }
            }));
            Body.setPosition(body, {x: WIDTH / 2, y: 40});
            Body.setVelocity(body, {
              x: 0,
              y: 0,
            });
            Body.applyForce(body, body.position, {
              x: 0,
              y: -0.2,
            });
        }
        // Periodic update for fluid movements
        let xForce = 0;
        let yForce = 0;
        if (isMoving["EXPLOSION"]){
            //body.render.sprite.texture = assets.hurt[t];
            xForce = isMoving["EXPLOSION_X"];
            yForce = isMoving["EXPLOSION_Y"];
            isMoving["EXPLOSION"] = false;
        } else if (isMoving["UP"]){
            if (isMoving["JUMPABLE"]){
                //body.render.sprite.texture = assets.jump[t];
                yForce = -0.4;
                isMoving["JUMPABLE"] = false;
            }
        } else if (isMoving["DOWN"]){
            //body.render.sprite.texture = assets.jump[t];
            yForce = 0.01;
        } else if (isMoving["RIGHT"]){
            //body.render.sprite.texture = assets.walk[t];
            xForce = 0.015;
        } else if (isMoving["LEFT"]){
            //body.render.sprite.texture = assets.walk[t];
            //body.render.sprite.xScale = -1;
            xForce = -0.015;
        } else {
            console.log("waiting")
            //body.render.sprite.texture = assets.stand[t];
        }
        Body.applyForce(body, body.position, {x: xForce, y: yForce});
    });
    return body;
};
