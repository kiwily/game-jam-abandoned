let player1Event = "PLAYER_1_EVENT";
let player2Event = "PLAYER_2_EVENT";
const player1Color = ["#000eff", "#c00000"];
const player2Color = ["#c00000", "#000eff"];

function GameManager() {
    Composite.add(engine.world, Terrain());


    const objects = {
        squareA: Square(400, 200, player1Event, player1Color),
        squareB: Square(450, 50, player2Event, player2Color)
    };
    const squaresLabels = [
        objects.squareA.label,
        objects.squareB.label
    ];
    // Instantiate switcher
    const switcher = Switcher(squaresLabels)
    objects["switcher"] = switcher;

    // add all of the bodies to the world
    Composite.add(engine.world, Object.values(objects));

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
