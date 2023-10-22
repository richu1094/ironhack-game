
const Game = {
  gameScreen: document.querySelector("#game-screen"),

  gameScreen: {
    w: window.innerWidth,
    h: window.innerHeight,
  },
  background: undefined,
  player: undefined,

  keys: { LEFT: "ArrowLeft", RIGHT: "ArrowRight" },

  init() {
    this.start();
    this.setEventListeners()
  },

  setEventListeners() {
    document.addEventListener("keydown", key => {
      switch (key.code) {
        case this.keys.LEFT:
          this.player.moveLeft()
          break;
        case this.keys.RIGHT:
          this.player.moveRight()
          break;
      }
    })
  },

  start() {
    this.createElements();
    this.gameLoop();
    document.body.style.backgroundColor = "red";
  },

  createElements() {
    this.player = new Player(this.gameScreen);
  },

  gameLoop() {
    this.player.move()
    window.requestAnimationFrame(() => this.gameLoop());
  },
};

