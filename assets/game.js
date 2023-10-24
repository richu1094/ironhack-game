const Game = {
  gameContainer: document.querySelector("#game-container"),
  gameScreen: document.querySelector("#game-screen"),

  gameSize: {
    w: window.innerWidth / 3,
    h: window.innerHeight - 5,
  },

  background: undefined,
  player: undefined,


  keys: {
    LEFT: { code: "ArrowLeft", pressed: false },
    RIGHT: { code: "ArrowRight", pressed: false },
    UP: { code: "ArrowUp", pressed: false },
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
          this.keys.LEFT.pressed = true
          // this.player.moveLeft();
          break;
        case this.keys.RIGHT:
          this.keys.RIGHT.pressed = true
          // this.player.moveRight();
          break;
      }
    });
    document.addEventListener("keyup", () => {
      this.keys.LEFT.pressed = false
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


    this.platforms.push(new Platform(this.gameScreen, this.gameSize, this.gameSize.w / 2, this.gameSize.h - 10));
    this.platforms.push(new Platform(this.gameScreen, this.gameSize, this.random(0, this.gameSize.w - 100), this.random(200, 300)));
    this.platforms.push(new Platform(this.gameScreen, this.gameSize, this.random(0, this.gameSize.w - 100), this.random(300, 400)));
    this.platforms.push(new Platform(this.gameScreen, this.gameSize, this.random(0, this.gameSize.w - 100), this.random(500, 600)));
    this.platforms.push(new Platform(this.gameScreen, this.gameSize, this.random(0, this.gameSize.w - 100), this.random(600, 700)));


    this.player = new Player(this.gameScreen, this.gameSize);
  },

  gameLoop() {
    this.drawAll();
    this.isCollision();

    if (this.keys.LEFT.pressed) {
      this.square.x += 3
    }

    if (this.keys.RIGHT.pressed) {
      this.square.x -= 3
    }

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
