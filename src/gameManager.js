const PLAYER_EVENTS = ["PLAYER_1_EVENT", "PLAYER_2_EVENT"];
const PLAYER_COLORS = ["#000eff", "#c00000"];
const PLAYER_COLORS_LENGTH = PLAYER_COLORS.length;

function GameManager() {
    Composite.add(engine.world, Terrain());

    const player1Id = 0;
    const player2Id = 1;
    const objects = [
        Square(400, 200, PLAYER_EVENTS[player1Id], player1Id),
        Square(450, 50, PLAYER_EVENTS[player2Id], player2Id)
    ];
    const squaresLabels = objects.map(x => x.label)
    Controler(PLAYER_EVENTS)
    // Instantiate switcher
    const switcher = Switcher(squaresLabels)
    objects.push(switcher);

    // add all of the bodies to the world
    Composite.add(engine.world, objects);

};

GameManager();

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine - Need to click on play
// Runner.run(runner, engine);
