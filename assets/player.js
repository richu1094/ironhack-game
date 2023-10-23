class Player {
  constructor(gameScreen, gameSize) {
    this.gameScreen = gameScreen;
    this.gameSize = gameSize;

    this.squareSize = {
      w: 50,
      h: 50,
    };

    this.squarePos = {
      left: gameSize.w / 2 - this.squareSize.w / 2,
      top: gameSize.h / 2 - this.squareSize.h / 2,
    };

    this.squareVel = {
      left: 10,
      top: 10,
    };

    this.init();
  }

  init() {
    this.squareElement = document.createElement("div");

    this.squareElement.style.position = "absolute";
    this.squareElement.style.width = `${this.squareSize.w}px`;
    this.squareElement.style.height = `${this.squareSize.h}px`;
    this.squareElement.style.left = `${this.squarePos.left}px`;
    this.squareElement.style.top = `${this.squarePos.top}px`;
    this.squareElement.style.zIndex = 3;
    this.squareElement.style.backgroundColor = `black`;

    document.querySelector("#game-screen").appendChild(this.squareElement);
  }

  move() {
    this.updatePosition();
  }

  moveLeft() {
    this.squarePos.left -= this.squareVel.left;
  }

  moveRight() {
    this.squarePos.left += this.squareVel.left;
  }

  moveUp() {
    this.squarePos.top -= this.squareVel.top;
  }

  moveDown() {
    this.squarePos.top += this.squareVel.top;
  }

  updatePosition() {
    this.squareElement.style.left = `${this.squarePos.left}px`;
    this.squareElement.style.top = `${this.squarePos.top}px`;
  }
}
