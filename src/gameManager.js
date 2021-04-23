// let player1Event = "PLAYER_1_EVENT";
// let player2Event = "PLAYER_2_EVENT";

function GameManager() {
  const component = {
    squareA: Square(400, 200, "bonjour"),
    squareB: Square(450, 50, "bonjour"),
    ground: Bodies.rectangle(400, 610, 810, 60, { isStatic: true }),
  };

  // add all of the bodies to the world
  Composite.add(engine.world, Object.values(component));
};

// const init = () => {
//
//     document.addEventListener("SWITCH", function (e) {
//         console.log("SWITCHING")
//         [player1Event, player2Event] = [player2Event, player1Event]
//         controler(player1Event, player2Event)
//     });
//     controler(player1Event, player2Event)
// };
