const Game = {
  gameContainer: document.querySelector("#game-container"),
  gameScreen: document.querySelector("#game-screen"),

  gameSize: {
    w: window.innerWidth,
    h: window.innerHeight,
  },

  background: undefined,
  player: undefined,
  keyup: false,

  keys: {
    LEFT: "ArrowLeft",
    RIGHT: "ArrowRight",
    UP: "ArrowUp",
  },

  platforms: [],

  init() {
    this.start();
    this.setEventListeners();
  },

  setEventListeners() {
    document.addEventListener("keydown", (key) => {
      switch (key.code) {
        case this.keys.LEFT:
          this.keyup = true
          this.player.moveLeft();
          break;
        case this.keys.RIGHT:
          this.keyup = true
          this.player.moveRight();
          break;
        case this.keys.UP:
          this.keyup = true
          this.player.moveUp();
          break;

      }
    });
    document.addEventListener("keyup", (key) => {
      this.keyup = false;
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




    //hemos pusheado las cosas al array que creamos //
    this.platforms.push(new Platform(this.gameScreen, this.gameSize, this.random(0, this.gameSize.w - 100), this.random(100, 200)));
    this.platforms.push(new Platform(this.gameScreen, this.gameSize, this.random(0, this.gameSize.w - 100), this.random(200, 300)));
    this.platforms.push(new Platform(this.gameScreen, this.gameSize, this.random(0, this.gameSize.w - 100), this.random(300, 400)));
    this.platforms.push(new Platform(this.gameScreen, this.gameSize, this.random(0, this.gameSize.w - 100), this.random(500, 600)));
    this.platforms.push(new Platform(this.gameScreen, this.gameSize, this.random(0, this.gameSize.w - 100), this.random(600, 700)));




    this.player = new Player(this.gameScreen, this.gameSize);
  },

  gameLoop() {
    this.drawAll();
    this.isCollision();
    window.requestAnimationFrame(() => this.gameLoop());
  },

  drawAll() {
    this.player.move();
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

        console.log("---------", onPlatform)
        if (onPlatform) {
          this.player.square.base = elm.platformPos.top - this.player.square.h;
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
