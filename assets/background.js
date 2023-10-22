class Background {
    constructor(gameScreen, gameSize) {
        this.gameScreen = gameScreen
        this.gameSize = gameSize

        this.backgroundSize = { w: gameSize.w, h: gameSize.h }
        this.backgroundPosition = { left: 0, top: 0 }

        this.init()
    }

    init() {
        this.movingBackground = document.createElement('img')

        this.movingBackground.src = "./images/clouds.jpg"
        this.movingBackground.style.position = "absolute"

        this.movingBackground.style.width = `${this.backgroundSize.w}px`
        this.movingBackground.style.height = `${this.backgroundSize.h}px`
        this.movingBackground.style.left = `${this.backgroundPosition.left}px`
        this.movingBackground.style.top = `${this.backgroundPosition.top}px`


        this.gameScreen.appendChild(this.movingBackground)






    }


}