const AUDIO_POWERS = [
  new Audio('./assets/sounds/power_meter_full/001_power-meter-full.wav'),
  new Audio('./assets/sounds/power_meter_full/002_power-meter-full.wav'),
  new Audio('./assets/sounds/power_meter_full/003_power-meter-full.wav'),
];

function Switcher() {
    // Instantiating the switcher
    const switcher = Bodies.circle(0, 0, 10, {
        label: "switcher",
        isStatic: true,
        isSensor: true,
        render: {
            sprite: {
                texture: "./assets/jumperpack_kenney/PNG/Items/carrot.png",
                xScale: 0.34,
                yScale: 0.34
            }
       }
    });

    // Function for repositionning when switcher is consumed
    function setPosition() {
        const x = 50 + Math.floor(Math.random() * (WIDTH - 100))
        const y = 50 + Math.floor(Math.random() * (HEIGHT - 100))
        switcher.angle = 0;
        Body.setPosition(switcher, {x:x, y:y});
        Body.setVelocity(switcher, {x:0, y:0});
    }

    Body.setMass(switcher, 55);
    setPosition();

    Events.on(engine, 'beforeUpdate', function(event) {
        Body.rotate(switcher, 0.01);
    });

    function hasBeenTouched(pair) {
      const bodyA = pair.bodyA;
      const bodyB = pair.bodyB;

      const otherBody = bodyA === switcher ? bodyB : bodyB === switcher ? bodyA : undefined;
      if (otherBody === undefined) {
        return;
      };
      // Sound
      AUDIO_POWERS[Math.floor(Math.random() * AUDIO_POWERS.length)].play();
      // Switch
      window.dispatchEvent(new Event("switch"))
      setPosition()
    };

    return {
      switcher: switcher,
      listeners: [hasBeenTouched]
    };
};
