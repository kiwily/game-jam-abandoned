const EXPLOSION_STRENGTH = 0.03;
const PLAYERS_LOST = {};
const PLAYERS_ASSETS = [{
  stand: [
    "./assets/jumperpack_kenney/PNG/Players/bunny1_stand.png",
    "./assets/jumperpack_kenney/PNG/Players/bunny1_stand.png"
  ],
  walkLeft: [
    "./assets/jumperpack_kenney/PNG/Players/bunny1_walk3.png",
    "./assets/jumperpack_kenney/PNG/Players/bunny1_walk4.png"
  ],
  walkRight: [
    "./assets/jumperpack_kenney/PNG/Players/bunny1_walk1.png",
    "./assets/jumperpack_kenney/PNG/Players/bunny1_walk2.png"
  ],
  hurt: [
    "./assets/jumperpack_kenney/PNG/Players/bunny1_hurt.png",
    "./assets/jumperpack_kenney/PNG/Players/bunny1_hurt.png"
  ],
  jump: [
    "./assets/jumperpack_kenney/PNG/Players/bunny1_jump.png",
    "./assets/jumperpack_kenney/PNG/Players/bunny1_jump.png"
  ]
},{
  stand: [
    "./assets/jumperpack_kenney/PNG/Players/bunny2_ready.png",
    "./assets/jumperpack_kenney/PNG/Players/bunny2_stand.png"
  ],
  walkLeft: [
    "./assets/jumperpack_kenney/PNG/Players/bunny2_walk3.png",
    "./assets/jumperpack_kenney/PNG/Players/bunny2_walk4.png"
  ],
  walkRight: [
    "./assets/jumperpack_kenney/PNG/Players/bunny2_walk1.png",
    "./assets/jumperpack_kenney/PNG/Players/bunny2_walk2.png"
  ],
  hurt: [
    "./assets/jumperpack_kenney/PNG/Players/bunny2_hurt.png",
    "./assets/jumperpack_kenney/PNG/Players/bunny2_hurt.png"
  ],
  jump: [
    "./assets/jumperpack_kenney/PNG/Players/bunny2_jump.png",
    "./assets/jumperpack_kenney/PNG/Players/bunny2_jump.png"
  ]
}];

const PLAYERS_ID = [PLAYER_ID];
const PLAYERS_EVENT = {PLAYER_ID:'key-event-' + PLAYER_ID}; // Pas PLAYER_ID en vrai
const PLAYERS_COLOR = {PLAYER_ID:'blue'}

let PLAYERS_COLOR_LENGTH = PLAYERS_COLOR.length;



function GameManager() {
  function addPlayer(playerId) {
    Composite.add(engine.world, Square(400, 200, PLAYERS_EVENT[playerId], playerId));
  };


  Composite.add(engine.world, Terrain());

  addPlayer(PLAYER_ID);

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
    PLAYERS_ID.push(newPlayerId);
    PLAYERS_EVENT[newPlayerId] = 'key-event-' + PLAYER_ID;
    PLAYERS_COLOR[newPlayerId] = 'blue';

    PLAYERS_COLOR_LENGTH = PLAYERS_COLOR.length;
    addPlayer(newPlayerId);
  });

  // Collission
  Events.on(engine, 'collisionStart', function(event) {
    var elem1 = event.pairs[0].bodyA;
    var elem2 = event.pairs[0].bodyB;
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
    } else if (PLAYERS_ID.includes(elem1.label)){
      window.dispatchEvent(new CustomEvent(elem1.label, {
        bubbles: true,
        detail:{
          direction: "JUMPABLE",
          triggered: true
        }
      }));
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
