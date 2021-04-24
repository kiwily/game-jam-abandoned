const socket = io();


socket.emit("new client", "name");

let assets;
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
socket.on("init", function(data) {
    console.log("init", data)
    assets = [];

    // Initializing players
    ulScore = document.querySelector("#ul-score");
    PLAYERS_ID = data.players_id;
    PLAYERS_LOST = data.players_lost;
    PLAYERS_COLOR = data.players_color;

    // Initializing objects
    for (object in data.objects){
        const asset;
        const props = {
            isStatic: true,
            render: {
                sprite: {
                    texture: object.texture,
                    xScale: object.ratio,
                    yScale: object.ratio,
                }
            }
        };
        if (object.type === "rectangle"){
            asset = Bodies.rectangle(object.x, object.y, object.width , object.height, props);
        } else {
            asset = Bodies.circle(object.x, object.y, object.width , object.height, props);
        }
        assets.push(asset);
        Composite.add(engine.world, asset)
    }
});

// Frame per frame updates
socket.on("update", function(data) {
    console.log("new update", data)

    data.objects.forEach((object, i) => {
        asset = assets[i];
        Body.setPosition(asset, {
          x: object.x,
          y: object.y,
        });
        asset.render.sprite.texture = object.texture;
    });
});
