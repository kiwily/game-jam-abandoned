let player1Event = "PLAYER_1_EVENT";
let player2Event = "PLAYER_2_EVENT";

function GameManager() {
  Composite.add(engine.world, Terrain());


  const squares = {
    squareA: Square(400, 200, player1Event, "#c00000"),
    squareB: Square(450, 50, player2Event, "#000eff"),
  };

  // add all of the bodies to the world
  Composite.add(engine.world, Object.values(squares));

  Controler(player1Event, player2Event)

  // run the renderer
  Render.run(render);
  
  // create runner
  const runner = Runner.create();
  loop()
};

GameManager();


// run the engine
function loop() {
    Engine.update(engine, 1000/60)
    requestAnimationFrame(loop);
}
