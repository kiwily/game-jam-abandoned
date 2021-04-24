const PLAYERS_EVENT = ["PLAYER_1_EVENT", "PLAYER_2_EVENT"];
const PLAYERS_COLOR = ["#000eff", "#c00000"];
const PLAYERS_ID = [0, 1];
const PLAYERS_COLOR_LENGTH = PLAYERS_COLOR.length;
const EXPLOSION_STRENGTH = 10000;

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

    // 
    Events.on(engine, 'collisionStart', function(event) {
        var elem1 = event.pairs[0].bodyA;
        var elem2 = event.pairs[0].bodyB;
        if (PLAYERS_EVENT.includes(elem1.label) && PLAYERS_EVENT.includes(elem2.label)){
            window.dispatchEvent(new CustomEvent("explosion", { 
                bubbles: true,
                detail:{
                    label: elem1.label,
                    xForce: -0.03* (elem2.position.x-elem1.position.x),
                    yForce: -0.03* (elem2.position.y-elem1.position.y)
                } 
            }));
            window.dispatchEvent(new CustomEvent("explosion", { 
                bubbles: true,
                detail:{
                    label: elem2.label,
                    xForce: 0.03* (elem2.position.x-elem1.position.x),
                    yForce: 0.03* (elem2.position.y-elem1.position.y)
                }
            }));
        } else if (PLAYERS_EVENT.includes(elem1.label)){
            window.dispatchEvent(new CustomEvent(elem1.label, { 
                bubbles: true,
                detail:{
                    direction: "JUMPABLE",
                    triggered: true
                } 
            }));
        } else if (PLAYERS_EVENT.includes(elem2.label)){
            window.dispatchEvent(new CustomEvent(elem2.label, { 
                bubbles: true,
                detail:{
                    direction: "JUMPABLE",
                    triggered: true
                } 
            }));
        }
    });

};

GameManager();

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine - Need to click on play
// Runner.run(runner, engine);
