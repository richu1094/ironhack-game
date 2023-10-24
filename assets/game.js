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
          this.keys.LEFT.pressed = true;
          break;
        case this.keys.RIGHT.code:
          this.keys.RIGHT.pressed = true;
          break;
      }
    });
    document.addEventListener("keyup", () => {
      this.keys.LEFT.pressed = false;
      this.keys.RIGHT.pressed = false;
    });
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

    this.platforms.push(
      new Platform(
        this.gameScreen,
        this.gameSize,
        this.gameSize.w / 2 - 50,
        this.gameSize.h - 10
      )
    );
    this.platforms.push(
      new Platform(
        this.gameScreen,
        this.gameSize,
        this.random(0, this.gameSize.w - 100),
        this.random(200, 300)
      )
    );
    this.platforms.push(
      new Platform(
        this.gameScreen,
        this.gameSize,
        this.random(0, this.gameSize.w - 100),
        this.random(300, 400)
      )
    );
    this.platforms.push(
      new Platform(
        this.gameScreen,
        this.gameSize,
        this.random(0, this.gameSize.w - 100),
        this.random(500, 600)
      )
    );
    this.platforms.push(
      new Platform(
        this.gameScreen,
        this.gameSize,
        this.random(0, this.gameSize.w - 100),
        this.random(600, 700)
      )
    );

    this.player = new Player(this.gameScreen, this.gameSize);
  },

  gameLoop() {
    // this.framesCounter > 5000 ? (this.framesCounter = 0) : this.framesCounter++;

    this.drawAll();
    this.isCollision();
    this.player.square.dy += this.player.square.gravity;
    // this.generatePlatforms();

    if (this.keys.LEFT.pressed) {
      this.player.square.x -= 3;
    }

    if (this.keys.RIGHT.pressed) {
      this.player.square.x += 3;
    }

    // REPASO MAÑANA MOVIEMIENTO LATERAL ---------------------------------------------------------------------------------------
    if (this.player.square.x + this.player.square.w < 0) {
      this.player.square.x = this.gameSize.w;
    } else if (this.player.square.x > this.gameSize.w) {
      this.player.square.x = -this.player.square.w;
    }

    window.requestAnimationFrame(() => this.gameLoop());
  },

  drawAll() {
    this.player.move();
    this.platforms.forEach((eachPlatform) => eachPlatform.move());
  },

  // generatePlatforms() {
  //   if (this.framesCounter % this.platformDensity === 0) {
  //     this.platforms.push(
  //       new Platform(
  //         this.gameScreen,
  //         this.gameSize,
  //         this.gameSize.w / 2,
  //         this.gameSize.h - 10
  //       )
  //     );
  //   }
  // },

  isCollision() {
    this.platforms.forEach((eachPlatform) => {
      if (
        this.player.square.x <
          eachPlatform.platform.x + eachPlatform.platform.w &&
        this.player.square.x + this.player.square.w > eachPlatform.platform.x &&
        this.player.square.y <
          eachPlatform.platform.y + eachPlatform.platform.h &&
        this.player.square.h + this.player.square.y > eachPlatform.platform.y
      ) {
        this.player.square.base =
          eachPlatform.platform.y - this.player.square.h;
        this.player.moveUp();
      } else {
        this.player.square.base = this.gameSize.h;
      }
    });
  },

  random(min, max) {
    return Math.random() * (max - min) + min;
  },
};
