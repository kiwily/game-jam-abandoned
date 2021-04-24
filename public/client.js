const socket = io();


socket.emit("new client", "name");

let assetsList = [];
let assetsDic = {};
let PLAYERS_ID;
let PLAYERS_LOST;
let PLAYERS_COLOR;
let ulScore;

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
    ulScore = document.querySelector("#ul-score");
    PLAYERS_ID = data.players_id;
    PLAYERS_LOST = data.players_lost;
    PLAYERS_COLOR = data.players_color;

    assetsVerified = Object.copy(assets);
    // Updating objects
    for (object in data.objects){
        if (assets[objet.id]){
            // Object exists, we update it
            Body.setPosition(assets[objet.id].object, object.position);
            assets[objet.id].object.render.sprite = object.sprite;
            assets[objet.id].object.angle = object.angle;
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
    }
    // Remove unused objects from assets
    assetsVerified.keys().forEach((key, _) => {
        Composite.remove(engine.world, assets.key)
        delete assets.key
    });
});

