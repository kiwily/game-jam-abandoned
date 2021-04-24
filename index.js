const WIDTH = 800;
const HEIGHT = 200;

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
      background: 'white',
      wireframeBackground: 'white',
      wireframes: false
    }
});
