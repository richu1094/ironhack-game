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

  // createPlatforms() {
  //   let gap;
  //   let platformCount = 6;
  //   gap = height / platformCount;
  //   for (let i = 1; i < 6; i++) {
  //     this.platforms.push(new Platform(random(width), height - i * gap));
  //   }
  // },

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
    this.platform = new Platform(this.gameScreen, this.gameSize);
    console.log(this.platform);
    this.player = new Player(this.gameScreen, this.gameSize);
  },

  gameLoop() {
    this.player.move();
    window.requestAnimationFrame(() => this.gameLoop());
  },
};
