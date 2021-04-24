

function Switcher(players) {
    console.log(players)
    // Instantiating the switcher
    const body = Bodies.circle(400, 100, 4, {
        label: "switcher",
        isStatic: true,
        render: {
            fillStyle: "#ff00ff"
       }
    });
    Body.setMass(body, 55);

    // Function for repositionning when switcher is consumed
    function reposition() {
        const x = 50 + Math.floor(Math.random() * (WIDTH - 100))
        const y = 50 + Math.floor(Math.random() * (HEIGHT - 100))
        console.log("SWITCH", x, y)
        body.position.x = 400;
        body.position.y = 200;
    }

    // Check collisions to create a switch
    Events.on(engine, 'collisionStart', function(event) {
        var aElm = event.pairs[0].bodyA.label;
        var bElm = event.pairs[0].bodyB.label;
        if ((aElm === body.label && players.includes(bElm)) || (players.includes(aElm) && bElm === body.label)){
            window.dispatchEvent(new Event("SWITCH"))
            reposition()
        }
    });
    // Periodic update for repositionning
    Events.on(engine, 'beforeUpdate', function(event) {
        if (body.position.y > HEIGHT){
            reposition()
        }
    });
    return body;
};
