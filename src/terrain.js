// src/terrain.js

const MAXIMUM_STACK = 3
const INV_MAXIMUM_STACK = 1 / MAXIMUM_STACK

const LOWER_BOUND = 0.8 * HEIGHT;
const HIGHER_BOUND = 0.2 * HEIGHT;

const SPEED_UP = 0.0002;

function Terrain() {
  const pulsations = [];

  const platforms = Composites.stack(0, HIGHER_BOUND, 1, MAXIMUM_STACK, 0, 0, (xr, yr, columnr, rowr) => {
    const x = (0.2 + 0.6 * Math.random()) * WIDTH;
    const y = HIGHER_BOUND + (LOWER_BOUND - HIGHER_BOUND) * (rowr * INV_MAXIMUM_STACK);

    const width = 150 + 100 * Math.random();
    const height = 50;

    const angle = Math.random() * Math.PI * 2;
    const amplitude = 50 + 100 * Math.random();
    const speed = 0.001 + 0.002 * Math.random();
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
  Events.on(engine, 'beforeUpdate', (event) => {
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

  return (
    [
      platforms,
      Bodies.rectangle(WIDTH / 2, HEIGHT, WIDTH, 50, { isStatic: true }),
    ]
  );
};
