const AUDIO_LOST = [
  new Audio('./assets/sounds/we_lost/001_we-lost.wav'),
  new Audio('./assets/sounds/we_lost/002_we-lost.wav'),
  new Audio('./assets/sounds/we_lost/003_we-lost.wav'),
];

const AUDIO_JUMP = [
  new Audio('./assets/sounds/jump/001_jump.wav'),
  new Audio('./assets/sounds/jump/002_jump.wav'),
  new Audio('./assets/sounds/jump/003_jump.wav'),
  new Audio('./assets/sounds/jump/004_jump.wav'),
  new Audio('./assets/sounds/jump/005_jump.wav'),
  new Audio('./assets/sounds/jump/006_jump.wav'),
  new Audio('./assets/sounds/jump/007_jump.wav'),
  new Audio('./assets/sounds/swing/001_swing.wav'),
  new Audio('./assets/sounds/swing/002_swing.wav'),
  new Audio('./assets/sounds/swing/003_swing.wav'),
  new Audio('./assets/sounds/swing/004_swing.wav'),
  new Audio('./assets/sounds/swing/005_swing.wav'),
  new Audio('./assets/sounds/swing/006_swing.wav'),
  new Audio('./assets/sounds/swing/007_swing.wav'),
];


function Bunny(x_init, y_init, playerEvent) {
    let currentAssetTime = 0;
    let color = COLOR_FROM_ID[PLAYERS_EVENT_TO_ID[playerEvent]];
    // Map for fluid movements
    let isMoving = Object.create(DEFAULT_MOVING)
    // Instantiating the rectangle with its color
    const body = Bodies.rectangle(x_init, y_init, BUNNY_SIZE * 0.75, BUNNY_SIZE, {
        frictionAir: AIR_FRICTION,
        friction: GROUND_FRICTION,
        label: playerEvent,
        render: {
            lineWidth: 3,
            sprite: {
                texture: PLAYERS_ASSETS[color]["stand"][0],
                xScale: SCALE,
                yScale: SCALE
            }
       }
    });
    Body.setMass(body, WEIGHT);
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
        color = COLOR_FROM_ID[PLAYERS_EVENT_TO_ID[playerEvent]];
        body.render.sprite.texture = PLAYERS_ASSETS[color].hurt[0];
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
            // Sound
            const audio = AUDIO_LOST[Math.floor(Math.random() * AUDIO_LOST.length)];
            playCustomAudio(audio);
            // Event lost pour le score
            document.dispatchEvent(new CustomEvent("lost", {
                bubbles: true,
                detail:{
                    player: PLAYERS_EVENT_TO_ID[playerEvent],
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
            body.render.sprite.texture = PLAYERS_ASSETS[color].hurt[t];
            xForce = isMoving["EXPLOSION_X"];
            yForce = isMoving["EXPLOSION_Y"];
            isMoving["EXPLOSION"] = false;
        }
        if (isMoving["UP"]){
            if (isMoving["JUMPABLE"]){
                // Sound
                const audio = AUDIO_JUMP[Math.floor(Math.random() * AUDIO_JUMP.length)];
                playCustomAudio(audio);
                // Sprite movement
                body.render.sprite.texture = PLAYERS_ASSETS[color].jump[t];
                body.render.sprite.xScale = SCALE;
                body.render.sprite.yScale = SCALE;
                // Jump
                yForce = -JUMP_FORCE;
                isMoving["JUMPABLE"] = false;
            }
        }
        if (isMoving["DOWN"]){
            body.render.sprite.texture = PLAYERS_ASSETS[color].jump[t];
            body.render.sprite.xScale = SCALE;
            body.render.sprite.yScale = SCALE;
            yForce = 0.01;
        }
        if (isMoving["RIGHT"]){
            body.render.sprite.texture = PLAYERS_ASSETS[color].walkRight[t];
            body.render.sprite.xScale = SCALE;
            body.render.sprite.yScale = SCALE;
            xForce = RUN_FORCE;
        }
        if (isMoving["LEFT"]){
            body.render.sprite.texture = PLAYERS_ASSETS[color].walkLeft[t];
            body.render.sprite.xScale = -SCALE;
            body.render.sprite.yScale = SCALE;
            xForce = -RUN_FORCE;
        }
        Body.applyForce(body, body.position, {x: xForce, y: yForce});
    });
    return body;
};
