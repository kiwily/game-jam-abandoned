

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
        Body.setPosition(switcher, {x, y});
    }

    Body.setMass(switcher, 55);
    setPosition();

    // Check collisions to create a switch
    Events.on(engine, 'collisionStart', function(event) {
        // var aElm = event.pairs[0].bodyA.label;
        // var bElm = event.pairs[0].bodyB.label;
        // if ((aElm === switcher.label && players.includes(bElm)) || (players.includes(aElm) && bElm === switcher.label)){
        //     // Son
        //     const num = Math.floor(Math.random() * 3 + 1)
        //     const audioPower = new Audio('./assets/sounds/power_meter_full/00' + String(num) + '_power-meter-full.wav');
        //     audioPower.play()
        //     // Event
        //     window.dispatchEvent(new Event("switch"))
        //     // Replace the switcher
        //     setPosition()
        // }
    });

    Events.on(engine, 'beforeUpdate', function(event) {
        Body.rotate(switcher, 0.01);
    });

    return {
      switcher: switcher,
      listeners: []
    };
};
