class Player {
  constructor(gameScreen, gameSize) {
    this.gameScreen = gameScreen;
    this.gameSize = gameSize;

    this.square = {
      w: 20,
      h: 20,
      x: this.gameSize.w / 2 - 10,
      y: this.gameSize.h / 2 - 10,
      base: this.gameSize.h - 10,
      dx: 0,
      dy: 0,
      gravity: 0.2,
    };

    this.init();
  }

  init() {
    this.squareElement = document.createElement("div");

    this.squareElement.style.position = "absolute";
    this.squareElement.style.width = `${this.square.w}px`;
    this.squareElement.style.height = `${this.square.h}px`;
    this.squareElement.style.left = `${this.square.x}px`;
    this.squareElement.style.top = `${this.square.y}px`;
    this.squareElement.style.zIndex = 3;
    this.squareElement.style.backgroundColor = `black`;

    document.querySelector("#game-screen").appendChild(this.squareElement);
  }

  move() {
    if (this.square.y < this.square.base) {
      this.square.y += this.square.dy;
    } else {
      this.square.y = this.square.base;
      this.square.dy = 0;
    }

    this.updatePosition();
  }

  moveLeft() {
    if (this.square.x > 0) {
      this.square.x -= this.square.dx;
    }
  }

  moveRight() {
    if (this.square.x < this.gameSize.w - this.square.w) {
      this.square.x += this.square.dx;
    }
  }

  moveUp() {
    if (this.square.y >= this.square.base) {
      this.square.y -= 100;
      this.square.dy -= 10;
    }
  }

  moveDown() {
    if (this.square.y < this.gameSize.h) {
      this.square.y += this.square.dy;
    }
  }

  updatePosition() {
    this.squareElement.style.left = `${this.square.x}px`;
    this.squareElement.style.top = `${this.square.y}px`;
  }
}
