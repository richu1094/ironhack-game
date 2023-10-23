const Game = {
  gameContainer: document.querySelector("#game-container"),
  gameScreen: document.querySelector("#game-screen"),

  gameSize: {
    w: window.innerWidth / 3,
    h: window.innerHeight,
  },

  background: undefined,
  player: undefined,

  keys: {
    LEFT: "ArrowLeft",
    RIGHT: "ArrowRight",
    UP: "ArrowUp",
    DOWN: "ArrowDown",
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
          this.player.moveLeft();
          break;
        case this.keys.RIGHT:
          this.player.moveRight();
          break;
        case this.keys.UP:
          this.player.moveUp();
          break;
        case this.keys.DOWN:
          this.player.moveDown();
          break;
      }
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

    //hemos pusheado las cosas al array que creamos //
    this.platforms.push(new Platform(this.gameScreen, this.gameSize, 100, 200));
    this.platforms.push(new Platform(this.gameScreen, this.gameSize, 200, 400));
    this.platforms.push(new Platform(this.gameScreen, this.gameSize, 300, 600));
    this.platforms.push(new Platform(this.gameScreen, this.gameSize, 400, 400));
    this.platforms.push(new Platform(this.gameScreen, this.gameSize, 50, 300));

    this.player = new Player(this.gameScreen, this.gameSize);
  },

  gameLoop() {
    this.drawAll()
    this.isCollision();
    window.requestAnimationFrame(() => this.gameLoop());
  },

  drawAll() {
    this.player.move()
  },

  isCollision() {
    let onPlatform = false

    this.platforms.forEach((elm) => {
      if (
        this.player.squarePos.left + this.player.squareSize.w >= elm.platformPos.left &&
        this.player.squarePos.left <= elm.platformPos.left + elm.platformSize.w &&
        this.player.squarePos.top + this.player.squareSize.h < elm.platformPos.top + elm.platformSize.h
      ) {
        onPlatform = true
        // console.log(onPlatform)
        if (onPlatform) {

          this.player.squarePos.base = elm.platformPos.top - this.player.squareSize.h

        }

      }
      else if (!onPlatform) {
        this.player.squarePos.base = this.gameSize.h
      }
    })
  }


  //  // for (let i = 0; i < 5; i++) {
  //     if (
  //       this.squarePos.left < 100 + 100 &&
  //       this.squarePos.left + 10 > 100 &&
  //       this.squarePos.top < 200 + 7 &&
  //       this.squarePos.top + 10 > 200
  //     ) {
  //       console.log("Hay colision");
  //     }
  //   }
  // },
};
