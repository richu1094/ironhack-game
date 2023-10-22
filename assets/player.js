class Player {
  constructor(gameScreen) {

    this.gameScreen = gameScreen;

    this.squareSize = {
      w: 100,
      h: 100,
    };

    this.squarePos = {
      left: gameScreen.w / 2 - this.squareSize.w / 2,
      top: gameScreen.h / 2 - this.squareSize.h / 2,

    };

    this.squareVel = {
      left: 10,
      top: 1,
    }


    this.init();
  }

  init() {
    this.squareElement = document.createElement("div");

    this.squareElement.style.position = "absolute";
    this.squareElement.style.width = `${this.squareSize.w}px`;
    this.squareElement.style.height = `${this.squareSize.h}px`;
    this.squareElement.style.left = `${this.squarePos.left}px`;
    this.squareElement.style.top = `${this.squarePos.top}px`;
    this.squareElement.style.backgroundColor = `black`;

    document.querySelector("#game-screen").appendChild(this.squareElement);
  }

  move() {
    this.updatePosition()
  }

  moveLeft() {
    this.squarePos.left -= this.squareVel.left
  }

  moveRight() {
    this.squarePos.left += this.squareVel.left
  }

  updatePosition() {
    this.squareElement.style.left = `${this.squarePos.left}px`
    this.squareElement.style.top = `${this.squarePos.top}px`
  }
}
