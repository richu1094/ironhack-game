const Game = {
  gameScreen: document.querySelector("#game-screen"),

  gameScreen: {
    w: window.innerWidth,
    h: window.innerHeight,
  },
  background: undefined,
  player: undefined,

  init() {
    this.start();
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
    window.requestAnimationFrame(() => this.gameLoop());
  },
};
