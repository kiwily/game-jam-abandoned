// Active Socket First
const socket = io();

let PLAYER_ID = null;

socket.on("connect id", (data) => {
  PLAYER_ID = data.playerId;
});
// module aliases
const Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Events = Matter.Events,
    Body = Matter.Body,
    Bodies = Matter.Bodies,
    Vector = Matter.Vector,
    Common = Matter.Common,
    Composite = Matter.Composite,
    Composites = Matter.Composites;

// create an engine
const engine = Engine.create();

// create a renderer
const render = Render.create({
    element: document.querySelector("#game"),
    engine: engine,
    options: {
      width: WIDTH,
      height: HEIGHT,
      background: 'url(assets/jumperpack_kenney/PNG/Background/bg_layer1.png)',
      wireframeBackground: 'white',
      wireframes: false
    }
});
