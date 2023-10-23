class Player {
  constructor(gameScreen, gameSize) {
    this.gameScreen = gameScreen;
    this.gameSize = gameSize;

    this.squareSize = {
      w: 20,
      h: 20,
    };

    this.squarePos = {
      left: this.gameSize.w / 2 - this.squareSize.w / 2,
      top: this.gameSize.h / 2 - this.squareSize.h / 2,
      base: this.gameSize.h,
    };

    this.squareVel = {
      left: 10,
      top: 10,
      gravity: 0.3,
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
    if (this.squarePos.top < this.squarePos.base) {
      this.squarePos.top += this.squareVel.top;
      this.squareVel.top += this.squareVel.gravity;
    } else {
      this.squarePos.top = this.squarePos.base;
      this.squareVel.top = 1;
    }

    this.updatePosition();
  }

  moveLeft() {
    if (this.squarePos.left > 0) {
      this.squarePos.left -= this.squareVel.left;
    }
  }

  moveRight() {
    if (this.squarePos.left < this.gameSize.w - this.squareSize.w) {
      this.squarePos.left += this.squareVel.left;
    }
  }

  moveUp() {
    this.squarePos.top -= 150;
  }

  moveDown() {
    if (this.squarePos.top < this.gameSize.h) {
      this.squarePos.top += this.squareVel.top;
    }
  }

  updatePosition() {
    this.squareElement.style.left = `${this.squarePos.left}px`;
    this.squareElement.style.top = `${this.squarePos.top}px`;
  }
}
