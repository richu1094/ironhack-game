class Player {
  constructor(gameScreen, gameSize) {
    this.gameScreen = gameScreen;
    this.gameSize = gameSize;

    this.square = {
      w: 20,
      h: 20,
      x: this.gameSize.w / 2 - 10,
      y: this.gameSize.h - 100,
      base: this.gameSize.h - 100,
      dx: 0,
      dy: 0,
      gravity: 0.2,
    };

    this.playerBackgroundPos = {
      x: 0,
      y: 0,
    };

    this.playerSprite = {
      backgroundPositionX: 0,
      totalFrames: 3,
      currentFrame: 1,
      frameSpeed: 4,
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
    // this.squareElement.style.backgroundColor = `black`;

    this.squareElement.style.backgroundImage = `url(./images/playerbg.png)`;
    this.squareElement.style.backgroundSize = `300px 100px`;

    this.squareElement.style.overflow = "hidden";
    this.squareElement.style.backgroundRepeat = "no-repeat";
    this.squareElement.style.backgroundPositionX = "0px";

    document.querySelector("#game-screen").appendChild(this.squareElement);
  }

  move(framesCounter) {
    if (this.square.y < this.square.base) {
      this.square.y += this.square.dy;
      this.square.dy += this.square.gravity;
    } else {
      this.square.y = this.square.base;
      this.square.dy = 1;
    }
    this.animateSprite(framesCounter);
    this.updatePosition();
  }

  animateSprite(framesCounter) {
    if (framesCounter % this.playerSprite.frameSpeed == 0) {
      this.playerSprite.currentFrame++;
    }
    if (this.playerSprite.currentFrame >= this.playerSprite.totalFrames) {
      this.playerSprite.currentFrame = 0;
    }

    this.playerSprite.backgroundPositionX =
      -this.square.w * this.playerSprite.currentFrame;

    this.updateSprite();
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

  jump() {
    if (this.square.y <= this.square.base) {
      this.square.y -= 20;
      this.square.dy = -5;
    }
  }

  moveDown() {
    if (this.square.y < this.gameSize.h) {
      this.square.y += this.square.dy;
    }
  }

  updateSprite() {
    this.squareElement.style.backgroundPositionX = `${this.playerSprite.backgroundPositionX}px`;
  }

  updatePosition() {
    this.squareElement.style.left = `${this.square.x}px`;
    this.squareElement.style.top = `${this.square.y}px`;
  }
}
