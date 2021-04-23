// src/terrain.js

const MAXIMUM_STACK = 5
const INV_MAXIMUM_STACK = 1 / MAXIMUM_STACK

function Terrain() {
  const platforms = [];
  const pulsations = [];
  for (let i = 0; i < MAXIMUM_STACK; i++) {

    const x = (0.2 + 0.6 * Math.random()) * WIDTH;
    const y = (0.3 + 0.6 * i * INV_MAXIMUM_STACK ) * HEIGHT;

    const width = 150 + 100 * Math.random();
    const height = 50;

    platforms.push(
      Bodies.rectangle(x, y, width , height, { isStatic: true })
    );

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
  };

  Events.on(engine, 'beforeUpdate', (event) => {
    for (let i = 0; i < platforms.length; i++) {
      const platform = platforms[i];
      const pulsation = pulsations[i];
      const y = pulsation.offset + pulsation.amplitude * Math.sin(engine.timing.timestamp * pulsation.speed - pulsation.angle);
      // platform is static so must manually update velocity for friction to work
      Body.setVelocity(platform, { x: y - platform.position.x, y: 0 });
      Body.setPosition(platform, { x: y, y: platform.position.y });
    }
  });

  return (
    [
      ...platforms,
      Bodies.rectangle(WIDTH / 2, HEIGHT, WIDTH, 50, { isStatic: true }),
    ]
  );
};
