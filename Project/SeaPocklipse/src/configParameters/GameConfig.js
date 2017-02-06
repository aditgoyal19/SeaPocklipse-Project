
var SP = SP || {};

//game state
SP.GAME_STATE = {
    HOME:0,
    PLAY:1,
    OVER:2
};

//keys
SP.KEYS = [];


//mouse co-ord
SP.MOUSE_X = 0;
SP.MOUSE_Y = 0;

//level
SP.LEVEL = {
    STAGE1:1,
    STAGE2:2,
    STAGE3:3
};

//life
SP.LIFE = 4;

//score
SP.SCORE = 0;

//sound
SP.SOUND = true;

//enemy move type
SP.ENEMY_MOVE_TYPE = {
    ATTACK:0,
    VERTICAL:1,
    HORIZONTAL:2,
    OVERLAP:3
};

//delta x
SP.DELTA_X = -100;

//offset x
SP.OFFSET_X = -24;

//rot
SP.ROT = -5.625;

//bullet type
SP.BULLET_TYPE = {
    PLAYER:1,
    ENEMY:2
};

//weapon type
SP.WEAPON_TYPE = {
    ONE:1
};

//unit tag
SP.UNIT_TAG = {
    ENMEY_BULLET:900,
    PLAYER_BULLET:901,
    ENEMY:1000,
    PLAYER:1000
};

//attack mode
SP.ENEMY_ATTACK_MODE = {
    NORMAL:1,
    TSUIHIKIDAN:2
};

//life up sorce
SP.LIFEUP_SORCE = [50000, 100000, 150000, 200000, 250000, 300000];

//container
SP.CONTAINER = {
    ENEMIES:[],
    ENEMY_BULLETS:[],
    PLAYER_BULLETS:[],
    EXPLOSIONS:[],
    SPARKS:[],
    HITS:[],
    BACKSKYS:[],
    BACKTILEMAPS:[]
};

//bullet speed
SP.BULLET_SPEED = {
    ENEMY:-200,
    SHIP:900
};
// the counter of active enemies
SP.ACTIVE_ENEMIES = 0;

SP.LOGOY = 375;
SP.FLAREY = 445;
SP.SCALE = 1.5;
SP.WIDTH = 480;
SP.HEIGHT = 720;
SP.BULLET_ACC = 0;

//Player Stats
SP.PlayerName = "Undefined";
SP.PlayerScore = 0;