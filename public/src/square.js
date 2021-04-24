

function Square(x_init, y_init, playerEvent, playerId) {
    let currentAssetTime = 0;
    // Map for fluid movements
    let isMoving = Object.create(DEFAULT_MOVING)
    // Instantiating the rectangle with its color
    const body = Bodies.rectangle(x_init, y_init, 20, 20, {
        frictionAir: 0.03,
        label: playerEvent,
        render: {
            lineWidth: 3,
            sprite: {
                texture: PLAYERS_ASSETS[0]["stand"][0],
                xScale: SCALE,
                yScale: SCALE
            }
       }
    });
    console.log(body.label, playerEvent)
    Body.setMass(body, 15);
    Body.setInertia(body, Infinity);
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
        // colorId ++;
        // if (colorId >= PLAYERS_COLOR_LENGTH){
        //     colorId = 0;
        // };
        // body.render.sprite.texture = PLAYERS_ASSETS[colorId].hurt[0];
        isMoving = Object.create(DEFAULT_MOVING)
    });

    Events.on(engine, 'beforeUpdate', function(event) {
        
        currentAssetTime ++;
        if (currentAssetTime >= 20){
            currentAssetTime = 0;
        }
        const t = Math.floor(currentAssetTime/10);
        // Sortie sur les bords
        if (body.position.x < -5){
            Body.setPosition(body, {x: WIDTH + 2, y: body.position.y});
        }
        if (body.position.x > WIDTH + 5){
            Body.setPosition(body, {x: -2, y: body.position.y});
        }
        // Sortie en bas
        if (body.position.y > HEIGHT + 40){
            // Son
            const num = Math.floor(Math.random() * 3 + 1)
            const audioLost = new Audio('./assets/sounds/we_lost/00' + String(num) + '_we-lost.wav');
            audioLost.play()
            // Event lost pour le score
            document.dispatchEvent(new CustomEvent("lost", {
                bubbles: true,
                detail:{
                    player: 0,
                }
            }));
            // Remise a 0 de la position
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
            body.render.sprite.texture = PLAYERS_ASSETS[0].hurt[t];
            xForce = isMoving["EXPLOSION_X"];
            yForce = isMoving["EXPLOSION_Y"];
            isMoving["EXPLOSION"] = false;
        }
        if (isMoving["UP"]){
            if (isMoving["JUMPABLE"]){
                // Sound
                const num = Math.floor(Math.random() * 7 + 1)
                let audioJump;
                if (Math.random() > 0.5){
                    audioJump = new Audio('./assets/sounds/jump/00' + String(num) + '_jump.wav');
                } else {
                    audioJump = new Audio('./assets/sounds/swing/00' + String(num) + '_swing.wav');
                }
                audioJump.play()
                // Sprite movement
                body.render.sprite.texture = PLAYERS_ASSETS[0].jump[t];
                body.render.sprite.xScale = SCALE;
                body.render.sprite.yScale = SCALE;
                // Jump
                yForce = -0.4;
                isMoving["JUMPABLE"] = false;
            }
        }
        if (isMoving["DOWN"]){
            body.render.sprite.texture = PLAYERS_ASSETS[0].jump[t];
            body.render.sprite.xScale = SCALE;
            body.render.sprite.yScale = SCALE;
            yForce = 0.01;
        }
        if (isMoving["RIGHT"]){
            body.render.sprite.texture = PLAYERS_ASSETS[0].walkRight[t];
            body.render.sprite.xScale = SCALE;
            body.render.sprite.yScale = SCALE;
            xForce = 0.018;
        }
        if (isMoving["LEFT"]){
            body.render.sprite.texture = PLAYERS_ASSETS[0].walkLeft[t];
            body.render.sprite.xScale = -SCALE;
            body.render.sprite.yScale = SCALE;
            xForce = -0.018;
        }
        Body.applyForce(body, body.position, {x: xForce, y: yForce});
    });
    return body;
};
