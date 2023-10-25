class Platform {
  constructor(gameScreen, gameSize, platformPosleft, platformPostop) {
    this.gameScreen = gameScreen;
    this.gameSize = gameSize;

    this.platformSize = {
      w: 100,
      h: 10,
    };

    this.platformPos = {
      left: platformPosleft,
      top: 0,
    };

    //Hemos añadido esto (Antonio)
    this.platformVel = {
      top: 3
    }


    this.init();
  }

  init() {
    this.gamePlatform = document.createElement("div");

    this.gamePlatform.style.position = "absolute";
    this.gamePlatform.style.backgroundColor = `green`;
    this.gamePlatform.style.width = `${this.platformSize.w}px`;
    this.gamePlatform.style.height = `${this.platformSize.h}px`;
    this.gamePlatform.style.left = `${this.platformPos.left}px`;
    this.gamePlatform.style.top = `${this.platformPos.top}px`;
    this.gamePlatform.style.zIndex = 2;
    document.querySelector("#game-screen").appendChild(this.gamePlatform);
  }

  //Hemos añadido esto (Antonio)
  move() {
    this.platformPos.top += this.platformVel.top
    this.updatePosition();
  }

  updatePosition() {
    this.gamePlatform.style.left = `${this.platformPos.left}px`;
    this.gamePlatform.style.top = `${this.platformPos.top}px`;
  }
}
