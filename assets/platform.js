class Platform {
  constructor(gameScreen, gameSize, x, y) {
    this.gameScreen = gameScreen;
    this.gameSize = gameSize;

    this.platform = {
      w: 100,
      h: 10,
      x: x,
      y: y,
      dy: 0,
    };

    this.init();
  }

  init() {
    this.gamePlatform = document.createElement("div");

    this.gamePlatform.style.position = "absolute";
    this.gamePlatform.style.backgroundColor = `green`;
    this.gamePlatform.style.width = `${this.platform.w}px`;
    this.gamePlatform.style.height = `${this.platform.h}px`;
    this.gamePlatform.style.left = `${this.platform.x}px`;
    this.gamePlatform.style.top = `${this.platform.y}px`;
    this.gamePlatform.style.zIndex = 2;
    
    document.querySelector("#game-screen").appendChild(this.gamePlatform);
  }
  
  
  // REPASO MAÑANA MOVIEMIENTO DE LAS PLATAFORMAS ---------------------------------------------------------------------------------------
  move() {
    this.platform.y -= 1;
    this.updatePosition();
  }

  updatePosition() {
    this.gamePlatform.style.left = `${this.platform.x}px`;
    this.gamePlatform.style.top = `${this.platform.y}px`;
  }
}
