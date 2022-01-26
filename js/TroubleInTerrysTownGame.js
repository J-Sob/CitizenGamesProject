/* Author: Derek O Reilly, Dundalk Institute of Technology, Ireland.                                                   */
/* The CanvasGame class is responsible for rendering all of the gameObjects and other game graphics on the canvas.         */
/* If you want to implement collision detection in your game, then you MUST overwrite the collisionDetection() method. */
/* This class will usually not change.                                                                                 */

const amount = 100
let height = -100
let score_ = 0
let generateRandomFall = (height) => {
    //  let fallingSpeed = (Math.random() * 1) + 0.2
    let fallingSpeed = 0.5

    let wasteType = Math.floor(Math.random() * typeFilter.length)  
    wasteType = typeFilter[wasteType]
    let wasteSprite = null
    let wasteImg = new Image()
    switch (wasteType) {
        case PLASTIC:       
            wasteSprite = Math.floor(Math.random() * plasticWaste.length)
            wasteImg.src = plasticWaste[wasteSprite]
            if(wasteImg.src == splittingWaste[0]){
                waste[numberOfWaste] = new Waste(wasteImg, Math.floor(Math.random() * ((canvas.width - 200) - 30)) + 45, height, fallingSpeed, numberOfWaste, wasteType, true, plasticWaste[wasteSprite]);
            }
            else
              waste[numberOfWaste] = new Waste(wasteImg, Math.floor(Math.random() * ((canvas.width - 200) - 30)) + 45, height, fallingSpeed, numberOfWaste, wasteType, false, plasticWaste[wasteSprite]);
            break;
        case PAPER:
            wasteSprite = Math.floor(Math.random() * paperWaste.length)
            wasteImg.src = paperWaste[wasteSprite]
            if(wasteImg.src == splittingWaste[4]){
                waste[numberOfWaste] = new Waste(wasteImg, Math.floor(Math.random() * ((canvas.width - 200) - 30)) + 45, height, fallingSpeed, numberOfWaste, wasteType, true, paperWaste[wasteSprite]);
            }
            else
                waste[numberOfWaste] = new Waste(wasteImg, Math.floor(Math.random() * ((canvas.width - 200) - 30)) + 45, height, fallingSpeed, numberOfWaste, wasteType, false, paperWaste[wasteSprite]);
            break;
        case METAL:
            wasteSprite = Math.floor(Math.random() * metalWaste.length)
            wasteImg.src = metalWaste[wasteSprite]
            waste[numberOfWaste] = new Waste(wasteImg, Math.floor(Math.random() * ((canvas.width - 200) - 30)) + 45, height, fallingSpeed, numberOfWaste, wasteType, false, metalWaste[wasteSprite]);
            break;
        case GLASS:
            wasteSprite = Math.floor(Math.random() * glassWaste.length)
            wasteImg.src = glassWaste[wasteSprite]

            if( glassWaste[wasteSprite] === splittingWaste[1]){
                waste[numberOfWaste] = new Waste(wasteImg, Math.floor(Math.random() * ((canvas.width - 200) - 30)) + 45, height, fallingSpeed, numberOfWaste, wasteType, true, glassWaste[wasteSprite]);
            }else
                waste[numberOfWaste] = new Waste(wasteImg, Math.floor(Math.random() * ((canvas.width - 200) - 30)) + 45, height, fallingSpeed, numberOfWaste, wasteType, false, glassWaste[wasteSprite]);
            break;
        case COMPOST:
            wasteSprite = Math.floor(Math.random() * compostWaste.length)
            wasteImg.src = compostWaste[wasteSprite]
            waste[numberOfWaste] = new Waste(wasteImg, Math.floor(Math.random() * ((canvas.width - 200) - 30)) + 45, height, fallingSpeed, numberOfWaste, wasteType, false, compostWaste[wasteSprite]);
            break;
        case TEXTILE:
            wasteSprite = Math.floor(Math.random() * textileWaste.length)
            wasteImg.src = textileWaste[wasteSprite]
            waste[numberOfWaste] = new Waste(wasteImg, Math.floor(Math.random() * ((canvas.width - 200) - 30)) + 45, height, fallingSpeed, numberOfWaste, wasteType, false, textileWaste[wasteSprite]);
            break;
        case TOXIC:
            wasteSprite = Math.floor(Math.random() * toxicWaste.length)
            wasteImg.src = toxicWaste[wasteSprite]
            if(toxicWaste[wasteSprite] === splittingWaste[2]){
                waste[numberOfWaste] = new Waste(wasteImg, Math.floor(Math.random() * ((canvas.width - 200) - 30)) + 45, height, fallingSpeed, numberOfWaste, wasteType, true, toxicWaste[wasteSprite]);
            }else if(toxicWaste[wasteSprite]== splittingWaste[0]){
                waste[numberOfWaste] = new Waste(wasteImg, Math.floor(Math.random() * ((canvas.width - 200) - 30)) + 45, height, fallingSpeed, numberOfWaste, wasteType, true, toxicWaste[wasteSprite]);
            }else
                waste[numberOfWaste] = new Waste(wasteImg, Math.floor(Math.random() * ((canvas.width - 200) - 30)) + 45, height, fallingSpeed, numberOfWaste, wasteType, false, toxicWaste[wasteSprite]);
            break;
        case ELECTRONICS:
            wasteSprite = Math.floor(Math.random() * electronicWaste.length)
            wasteImg.src = electronicWaste[wasteSprite]
            if(wasteImg.src == splittingWaste[3]){
                waste[numberOfWaste] = new Waste(wasteImg, Math.floor(Math.random() * ((canvas.width - 200) - 30)) + 45, height, fallingSpeed, numberOfWaste, wasteType, true, electronicWaste[wasteSprite]);
            }else
                waste[numberOfWaste] = new Waste(wasteImg, Math.floor(Math.random() * ((canvas.width - 200) - 30)) + 45, height, fallingSpeed, numberOfWaste, wasteType, false, electronicWaste[wasteSprite]);
            break;
    }

    // if (wasteType == PLASTIC) {
    //     let probability = Math.random()
    //     // if(probability < 0.3)
    //     waste[numberOfWaste] = new Waste(Math.floor(Math.random() * ((canvas.width - 200) - 30)) + 45, height, fallingSpeed, numberOfWaste, wasteType, true);
    //     // else
    //     // waste[numberOfWaste] = new Waste(Math.floor(Math.random()  * (canvas.width - 30)) + 15, height, fallingSpeed, numberOfWaste, wasteType, false);
    // }
    // else
    //     waste[numberOfWaste] = new Waste(Math.floor(Math.random() * ((canvas.width - 200) - 30)) + 45, height, fallingSpeed, numberOfWaste, wasteType, false);
    if (numberOfWaste === 0) {
        waste[numberOfWaste].setChosen(true)
        chosenIndex = numberOfWaste
    }
    waste[numberOfWaste].start()
    numberOfWaste++
}

class TroubleInTerrysTownGame extends CanvasGame {
    constructor() {
        for (let i = 0; i < amount; i++) {
            generateRandomFall(height)
            height = height - 200
        }
        super();
    }

    collisionDetection() {

        for (let i = 0; i < numberOfWaste; i++) {
            for (let j=0; j<typeFilter.length; j++){
                if(bins[j].pointIsInsideBin(waste[i].getX(), waste[i].getY()) && !waste[i].hit){
                    if (waste[i].type == typeFilter[j]){
                    score_ += 200
                    correctDisposalSound.play()
                    Terry.setImage(TerryImg)
                }else{
                    Terry.setImage(terry_wrong)
                }
                    waste[i].hit = true
                    stext = score_;
                    waste[i].setVisible(false)
                }
                else if (waste[i].isOnScreen() && !waste[i].isVisible()) { // waste is visible on screen
                    waste[i].setVisible(true)
                }
                else if (!waste[i].isOnScreen() && waste[i].isVisible()) { // waste out of screen
                    waste[i].setVisible(false)
                    waste[i].setChosen(false)
                    chosenIndex++
                    waste[chosenIndex].setChosen(true)
                }
            }

           /* if (bin1.pointIsInsideBin(waste[i].getX(), waste[i].getY()) && !waste[i].hit) {
                console.log("bin1 hit");
                if (waste[i].type == typeFilter[0])
                    score_ += 200
                waste[i].hit = true
                stext = score_;
                waste[i].setVisible(false)
            }
            else if (bin2.pointIsInsideBin(waste[i].getX(), waste[i].getY()) && !waste[i].hit) {
                console.log("bin2 hit");
                if (waste[i].type == typeFilter[1])
                    score_ += 200
                waste[i].hit = true
                stext = score_;
                waste[i].setVisible(false)
            }
            else if (bin3.pointIsInsideBin(waste[i].getX(), waste[i].getY()) && !waste[i].hit) {
                console.log("bin2 hit");
                if (waste[i].type == typeFilter[2])
                    score_ += 200
                waste[i].hit = true
                stext = score_;
                waste[i].setVisible(false)
            }*/
            
            this.sortObjects()
        }
    }


    sortObjects() {
        waste.sort((a, b) => {
            if (a.getY() < b.getY()) {
                return 1;
            } else if (a.getY() > b.getY()) {
                return -1;
            } else {
                return 0;
            }
        })
        waste.map((waste_, index) => {
            if (waste_.getIndex() === chosenIndex) {
                chosenIndex = index
            }
            waste_.setIndex(index)
        })
    }


    render() {
        super.render();
        background.render()
        timer.render()

        for (let i = 0; i < waste.length; i++) {
            if (waste[i].isVisible()) {
                waste[i].render();
            }
        
        }


        for(let i=0; i<bins.length; i++){
            bins[i].render()
        }
        
        Terry.render()
        game_border.render()
        scoreText.render()
        scoreLabel.render()
        terryLabel.render()
        timeLabel.render()
        level1_btn.render()
        level2_btn.render()
        level3_btn.render()


    }
    playGameLoop() {
        super.playGameLoop()
        if (timer.isFinished()) {
            this.stopGame()
            timeOverLabel.render()
        }
    }

    stopGame() {
        scoreText.stop()
        timer.stop()
        for (let i = 0; i < waste.length; i++) {
            waste[i].stop();
        }
    }
}