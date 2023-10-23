class Background {
    constructor(gameScreen, gameSize, gameContainer) {
        this.gameScreen = gameScreen
        this.gameSize = gameSize
        this.gameContainer = gameContainer

        this.backgroundSize = { w: gameSize.w, h: gameSize.h }
        this.backgroundPosition = { left: 0, top: 0 }

        this.init()
    }

    init() {
        this.gameBackground = document.createElement('img')
       
        this.gameBackground.style.position = "absolute"
        this.gameBackground.src = "./images/clouds.jpg"
        this.gameBackground.style.width = `${this.backgroundSize.w}px`
        this.gameBackground.style.height = `${this.backgroundSize.h}px`
        this.gameBackground.style.left = `${this.backgroundPosition.left}px`
        this.gameBackground.style.top = `${this.backgroundPosition.top}px`
        this.gameBackground.style.zIndex = 1
        this.gameBackground.style.border = `1px solid #000000`


        this.gameContainer.appendChild(this.gameBackground)
    }


}