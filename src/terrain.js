// src/terrain.js

function Terrain() {
  return (
    [
      Bodies.rectangle(WIDTH / 2, 0, WIDTH, 50, { isStatic: true }),
      Bodies.rectangle(WIDTH / 2, HEIGHT, WIDTH, 50, { isStatic: true }),
      Bodies.rectangle(WIDTH, HEIGHT / 2, 50, HEIGHT, { isStatic: true }),
      Bodies.rectangle(0, HEIGHT / 2, 50, HEIGHT, { isStatic: true }),
    ]
  );
};
