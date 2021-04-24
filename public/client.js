const ulScore = document.querySelector("#ul-score");

socket.emit("new client", "name");


let assets = {};
let PLAYERS_ID;
let PLAYERS_COLOR;

socket.on("connect id", function(data) {
    PLAYER_ID = data.playerId;
});

// Dispatch key pressed
window.addEventListener('keydown', function (e) {
    const keyCode = e?.keyCode || null;
    if (keyCode){
        socket.emit("client keyboard", {
            playerId: PLAYER_ID,
            keyDown: true,
            keyCode
        });
    }
}, false);

// Dispatch key released
window.addEventListener('keydown', function (e) {
    const keyCode = e?.keyCode || null;
    if (keyCode){
        socket.emit("client keyboard", {
            playerId: PLAYER_ID,
            keyDown: false,
            keyCode
        });
    }
}, false);

function renderUlScore() {
    while (ulScore.firstChild) {
      ulScore.removeChild(ulScore.firstChild);
    };

    PLAYERS_ID.forEach((item, i) => {
      const liItem = document.createElement("li");
      const content = document.createTextNode(`Player ${item}: ${PLAYERS_LOST[item]}`);

      liItem.appendChild(content);

      liItem.style.color = PLAYERS_COLOR[i];
      ulScore.appendChild(liItem);
    });
}



// Initialisation for organizing objects
socket.on("client update", function(data) {
    // Updating players
    PLAYERS_ID = data.players_id;
    PLAYERS_LOST = data.players_lost;
    PLAYERS_COLOR = data.players_color;
    renderUlScore();

    assetsVerified = Object.create(assets);
    // Updating objects
    data.objects.forEach((object, _) => {
        if (assets[object.id]){
            // Object exists, we update it
            Body.setPosition(assets[object.id], object.position);
            assets[object.id].render.sprite = object.sprite;
            assets[object.id].angle = object.angle;
            // Mark it as visited
            delete assetsVerified[object.id];
        } else {
            // Object doesn't exist, we create it
            const props = {
                isStatic: true,
                render: {
                    sprite: object.sprite
                }
            };
            asset = Bodies.rectangle(object.position.x, object.position.y, 1 , 1, props);
            asset.angle = object.angle;
            Composite.add(engine.world, asset)
            // Remember this object for future updates
            assets[object.id] = asset;

        }
    });
    // Remove unused objects from assets
    Object.keys(assetsVerified).forEach((key, _) => {
        Composite.remove(engine.world, assets.key)
        delete assets.key
    });
});

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();
