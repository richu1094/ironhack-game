class Platform {
  constructor(gameScreen, gameSize) {
    this.gameScreen = gameScreen;
    this.gameSize = gameSize;

    this.platformSize = {
      w: 100,
      h: 7,
    };

    this.minSpace = 100;
    this.maxSpace = 200;

    this.init();
  }

  random(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  init() {
    this.gamePlatform = document.createElement("div");

    this.gamePlatform.style.position = "absolute";
    this.gamePlatform.style.backgroundColor = `black`;
    this.gamePlatform.style.width = `${this.platformSize.w}px`;
    this.gamePlatform.style.height = `${this.platformSize.h}px`;
    this.gamePlatform.style.left = `${this.random(
      this.minSpace,
      this.maxSpace
    )}px`;
    this.gamePlatform.style.top = `${this.random(
      this.minSpace,
      this.maxSpace
    )}px`;
    this.gamePlatform.style.zIndex = 2;
    document.querySelector("#game-screen").appendChild(this.gamePlatform);
  }
}
