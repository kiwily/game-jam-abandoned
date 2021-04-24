

function Switcher(players) {
    // Instantiating the switcher
    const body = Bodies.circle(400, 100, 4, {
        label: "switcher",
        isStatic: true,
        isSensor: true,
        render: {
            fillStyle: "#ff00ff"
       }
    });
    Body.setMass(body, 55);

    // Function for repositionning when switcher is consumed
    function reposition() {
        const x = 50 + Math.floor(Math.random() * (WIDTH - 100))
        const y = 50 + Math.floor(Math.random() * (HEIGHT - 100))
        Body.setPosition(body, {x, y});
    }

    // Check collisions to create a switch
    Events.on(engine, 'collisionStart', function(event) {
        var aElm = event.pairs[0].bodyA.label;
        var bElm = event.pairs[0].bodyB.label;
        if ((aElm === body.label && players.includes(bElm)) || (players.includes(aElm) && bElm === body.label)){
            window.dispatchEvent(new Event("switch"))
            reposition()
        }
    });

    return body;
};
