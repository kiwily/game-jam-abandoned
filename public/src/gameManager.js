const PLAYERS_ID = [];
const PLAYERS_EVENT = {};
const PLAYERS_COLOR = {};
const PLAYERS_OBJECT = {}
let PLAYERS_COLOR_LENGTH = PLAYERS_COLOR.length;

function addPlayer(playerId) {
  const player = Square(400, 200, PLAYERS_EVENT[playerId], playerId);
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

    PLAYERS_ID.push(newPlayerId);
    PLAYERS_EVENT['key-event-' + PLAYER_ID] = newPlayerId;
    PLAYERS_COLOR[newPlayerId] = 'blue';

    PLAYERS_COLOR_LENGTH = PLAYERS_COLOR.length;
  });

  socket.on("host disconnect id", (data) => {
    const oldPlayerId = data.oldPlayerId;
    removePlayer(oldPlayerId);

    delete PLAYERS_ID.oldPlayerId;
    delete PLAYERS_EVENT['key-event-' + PLAYER_ID];
    delete PLAYERS_COLOR[oldPlayerId];

    PLAYERS_COLOR_LENGTH = PLAYERS_COLOR.length;
  });

  // Collisions
  Events.on(engine, 'collisionStart', function(event) {
    var elem1 = event.pairs[0].bodyA;
    var elem2 = event.pairs[0].bodyB;
    // Collision between two players
    if (PLAYERS_ID.includes(elem1.label) && PLAYERS_ID.includes(elem2.label)){
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
    } else if (PLAYERS_ID.includes(elem1.label)){
      window.dispatchEvent(new CustomEvent(elem1.label, {
        bubbles: true,
        detail:{
          direction: "JUMPABLE",
          triggered: true
        }
      }));
      // Collision between player and anything
    } else if (PLAYERS_ID.includes(elem2.label)){
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
    socket.emit("host update", {
      players_id: PLAYERS_ID,
      players_lost: PLAYERS_LOST,
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
