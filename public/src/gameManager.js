const PLAYERS_EVENT_TO_ID = {};
const PLAYERS_ID_TO_EVENT = {};
const PLAYERS_SCORES_LOST = {};
const PLAYERS_OBJECT = {};
const COLOR_FROM_ID = {};


function addPlayer(playerId) {
    PLAYERS_EVENT_TO_ID['key-event-' + playerId] = playerId;
    PLAYERS_ID_TO_EVENT[playerId] = 'key-event-' + playerId;
    COLOR_FROM_ID[playerId] = NEXT_AVAILABLE_COLOR();
    PLAYERS_SCORES_LOST[playerId] = 0;
    const player = Bunny(400, 200, PLAYERS_ID_TO_EVENT[playerId], playerId);
    PLAYERS_OBJECT[playerId] = player;

    Composite.add(engine.world, player);
};

function removePlayer(playerId) {
    Composite.remove(engine.world, PLAYERS_OBJECT[playerId]);
    delete PLAYERS_EVENT_TO_ID['key-event-' + playerId];
    delete PLAYERS_ID_TO_EVENT[playerId];
    delete PLAYERS_SCORES_LOST[playerId];
    delete COLOR_FROM_ID[playerId];
    delete PLAYERS_OBJECT[playerId];
};

function explosionAndJump(pair) {
  var elem1 = pair.bodyA;
  var elem2 = pair.bodyB;
  // Collision between two players
  if (Object.keys(PLAYERS_EVENT_TO_ID).includes(elem1.label) && Object.keys(PLAYERS_EVENT_TO_ID).includes(elem2.label)){
    const num = Math.floor(Math.random() * 7 + 1)
    const audioExplosion = new Audio('./assets/sounds/meow/00' + String(num) + '_meow.wav');
    audioExplosion.play()
    window.dispatchEvent(new CustomEvent("explosion", {
      bubbles: true,
      detail:{
        label: elem1.label,
        xForce: -EXPLOSION_STRENGTH* (elem2.position.x-elem1.position.x),
        yForce: -EXPLOSION_STRENGTH* (elem2.position.y-elem1.position.y)
      }
    }));
    window.dispatchEvent(new CustomEvent("explosion", {
      bubbles: true,
      detail:{
        label: elem2.label,
        xForce: EXPLOSION_STRENGTH* (elem2.position.x-elem1.position.x),
        yForce: EXPLOSION_STRENGTH* (elem2.position.y-elem1.position.y)
      }
    }));
    // Collision between player and anything
  } else if (Object.keys(PLAYERS_EVENT_TO_ID).includes(elem1.label)){
      window.dispatchEvent(new CustomEvent(elem1.label, {
      bubbles: true,
      detail:{
        direction: "JUMPABLE",
        triggered: true
      }
    }));
    // Collision between player and anything
  } else if (Object.keys(PLAYERS_EVENT_TO_ID).includes(elem2.label)){
      window.dispatchEvent(new CustomEvent(elem2.label, {
      bubbles: true,
      detail:{
        direction: "JUMPABLE",
        triggered: true
      }
    }));
  }
};

let IS_GAME_MANAGER = false;
function GameManager() {
  // Only one call
  if (IS_GAME_MANAGER) {
    return;
  };
  const collisionStartListeners = [];
  collisionStartListeners.push(explosionAndJump);

  Composite.add(engine.world, Terrain());

  HostControler();

  // Instantiate switcher
  // const bunnyLabels = objects.map(x => x.label)
  const switchers = [];
  for (let i = 0; i < 3; i++) {
    const {switcher, listeners} = Switcher()
    collisionStartListeners.push(...listeners)
    switchers.push(switcher);
  };
  Composite.add(engine.world, switchers);

  // Listen for new/old player
  socket.on("host connect id", (data) => {
    const newPlayerId = data.newPlayerId;
    addPlayer(newPlayerId);
  });

  socket.on("host disconnect id", (data) => {
    const oldPlayerId = data.oldPlayerId;
    removePlayer(oldPlayerId);
  });

  // Collisions
  Events.on(engine, 'collisionStart', function(event) {
    const pairs = event.pairs;
    for (let i = 0; i < pairs.length; i++) {
      collisionStartListeners.forEach((listener, _) => {
        listener(pairs[i])
      });
    };
  });

  // Send aggregate screenshot to server
  function updateServer(timestamp) {
    renderUlScore();
    socket.emit("host update", {
        colorFromId: COLOR_FROM_ID,
        playersScoresLost: PLAYERS_SCORES_LOST,
        objects: Composite.allBodies(engine.world).map((item, i) => (
        {
          id: item.id,
          sprite: item.render.sprite,
          position: item.position,
          angle: item.angle,
        }
      )),
    });
    window.requestAnimationFrame(updateServer);
  };

  window.requestAnimationFrame(updateServer);

  IS_GAME_MANAGER = true;
};

GameManager();

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine - Need to click on play
Runner.run(runner, engine);
