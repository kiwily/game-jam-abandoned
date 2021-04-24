const PLAYERS_EVENT = ["PLAYER_1_EVENT", "PLAYER_2_EVENT"];
const PLAYERS_COLOR = ["#000eff", "#c00000"];
const PLAYERS_ID = [0, 1];
const PLAYERS_COLOR_LENGTH = PLAYERS_COLOR.length;

function GameManager() {
    Composite.add(engine.world, Terrain());

    const player1Id = PLAYERS_ID[0];
    const player2Id = PLAYERS_ID[1];
    const objects = [
        Square(400, 200, PLAYERS_EVENT[player1Id], player1Id),
        Square(450, 50, PLAYERS_EVENT[player2Id], player2Id)
    ];
    const squaresLabels = objects.map(x => x.label)
    Controler(PLAYERS_EVENT)
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
