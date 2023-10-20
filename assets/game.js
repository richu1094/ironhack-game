const Game = {
  gameScreen: document.querySelector("#game-screen"),

  gameScreen: {
    w: window.innerWidth,
    h: window.innerHeight,
  },
  background: undefined,
  player: undefined,

  keys: { JUMP: 'ArrowUp', LEFT: "ArrowLeft", RIGHT: "ArrowRight" },

  init() {
    this.start();
  },

  setEventListeners() {
    "keydown", key => {
      switch (key.code) {
        case this.keys.JUMP:
          this.player.JUMP
          break;
        case this.keys.LEFT:
          this.player.LEFT
          break;
        case this.keys.RIGHT:
          this.player.RIGHT
          break
      }
    }


  }


  start() {
    this.createElements();
    this.gameLoop();
    document.body.style.backgroundColor = "red";
  },

  createElements() {
    this.player = new Player(this.gameScreen);
  },

  gameLoop() {
    window.requestAnimationFrame(() => this.gameLoop());
  },
};
