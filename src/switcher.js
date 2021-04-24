

function Switcher(players) {
    // Instantiating the switcher
    const body = Bodies.circle(400, 200, 4, {
        label: "switcher",
        render: {
            fillStyle: "#ff00ff"
       }
    });
    Body.setMass(body, 55);

    // Function for repositionning when switcher is consumed
    function reposition() {
        body.position.x = Math.floor(Math.random() * WIDTH);
        body.position.y = Math.floor(Math.random() * HEIGHT);
    }

    // Check collisions to create a switch
    Events.on(engine, 'collisionStart', function(event) {
        var aElm = event.pairs[0].bodyA.label;
        var bElm = event.pairs[0].bodyB.label;
        if ((aElm === body.label && bElm in players) || (aElm in players && bElm === body.label)){
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
