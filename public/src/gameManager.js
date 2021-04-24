const PLAYERS_EVENT_TO_ID = {};
const PLAYERS_ID_TO_EVENT = {};
const PLAYERS_SCORES_LOST = {};
const PLAYERS_COLOR = {};
const PLAYERS_OBJECT = {}
let PLAYERS_COLOR_LENGTH = PLAYERS_COLOR.length;


function addPlayer(playerId) {
    PLAYERS_EVENT_TO_ID['key-event-' + playerId] = playerId;
    PLAYERS_ID_TO_EVENT[playerId] = 'key-event-' + playerId;
    PLAYERS_COLOR[playerId] = 'blue';
    const player = Square(400, 200, PLAYERS_ID_TO_EVENT[playerId], playerId);
    PLAYERS_OBJECT[playerId] = player;
    Composite.add(engine.world, player);
};

function removePlayer(playerId) {
  Composite.remove(engine.world, PLAYERS_OBJECT[playerId]);
};

function GameManager() {
  Composite.add(engine.world, Terrain());

  HostControler();

  // Instantiate switcher
  // const squaresLabels = objects.map(x => x.label)
  // const switcher = Switcher(squaresLabels)
  // objects.push(switcher);

  // add all of the bodies to the world
  // Composite.add(engine.world, objects);

  // Listen for new/old player
  socket.on("host connect id", (data) => {
    const newPlayerId = data.newPlayerId;

    addPlayer(newPlayerId);

    PLAYERS_COLOR_LENGTH = PLAYERS_COLOR.length;
  });

  socket.on("host disconnect id", (data) => {
    const oldPlayerId = data.oldPlayerId;
    removePlayer(oldPlayerId);

    delete PLAYERS_EVENT_TO_ID['key-event-' + oldPlayerId];
    delete PLAYERS_ID_TO_EVENT[oldPlayerId];
    delete PLAYERS_COLOR[oldPlayerId];
    delete PLAYERS_SCORES_LOST[oldPlayerId];

    PLAYERS_COLOR_LENGTH = PLAYERS_COLOR.length;
  });

  // Collisions
  Events.on(engine, 'collisionStart', function(event) {
    var elem1 = event.pairs[0].bodyA;
    var elem2 = event.pairs[0].bodyB;
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
  });

  // Send aggregate screenshot to server
  function updateServer(timestamp) {
    try {
      renderUlScore();
    } catch (err) {
      console.error("Function not defined for now");
    };

    socket.emit("host update", {
      players_scores_lost: PLAYERS_SCORES_LOST,
      players_color: PLAYERS_COLOR,
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
};


GameManager();

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine - Need to click on play
// Runner.run(runner, engine);
