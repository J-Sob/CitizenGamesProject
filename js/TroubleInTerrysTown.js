/* Author: Derek O Reilly, Dundalk Institute of Technology, Ireland.             */
/* There should always be a javaScript file with the same name as the html file. */
/* This file always holds the playGame function().                               */
/* It also holds game specific code, which will be different for each game       */





/******************** Declare game specific global data and functions *****************/
/* images must be declared as global, so that they will load before the game starts  */
let backgroundImage = new Image();
backgroundImage.src = "images/Background/background_35.png";
let borderImage = new Image();
borderImage.src = "images/Background/game_border.png";

let compostBin = new Image();
compostBin.src = "images/bins/compost_v2.png"
let electronicsBin = new Image();
electronicsBin.src = "images/bins/electronics_v2.png"
let glassBin = new Image();
glassBin.src = "images/bins/glass_v2.png"
let metalBin = new Image();
metalBin.src = "images/bins/metal_v2.png"
let paperBin = new Image();
paperBin.src = "images/bins/paper_v2.png"
let plasticBin = new Image();
plasticBin.src = "images/bins/plastic_v2.png"
let textileBin = new Image();
textileBin.src = "images/bins/textiles_v2.png"
let toxicBin = new Image();
toxicBin.src = "images/bins/toxic_v2.png"

let TerryImg = new Image();
TerryImg.src = "images/Terry/terry_guide.gif"

let terry_wrong = new Image()
terry_wrong.src = "images/Terry/terry_wrong.gif"

let redCircleImg = new Image()
redCircleImg.src = "images/Sprites/redcircle.png"
let yellowCircleImg = new Image()
yellowCircleImg.src = "images/Sprites/yellowcircle.png"

let LEVEL = 0;

const PAPER = 1;
const PLASTIC = 2;
const COMPOST = 3;
const GLASS = 4;
const TEXTILE = 5;
const METAL = 6;
const TOXIC = 7;
const ELECTRONICS = 8

const glassWaste = ["images/Sprites/splitable_1.png"]
const plasticWaste = ["images/Sprites/plasticbag.png", "images/Sprites/3_plastic_split.png",
    "images/Sprites/bottle_cap.png", "images/Sprites/Lid.png"]

const compostWaste = ["images/Sprites/compost_0.png", "images/Sprites/compost_1.png",
    "images/Sprites/compost_2.png", "images/Sprites/watermelon.png",
    "images/Sprites/compost_3.png", "images/Sprites/compost_4.png"]

const textileWaste = ["images/Sprites/textile_0.png", "images/Sprites/textile_1.png",
    "images/Sprites/socks.png", "images/Sprites/teddybear.png",
    "images/Sprites/tshirt-1.png"]

const metalWaste = ["images/Sprites/tin.png", "images/Sprites/3_metal_split.png",
    "images/Sprites/spoke.png"]

const toxicWaste = ["images/Sprites/splitable_2.png", "images/Sprites/paint.png",
    "images/Sprites/Oil_Spill.png", "images/Sprites/PerfumeLiquid.png",
    "images/Sprites/toxic_waste.png"]

const electronicWaste = ["images/Sprites/splitable_3.png", "images/Sprites/Phone.png"]

const paperWaste = ["images/Sprites/4_paper_split.png"]

const splittingWaste = ["images/Sprites/splitable_0.png", "images/Sprites/splitable_1.png",
    "images/Sprites/splitable_2.png", "images/Sprites/splitable_3.png",
    "images/Sprites/splitable_4.png"]

const split0 = ["images/Sprites/PerfumeLiquid.png", "images/Sprites/splitable_0.png"]
const split1 = ["images/Sprites/Lid.png", "images/Sprites/splitable_1.png"]
const split2 = ["images/Sprites/splitable_2.png", "images/Sprites/toxic_waste.png"]
const split3 = ["images/Sprites/3_plastic_split.png", "images/Sprites/3_metal_split.png"]
const split4 = ["images/Sprites/4_paper_split.png", "images/Sprites/bottle_cap.png"]


//let typeFilter = [TOXIC, METAL, TEXTILE]
//let typeFilter = [COMPOST, GLASS, PLASTIC]
let typeFilter = [PLASTIC, GLASS, METAL, ELECTRONICS]


const calcY = (x) => {
    return Math.log(x)
}

/* Instead of using gameObject[], we can declare our own gameObject variables */
let bin1 = null;
let bin2 = null;
let bin3 = null;
let target = null;
let timer = null;
let timeLabel = null;
let stext = null
let scoreText = null
let scoreLabel = null
let score = null
let background = null
let game_border = null
let Terry = null
let terryLabel = null

let timeOverLabel = null

let backgroundSound = null
let correctDisposalSound = null
let selectWasteSound = null
let splitWasteSound = null

let waste = [];
let visibleWaste = [];
let bins = []
let numberOfWaste = 0;
let chosenIndex = 0;

let level1_btn = null;
let level2_btn = null;
let level3_btn = null;


function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("allow", "autoplay")
    this.sound.setAttribute("controls", "none");
    this.sound.setAttribute("muted", "true")
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function () {
        this.sound.play();
    }
    this.stop = function () {
        this.sound.pause();
    }
}
/******************* END OF Declare game specific data and functions *****************/







/* Always have a playGame() function                                     */
/* However, the content of this function will be different for each game */
function playGame() {
    /* We need to initialise the game objects outside of the Game class */
    /* This function does this initialisation.                          */
    /* Specifically, this function will:                                */
    /* 1. initialise the canvas and associated variables                */
    /* 2. create the various game gameObjects,                   */
    /* 3. store the gameObjects in an array                      */
    /* 4. create a new Game to display the gameObjects           */
    /* 5. start the Game                                                */



    /* Create the various gameObjects for this game. */
    /* This is game specific code. It will be different for each game, as each game will have it own gameObjects */

    // gameObjects[BACKGROUND] = new StaticImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    background = new StaticImage(backgroundImage, 30, 0, canvas.width - 180, canvas.height)
    game_border = new StaticImage(borderImage, 0, 0, canvas.width, canvas.height)
    Terry = new StaticImage(TerryImg, 540, 515, 140, 140)



    for (let i = 0; i < typeFilter.length; i++) {
        let binWidth = (canvas.width - 2250 / typeFilter.length) * i + 50
        console.log(binWidth)
        switch (typeFilter[i]) {
            case PLASTIC:
                bins[i] = new Bin(plasticBin, binWidth, canvas.height - 140, 90, 110, PLASTIC);
                break;
            case PAPER:
                bins[i] = new Bin(paperBin, binWidth, canvas.height - 140, 90, 110, PAPER);
                break;
            case METAL:
                bins[i] = new Bin(metalBin, binWidth, canvas.height - 140, 90, 110, METAL);
                break;
            case GLASS:
                bins[i] = new Bin(glassBin, binWidth, canvas.height - 140, 90, 110, GLASS);
                break;
            case COMPOST:
                bins[i] = new Bin(compostBin, binWidth, canvas.height - 140, 90, 110, COMPOST);
                break;
            case TEXTILE:
                bins[i] = new Bin(textileBin, binWidth, canvas.height - 140, 90, 110, TEXTILE);
                break;
            case TOXIC:
                bins[i] = new Bin(toxicBin, binWidth, canvas.height - 140, 90, 110, TOXIC);
                break;
            case ELECTRONICS:
                bins[i] = new Bin(electronicsBin, binWidth, canvas.height - 140, 90, 110, ELECTRONICS);
                break;
        }
    }


    //  bin1 = new Bin(compostBin, 50, canvas.height - 140, 90, 110, COMPOST);
    //  bin2 = new Bin(glassBin, (canvas.width - 200) / 2 + 10, canvas.height - 140, 90, 110, GLASS);
    //   bin3 = new Bin(plasticBin, (canvas.width - 200) - 40, canvas.height - 140, 90, 110, PLASTIC);
    score = new Score(0)
    stext = score.getValue()
    scoreText = new ScoreText(stext, 590, 110, "arial", 25, "black")
    timer = new Timer(590, 310, 30, "arial", 25, "black")

    scoreLabel = new StaticText("Your score", 555, 210, "arial", 22, "black")
    timeLabel = new StaticText("Time left", 560, 420, "arial", 22, "black")
    terryLabel = new StaticText("Terry", 560, 650, "arial", 22, "black")

    timeOverLabel = new StaticText("Time's over!", ((canvas.width - 200) / 2) - 50, canvas.height / 2, "arial", 40, "black")


    level1_btn = new Button(0, 670, TEXT_WIDTH, 30, "Level One");
    level2_btn = new Button(120, 670, TEXT_WIDTH, 30, "Level Two");
    level3_btn = new Button(243, 670, TEXT_WIDTH, 30, "Level Three");



    /* END OF game specific code. */

    /* Always create a game that uses the gameObject array */
    let game = new TroubleInTerrysTownGame();

    backgroundSound = new sound("/audio/background_edit_v2.mp3")
    correctDisposalSound = new sound("/audio/correct_disposal_v1.mp3")
    selectWasteSound = new sound("/audio/select_waste_v1.mp3")
    splitWasteSound = new sound("/audio/split_waste_v1.mp3")

    backgroundSound.play()
    /* Always play the game */
    game.start();
    timer.start();
    level1_btn.start();
    level2_btn.start();
    level3_btn.start();


    /* If they are needed, then include any game-specific mouse and keyboard listners */
    document.addEventListener("keydown", function (e) {

        if (e.keyCode === 37)  // left
        {
            if (!timer.isFinished()) {
                waste[chosenIndex].moveLeft()
            }

        }
        else if (e.keyCode === 39) // right
        {
            if (!timer.isFinished()) {
                waste[chosenIndex].moveRight()
            }

        }
        // else if (e.keyCode === 38) // up
        // {  
        //     if(chosenIndex !== waste.length-1){
        //         waste[chosenIndex].setChosen(false);
        //         chosenIndex++;
        //         waste[chosenIndex].setChosen(true);
        //     }
        // }
        // else if (e.keyCode === 40) // down
        // {
        //     if(chosenIndex !== 0){
        //         waste[chosenIndex].setChosen(false);
        //         chosenIndex--;
        //         waste[chosenIndex].setChosen(true); 
        //     }
        // }
        else if (e.keyCode === 32) // space bar
        {
            if (!timer.isFinished()) {
                waste[chosenIndex].setSpeed(5);
                waste[chosenIndex].setChosen(false);
                waste[chosenIndex + 1].setChosen(true);
            }
        }

        else if (e.keyCode === 83) // s
        {
            let wasteSprite = null
            let wasteImg = new Image()

            /* if(waste[chosenIndex].isSplittable() && !waste[chosenIndex].isSplitted()){
                 console.log("splittable and not splitted")
                 let original = waste[chosenIndex]
                 let type = original.type
 
 
                 splitWasteSound.play()
                 waste[chosenIndex] = new Waste(original.getX()-15, calcY(original.getX())*6, original.getFallingSpeed(), original.getIndex(), original.getType(), false)
                 console.log(waste[chosenIndex])
                 
                 waste.push(new Waste(original.getX()+15, calcY(original.getX()), original.getFallingSpeed(), waste.length, original.getType(), false))
                 
                 waste[chosenIndex].setSplitted(true)
             
                 waste[original.getIndex()].start()
                 waste[waste.length-1].start()
 
                 console.log( waste[original.getIndex()])
                 waste[original.getIndex()].setChosen(true)
              */

            if (waste[chosenIndex].isSplittable() && !waste[chosenIndex].isSplitted()) {
                let original = waste[chosenIndex]
                let wasteName = original.name
                let wasteImg2 = new Image()
                let wasteImg3 = new Image()
                for (let i = 0; i < splittingWaste.length; i++) {
                    console.log(wasteName == splittingWaste[i])
                }

                switch (wasteName) {
                    case splittingWaste[0]:
                        wasteImg2.src = split0[0]
                        waste[chosenIndex] = new Waste(wasteImg2, 300, original.getY(), original.getFallingSpeed(), original.getIndex(), original.getType(), false)
                        wasteImg3.src = split0[1]
                        waste.push(new Waste(wasteImg3, 400, original.getX(), original.getFallingSpeed(), waste.length, original.getType(), false))
                        console.log(waste.length)
                        break
                    case splittingWaste[1]:
                        wasteImg2.src = split1[0]
                        console.log(wasteImg2)
                        waste[chosenIndex] = new Waste(wasteImg2, 300, original.getY(), original.getFallingSpeed(), original.getIndex(), original.getType(), false, splittingWaste[1])
                        wasteImg3.src = split1[1]
                        waste.push(new Waste(wasteImg3, 400, original.getY(), original.getFallingSpeed(), waste.length, original.getType(), false, splittingWaste[1]))
                        waste[original.getIndex()].start()
                        waste[waste.length - 1].start()
                        break
                    case splittingWaste[2]:
                        wasteImg2.src = split2[0]
                        waste[chosenIndex] = new Waste(wasteImg2, 300, original.getY(), original.getFallingSpeed(), original.getIndex(), original.getType(), false)
                        wasteImg3.src = split2[1]
                        waste.push(new Waste(wasteImg3, 400, original.getY(), original.getFallingSpeed(), waste.length, original.getType(), false))
                        break
                    case splittingWaste[3]:
                        wasteImg2.src = split3[0]
                        waste[chosenIndex] = new Waste(wasteImg2, 300, original.getY(), original.getFallingSpeed(), original.getIndex(), original.getType(), false)
                        wasteImg3.src = split3[1]
                        waste.push(new Waste(wasteImg3, 400, original.getY(), original.getFallingSpeed(), waste.length, original.getType(), false))
                        break
                    case splittingWaste[4]:
                        wasteImg2.src = split4[0]
                        waste[chosenIndex] = new Waste(wasteImg2, 300, original.getY(), original.getFallingSpeed(), original.getIndex(), original.getType(), false)
                        wasteImg3.src = split4[1]
                        waste.push(new Waste(wasteImg3, 400, original.getY(), original.getFallingSpeed(), waste.length, original.getType(), false))
                        break

                }
                waste[chosenIndex].setChosen(true)
            }
        }
    });
    document.getElementById("gameCanvas").addEventListener("mousedown", function (e) {
        if (e.which === 1)  // left mouse button
        {
            let canvasBoundingRectangle = document.getElementById("gameCanvas").getBoundingClientRect();
            let mouseX = e.clientX - canvasBoundingRectangle.left;
            let mouseY = e.clientY - canvasBoundingRectangle.top;

            if (level1_btn.pointIsInsideBoundingRectangle(mouseX, mouseY)) {
                LEVEL = 0
                typeFilter = [COMPOST, GLASS, PLASTIC]
                console.log(typeFilter)
                location.reload()
            }
            else if (level2_btn.pointIsInsideBoundingRectangle(mouseX, mouseY)) {
                LEVEL = 1
                typeFilter = [TOXIC, TEXTILE, METAL]
                console.log(typeFilter)
                location.reload()
            }
            else if (level3_btn.pointIsInsideBoundingRectangle(mouseX, mouseY)) {
                LEVEL = 2
                location.reload()
            }

        }
    });
    document.getElementById("gameCanvas").addEventListener("mousemove", function (e) {
        if (e.which === 0) // no button selected
        {
            let canvasBoundingRectangle = document.getElementById("gameCanvas").getBoundingClientRect();
            let mouseX = e.clientX - canvasBoundingRectangle.left;
            let mouseY = e.clientY - canvasBoundingRectangle.top;

            level1_btn.pointIsInsideBoundingRectangle(mouseX, mouseY);
            level2_btn.pointIsInsideBoundingRectangle(mouseX, mouseY);
            level3_btn.pointIsInsideBoundingRectangle(mouseX, mouseY);
        }
    });
}