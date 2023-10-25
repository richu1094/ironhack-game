class Background {
  constructor(gameScreen, gameSize, gameOver) {
    this.gameScreen = gameScreen;
    this.gameSize = gameSize;
    this.gameOver = gameOver;
    this.backgroundSize = { w: gameSize.w, h: gameSize.h };
    this.backgroundPosition = { left: 0, top: 0 };

    this.init();
  }

  init() {
    this.gameBackground = document.createElement("img");

    this.gameBackground.style.position = "absolute";
    this.gameBackground.src = "./images/clouds.jpg";
    this.gameBackground.style.width = `${this.backgroundSize.w}px`;
    this.gameBackground.style.height = `${this.backgroundSize.h}px`;
    this.gameBackground.style.left = `${this.backgroundPosition.left}px`;
    this.gameBackground.style.top = `${this.backgroundPosition.top}px`;

    this.gameScreen.appendChild(this.gameBackground);
  }
}
