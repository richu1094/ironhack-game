class Platform {
  constructor(gameScreen, gameSize) {
    this.gameScreen = gameScreen;
    this.gameSize = gameSize;

    this.platformSize = {
      w: 125,
      h: 20,
    };

    this.platformPos = {
      left: this.random(0, this.gameSize.w - this.platformSize.w),
      top: 0,
    };

    this.platformVel = {
      top: 3,
    };

    this.init();
  }

  init() {
    this.gamePlatform = document.createElement("div");

    this.gamePlatform.style.position = "absolute";
    // this.gamePlatform.style.backgroundColor = `green`;
    this.gamePlatform.style.width = `${this.platformSize.w}px`;
    this.gamePlatform.style.height = `${this.platformSize.h}px`;
    this.gamePlatform.style.left = `${this.platformPos.left}px`;
    this.gamePlatform.style.top = `${this.platformPos.top}px`;

    this.gamePlatform.style.backgroundImage = `url(./images/cloud2.png)`;
    this.gamePlatform.style.backgroundSize = `125px 20px`;

    this.gamePlatform.style.overflow = "hidden";

    document.querySelector("#game-screen").appendChild(this.gamePlatform);
  }

  move() {
    this.platformPos.top += this.platformVel.top;
    this.updatePosition();
  }

  updatePosition() {
    this.gamePlatform.style.left = `${this.platformPos.left}px`;
    this.gamePlatform.style.top = `${this.platformPos.top}px`;
  }

  random(min, max) {
    return Math.random() * (max - min) + min;
  }
}
