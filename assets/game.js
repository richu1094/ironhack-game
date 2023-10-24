const Game = {
  gameContainer: document.querySelector("#game-container"),
  gameScreen: document.querySelector("#game-screen"),

  gameSize: {
    w: window.innerWidth / 3,
    h: window.innerHeight - 5,
  },

  framesCounter: 0,

  background: undefined,
  player: undefined,
  platforms: [],

  platformDensity: 10,

  keys: {
    LEFT: { code: "ArrowLeft", pressed: false },
    RIGHT: { code: "ArrowRight", pressed: false },
    UP: { code: "ArrowUp", pressed: false },
  },



  init() {
    this.start();
    this.setEventListeners();
  },

  setEventListeners() {
    document.addEventListener("keydown", (key) => {
      switch (key.code) {
        case this.keys.LEFT.code:
          this.keys.LEFT.pressed = true
          // this.player.moveLeft();
          break;
        case this.keys.RIGHT.code:
          this.keys.RIGHT.pressed = true
          // this.player.moveRight();
          break;
      }
    });
    document.addEventListener("keyup", () => {
      this.keys.LEFT.pressed = false
      this.keys.RIGHT.pressed = false
    })
  },

  start() {
    this.createElements();
    this.gameLoop();
  },

  createElements() {
    this.background = new Background(
      this.gameScreen,
      this.gameSize,
      this.gameContainer

    );


    // this.platforms.push(new Platform(this.gameScreen, this.gameSize, this.gameSize.w / 2, this.gameSize.h - 10));
    // this.platforms.push(new Platform(this.gameScreen, this.gameSize, this.random(0, this.gameSize.w - 100), this.random(200, 300)));
    // this.platforms.push(new Platform(this.gameScreen, this.gameSize, this.random(0, this.gameSize.w - 100), this.random(300, 400)));
    // this.platforms.push(new Platform(this.gameScreen, this.gameSize, this.random(0, this.gameSize.w - 100), this.random(500, 600)));
    // this.platforms.push(new Platform(this.gameScreen, this.gameSize, this.random(0, this.gameSize.w - 100), this.random(600, 700)));


    this.player = new Player(this.gameScreen, this.gameSize);
  },

  gameLoop() {
    this.framesCounter > 5000 ? this.framesCounter = 0 : this.framesCounter++

    this.drawAll();
    this.isCollision();
    this.generatePlatforms()

    if (this.keys.LEFT.pressed) {
      console.log("entro");
      this.player.square.x -= 3
    }

    if (this.keys.RIGHT.pressed) {
      console.log("entro");
      this.player.square.x += 3
    }

    window.requestAnimationFrame(() => this.gameLoop());
  },

  drawAll() {
    this.player.move();
  },

  generatePlatforms() {
    if (this.framesCounter % this.platformDensity === 0) {
      this.platforms.push(new Platform(this.gameScreen, this.gameSize, this.gameSize.w / 2, this.gameSize.h - 10));
    }
  },

  isCollision() {
    let onPlatform = false;

    this.platforms.forEach((elm) => {
      if (
        this.player.square.x < elm.platformPos.left + elm.platformSize.w &&
        this.player.square.x + this.player.square.w > elm.platformPos.left &&
        this.player.square.y < elm.platformPos.top + elm.platformSize.h &&
        this.player.square.h + this.player.square.y > elm.platformPos.top
      ) {
        onPlatform = true;

        if (onPlatform) {
          this.player.square.base = elm.platformPos.top - this.player.square.h;
          this.player.moveUp()
        }
      } else if (!onPlatform) {
        this.player.square.base = this.gameSize.h;
      }
    });
  },

  random(min, max) {
    return Math.random() * (max - min) + min;
  },
};
