const EXPLOSION_STRENGTH = 0.03;

const PLAYERS_ASSETS = {
  "#9e6d3d": {
  stand: [
    "./assets/jumperpack_kenney/PNG/Players/bunny1_stand.png",
    "./assets/jumperpack_kenney/PNG/Players/bunny1_stand.png"
  ],
  walkLeft: [
    "./assets/jumperpack_kenney/PNG/Players/bunny1_walk3.png",
    "./assets/jumperpack_kenney/PNG/Players/bunny1_walk4.png"
  ],
  walkRight: [
    "./assets/jumperpack_kenney/PNG/Players/bunny1_walk1.png",
    "./assets/jumperpack_kenney/PNG/Players/bunny1_walk2.png"
  ],
  hurt: [
    "./assets/jumperpack_kenney/PNG/Players/bunny1_hurt.png",
    "./assets/jumperpack_kenney/PNG/Players/bunny1_hurt.png"
  ],
  jump: [
    "./assets/jumperpack_kenney/PNG/Players/bunny1_jump.png",
    "./assets/jumperpack_kenney/PNG/Players/bunny1_jump.png"
  ]
},
"#a160cc": {
  stand: [
    "./assets/jumperpack_kenney/PNG/Players/bunny2_ready.png",
    "./assets/jumperpack_kenney/PNG/Players/bunny2_stand.png"
  ],
  walkLeft: [
    "./assets/jumperpack_kenney/PNG/Players/bunny2_walk3.png",
    "./assets/jumperpack_kenney/PNG/Players/bunny2_walk4.png"
  ],
  walkRight: [
    "./assets/jumperpack_kenney/PNG/Players/bunny2_walk1.png",
    "./assets/jumperpack_kenney/PNG/Players/bunny2_walk2.png"
  ],
  hurt: [
    "./assets/jumperpack_kenney/PNG/Players/bunny2_hurt.png",
    "./assets/jumperpack_kenney/PNG/Players/bunny2_hurt.png"
  ],
  jump: [
    "./assets/jumperpack_kenney/PNG/Players/bunny2_jump.png",
    "./assets/jumperpack_kenney/PNG/Players/bunny2_jump.png"
  ]
},
"#672a0f": {
  stand: [
    "./assets/jumperpack_kenney/PNG/Players/bunny3_ready.png",
    "./assets/jumperpack_kenney/PNG/Players/bunny3_stand.png"
  ],
  walkLeft: [
    "./assets/jumperpack_kenney/PNG/Players/bunny3_walk3.png",
    "./assets/jumperpack_kenney/PNG/Players/bunny3_walk4.png"
  ],
  walkRight: [
    "./assets/jumperpack_kenney/PNG/Players/bunny3_walk1.png",
    "./assets/jumperpack_kenney/PNG/Players/bunny3_walk2.png"
  ],
  hurt: [
    "./assets/jumperpack_kenney/PNG/Players/bunny3_hurt.png",
    "./assets/jumperpack_kenney/PNG/Players/bunny3_hurt.png"
  ],
  jump: [
    "./assets/jumperpack_kenney/PNG/Players/bunny3_jump.png",
    "./assets/jumperpack_kenney/PNG/Players/bunny3_jump.png"
  ]
},
"#4f0a06": {
  stand: [
    "./assets/jumperpack_kenney/PNG/Players/bunny4_ready.png",
    "./assets/jumperpack_kenney/PNG/Players/bunny4_stand.png"
  ],
  walkLeft: [
    "./assets/jumperpack_kenney/PNG/Players/bunny4_walk3.png",
    "./assets/jumperpack_kenney/PNG/Players/bunny4_walk4.png"
  ],
  walkRight: [
    "./assets/jumperpack_kenney/PNG/Players/bunny4_walk1.png",
    "./assets/jumperpack_kenney/PNG/Players/bunny4_walk2.png"
  ],
  hurt: [
    "./assets/jumperpack_kenney/PNG/Players/bunny4_hurt.png",
    "./assets/jumperpack_kenney/PNG/Players/bunny4_hurt.png"
  ],
  jump: [
    "./assets/jumperpack_kenney/PNG/Players/bunny4_jump.png",
    "./assets/jumperpack_kenney/PNG/Players/bunny4_jump.png"
  ]
},
"#f8d6fc": {
  stand: [
    "./assets/jumperpack_kenney/PNG/Players/bunny5_ready.png",
    "./assets/jumperpack_kenney/PNG/Players/bunny5_stand.png"
  ],
  walkLeft: [
    "./assets/jumperpack_kenney/PNG/Players/bunny5_walk3.png",
    "./assets/jumperpack_kenney/PNG/Players/bunny5_walk4.png"
  ],
  walkRight: [
    "./assets/jumperpack_kenney/PNG/Players/bunny5_walk1.png",
    "./assets/jumperpack_kenney/PNG/Players/bunny5_walk2.png"
  ],
  hurt: [
    "./assets/jumperpack_kenney/PNG/Players/bunny5_hurt.png",
    "./assets/jumperpack_kenney/PNG/Players/bunny5_hurt.png"
  ],
  jump: [
    "./assets/jumperpack_kenney/PNG/Players/bunny5_jump.png",
    "./assets/jumperpack_kenney/PNG/Players/bunny5_jump.png"
  ]
},
"#849cc4": {
  stand: [
    "./assets/jumperpack_kenney/PNG/Players/bunny6_ready.png",
    "./assets/jumperpack_kenney/PNG/Players/bunny6_stand.png"
  ],
  walkLeft: [
    "./assets/jumperpack_kenney/PNG/Players/bunny6_walk3.png",
    "./assets/jumperpack_kenney/PNG/Players/bunny6_walk4.png"
  ],
  walkRight: [
    "./assets/jumperpack_kenney/PNG/Players/bunny6_walk1.png",
    "./assets/jumperpack_kenney/PNG/Players/bunny6_walk2.png"
  ],
  hurt: [
    "./assets/jumperpack_kenney/PNG/Players/bunny6_hurt.png",
    "./assets/jumperpack_kenney/PNG/Players/bunny6_hurt.png"
  ],
  jump: [
    "./assets/jumperpack_kenney/PNG/Players/bunny6_jump.png",
    "./assets/jumperpack_kenney/PNG/Players/bunny6_jump.png"
  ]
},
"#b6985c": {
  stand: [
    "./assets/jumperpack_kenney/PNG/Players/bunny7_ready.png",
    "./assets/jumperpack_kenney/PNG/Players/bunny7_stand.png"
  ],
  walkLeft: [
    "./assets/jumperpack_kenney/PNG/Players/bunny7_walk3.png",
    "./assets/jumperpack_kenney/PNG/Players/bunny7_walk4.png"
  ],
  walkRight: [
    "./assets/jumperpack_kenney/PNG/Players/bunny7_walk1.png",
    "./assets/jumperpack_kenney/PNG/Players/bunny7_walk2.png"
  ],
  hurt: [
    "./assets/jumperpack_kenney/PNG/Players/bunny7_hurt.png",
    "./assets/jumperpack_kenney/PNG/Players/bunny7_hurt.png"
  ],
  jump: [
    "./assets/jumperpack_kenney/PNG/Players/bunny7_jump.png",
    "./assets/jumperpack_kenney/PNG/Players/bunny7_jump.png"
  ]
}};
const COLORS = Object.keys(PLAYERS_ASSETS);

let currentColorId = 0
function NEXT_AVAILABLE_COLOR(){
  currentColorId ++;
  if (currentColorId >= COLORS.length){
    currentColorId = 0;
  }
  return COLORS[currentColorId];
}

const KEY_DICT = {
    38: {
        "direction": "UP"
    },
    37: {
        "direction": "LEFT"
    },
    39: {
        "direction": "RIGHT"
    },
    40: {
        "direction": "DOWN"
    }
}
const SCALE = 0.18;

// ASSET SIZE
const TERRAIN_ASSETS = {
    "../assets/jumperpack_kenney/PNG/Environment/ground_grass_small.png": {w: 201, h: 100},
    "../assets/jumperpack_kenney/PNG/Environment/ground_grass.png": {w: 380, h: 94},
    "../assets/jumperpack_kenney/PNG/Environment/ground_grass_small_broken.png": {w: 200, h: 100},
    "../assets/jumperpack_kenney/PNG/Environment/ground_grass_broken.png": {w: 380, h: 94},
};
const KEY_TERRAIN_ASSETS = Object.keys(TERRAIN_ASSETS);

const DEFAULT_MOVING = {
  "UP": false,
  "DOWN": false,
  "RIGHT": false,
  "LEFT": false,
  "JUMPABLE": true,
  "EXPLOSION": false,
  "EXPLOSION_X": 0,
  "EXPLOSION_Y": 0
};

const WIDTH = 800;
const HEIGHT = 800;


const MAXIMUM_STACK = 7;
const INV_MAXIMUM_STACK = 1 / MAXIMUM_STACK;
const NUMBER_OF_COLUMN = 2;

const RATIO = .5;
const LOWER_BOUND = 1 * HEIGHT;
const HIGHER_BOUND = 0.1 * HEIGHT;

const SCROLL_SPEED = 1;
