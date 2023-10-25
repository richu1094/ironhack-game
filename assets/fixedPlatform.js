class fixedPlatform {
  constructor(gameScreen, gameSize) {
    this.gameScreen = gameScreen;
    this.gameSize = gameSize;

    this.platformSize = {
      w: this.gameSize.w,
      h: 10,
    };

    this.posX = this.gameSize.w / 2 - this.platformSize.w / 2;
    this.posY = this.gameSize.h;

    this.platformPos = {
      left: this.posX,
      top: this.posY,
    };

    this.init();
  }

  init() {
    this.gameFixedPlatform = document.createElement("div");

    this.gameFixedPlatform.style.position = "absolute";
    this.gameFixedPlatform.style.backgroundColor = `red`;
    this.gameFixedPlatform.style.width = `${this.platformSize.w}px`;
    this.gameFixedPlatform.style.height = `${this.platformSize.h}px`;
    this.gameFixedPlatform.style.left = `${this.platformPos.left}px`;
    this.gameFixedPlatform.style.top = `${this.platformPos.top}px`;
    
    document.querySelector("#game-screen").appendChild(this.gameFixedPlatform);
  }

  updatePosition() {
    this.gameFixedPlatform.style.left = `${this.platformPos.left}px`;
    this.gameFixedPlatform.style.top = `${this.platformPos.top}px`;
  }

  random(min, max) {
    return Math.random() * (max - min) + min;
  }
}
