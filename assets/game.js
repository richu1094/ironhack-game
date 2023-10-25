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
  fixedPlatform: [],
  initialCounter: 0,

  platformDensity: 35,

  keys: {
    LEFT: { code: "ArrowLeft", pressed: false },
    RIGHT: { code: "ArrowRight", pressed: false },
    UP: { code: "ArrowUp", pressed: false },
  },

  init() {
    this.setDimensions();
    this.start();
    this.setEventListeners();
  },

  setDimensions() {
    this.gameScreen.style.width = `${this.gameSize.w}px`;
    this.gameScreen.style.height = `${this.gameSize.h}px`;
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
    this.fixedPlatform.push(new fixedPlatform(this.gameScreen, this.gameSize));
  },

  gameLoop() {
    this.framesCounter > 5000 ? (this.framesCounter = 0) : this.framesCounter++;

    this.drawAll();

    const collision = this.isCollision();
    const initialCollision = this.isInitialCollision();

    this.handleJump(collision);
    this.handleInitialJump(initialCollision);
    this.generatePlatforms();

    if (this.keys.LEFT.pressed) {
      this.player.square.x -= 3;
    }

    if (this.keys.RIGHT.pressed) {
      this.player.square.x += 3;
    }

    if (this.player.square.x + this.player.square.w < 0) {
      this.player.square.x = this.gameSize.w;
    } else if (this.player.square.x > this.gameSize.w) {
      this.player.square.x = -this.player.square.w;
    }
    this.handleInitialPlatform();
    this.clearAll();
    window.requestAnimationFrame(() => this.gameLoop());
  },

  drawAll() {
    this.player.move();
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

  clearAll() {
    this.platforms.forEach((eachPlatform, index) => {
      if (eachPlatform.platformPos.top > this.gameSize.h) {
        eachPlatform.gamePlatform.remove();
        this.platforms.splice(index, 1);
      }
    });
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
      }
    });

    return onPlatform;
  },

  isInitialCollision() {
    let onInitialPlatform = false;

    this.fixedPlatform.forEach((elm) => {
      if (
        this.player.square.x < elm.platformPos.left + elm.platformSize.w &&
        this.player.square.x + this.player.square.w > elm.platformPos.left &&
        this.player.square.y < elm.platformPos.top + elm.platformSize.h &&
        this.player.square.h + this.player.square.y > elm.platformPos.top
      ) {
        onInitialPlatform = true;
        this.initialCounter++;
        console.log("---------", this.initialCounter++);
      }
    });

    return onInitialPlatform;
  },

  handleJump(isCollision) {
    if (isCollision) {
      this.player.jump();
    } else {
      this.player.square.base = this.gameSize.h;
    }
  },
  handleInitialJump(isInitialCollision) {
    if (isInitialCollision) {
      this.player.jump();
    } else {
      this.player.square.base = this.gameSize.h;
    }
  },

  handleInitialPlatform() {
    this.fixedPlatform.forEach((eachPlatform) => {
      if (this.initialCounter >= 9) {
        eachPlatform.gameFixedPlatform.remove();
        this.fixedPlatform.splice(0);
      }
    });
  },
};
