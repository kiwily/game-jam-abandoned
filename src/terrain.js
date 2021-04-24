// src/terrain.js

const MAXIMUM_STACK = 32
const INV_MAXIMUM_STACK = 1 / MAXIMUM_STACK
const NUMBER_OF_COLUMN = 2

const PLATFORM_HEIGHT = 40;

const LOWER_BOUND = 1 * HEIGHT + PLATFORM_HEIGHT * 2;
const HIGHER_BOUND = 0.1 * HEIGHT;

const SCROLL = 1;

function Terrain() {
  const pulsations = [];

  const platforms = Composites.stack(0, HIGHER_BOUND, 1, MAXIMUM_STACK, 0, 0, (xr, yr, columnr, rowr) => {
    const x = (0.5 * (rowr % 2) + 0.5 * (0.2 + 0.6 * Math.random())) * WIDTH;
    const y = HIGHER_BOUND + (LOWER_BOUND - HIGHER_BOUND) * (rowr * INV_MAXIMUM_STACK);

    const width = 300 + 200 * Math.random();
    const height = PLATFORM_HEIGHT;

    const angle = Math.random() * Math.PI * 2;
    const amplitude = 50 + 100 * Math.random();
    const speed = 0.0005 + 0.0005 * Math.random();
    const offset = x - amplitude * Math.sin(angle);
    pulsations.push({
      angle: angle,
      amplitude: amplitude,
      speed: speed,
      offset: offset,
    })

    return (
      Bodies.rectangle(x, y, width , height, { isStatic: true })
    );
  });

  // Move platform left to right
  Events.on(engine, "beforeUpdate", (event) => {
    engine.timing.timeScale = 1;

    for (let i = 0; i < platforms.bodies.length; i++) {
      const platform = platforms.bodies[i];
      const pulsation = pulsations[i];

      const x = pulsation.offset + pulsation.amplitude * Math.sin(engine.timing.timestamp * pulsation.speed - pulsation.angle);

      // platform is static so must manually update velocity for friction to work
      Body.setVelocity(platform, {
        x: x - platform.position.x,
        y: 0,
      });
      Body.setPosition(platform, {
        x: x,
        y: platform.position.y,
      });
    }
  });

  // // Move platform left to right
  // Events.on(engine, "afterUpdate", (event) => {
  //   engine.timing.timeScale = 1;
  //   for (var i = 0; i < platforms.bodies.length; i += 1) {
  //     var platform = platforms.bodies[i];
  //
  //     // animate stairs
  //     Body.translate(platform, {
  //       x: 0,
  //       y: SCROLL * engine.timing.timeScale
  //     });
  //
  //     // loop stairs when they go off screen
  //     if (platform.position.y > LOWER_BOUND) {
  //       Body.setPosition(platform, {
  //         x: platform.position.x,
  //         y: HIGHER_BOUND,
  //       });
  //
  //       Body.setVelocity(platform, {
  //         x: 0,
  //         y: 0,
  //       });
  //     }
  //   }
  // });


  return (
    [
      platforms,
      // Bodies.rectangle(WIDTH / 2, HEIGHT, WIDTH, 50, { isStatic: true }),
    ]
  );
};
