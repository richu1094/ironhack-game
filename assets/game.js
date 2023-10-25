const Game = {
  gameScreen: document.querySelector("#game-screen"),

  gameSize: {
    w: window.innerWidth / 3,
    h: window.innerHeight - 5,
  },

  framesCounter: 0,

  background: undefined,
  player: undefined,
  platforms: [],

  platformDensity: 50,

  keys: {
    LEFT: { code: "ArrowLeft", pressed: false },
    RIGHT: { code: "ArrowRight", pressed: false },
    UP: { code: "ArrowUp", pressed: false },
  },

  init() {
    this.setDimensions()
    this.start();
    this.setEventListeners();
  },

  setDimensions() {
    this.gameScreen.style.width = `${this.gameSize.w}px`
    this.gameScreen.style.height = `${this.gameSize.h}px`
  },

  setEventListeners() {
    document.addEventListener("keydown", (key) => {
      switch (key.code) {
        case this.keys.LEFT.code:
          this.keys.LEFT.pressed = true;
          // this.player.moveLeft();
          break;
        case this.keys.RIGHT.code:
          this.keys.RIGHT.pressed = true;
          // this.player.moveRight();
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
    this.background = new Background(this.gameScreen, this.gameSize);
    this.player = new Player(this.gameScreen, this.gameSize);

    // this.platforms.push(new Platform(this.gameScreen, this.gameSize, this.gameSize.w / 2, this.gameSize.h - 10));
    // this.platforms.push(new Platform(this.gameScreen, this.gameSize, this.random(0, this.gameSize.w - 100), this.random(200, 300)));
    // this.platforms.push(new Platform(this.gameScreen, this.gameSize, this.random(0, this.gameSize.w - 100), this.random(300, 400)));
    // this.platforms.push(new Platform(this.gameScreen, this.gameSize, this.random(0, this.gameSize.w - 100), this.random(500, 600)));
    // this.platforms.push(new Platform(this.gameScreen, this.gameSize, this.random(0, this.gameSize.w - 100), this.random(600, 700)));
  },

  gameLoop() {
    this.framesCounter > 5000 ? (this.framesCounter = 0) : this.framesCounter++;

    this.drawAll();
    const collision = this.isCollision();
    this.handleJump(collision);
    this.generatePlatforms();

    if (this.keys.LEFT.pressed) {
      console.log("entro");
      this.player.square.x -= 3;
    }

    if (this.keys.RIGHT.pressed) {
      console.log("entro");
      this.player.square.x += 3;
    }

    if (this.player.square.x + this.player.square.w < 0) {
      this.player.square.x = this.gameSize.w;
    } else if (this.player.square.x > this.gameSize.w) {
      this.player.square.x = -this.player.square.w;
    }

    window.requestAnimationFrame(() => this.gameLoop());
  },

  drawAll() {
    this.player.move(/*this.framesCounter*/);
    this.platforms.forEach((elm) => {
      elm.move();
    });
  },

  generatePlatforms() {
    if (this.framesCounter % this.platformDensity === 0) {
      this.platforms.push(
        new Platform(
          this.gameScreen,
          this.gameSize,
          this.gameSize.w / 2,
          this.gameSize.h - 10
        )
      );
    }
  },

  //lo hemos separado en dos funciones, primero una para ver si hay colisión...
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
      }
    });

    return onPlatform;
  },

  //...y luego otra para ver cómo actua el player cuando hay colisión
  handleJump(isCollision) {
    if (isCollision) {
      this.player.jump();
    } else {
      this.player.square.base = this.gameSize.h;
    }
  },
  random(min, max) {
    return Math.random() * (max - min) + min;
  },
};
