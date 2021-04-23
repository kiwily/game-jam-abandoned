let player1Event = "PLAYER_1_EVENT";
let player2Event = "PLAYER_2_EVENT";

function GameManager() {
  Composite.add(engine.world, Terrain());


  const squares = {
    squareA: Square(400, 200, player1Event),
    squareB: Square(450, 50, player2Event),
  };

  // add all of the bodies to the world
  Composite.add(engine.world, Object.values(squares));
};

GameManager();

// run the renderer
Render.run(render);

// create runner
const runner = Runner.create();

// run the engine
Runner.run(runner, engine);