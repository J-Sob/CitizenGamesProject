/* Author: Derek O Reilly, Dundalk Institute of Technology, Ireland. */

class Waste extends GameObject {
    /* Each gameObject MUST have a constructor() and a render() method.        */
    /* If the object animates, then it must also have an updateState() method. */

    constructor(wasteImg, centreX, y, speed, index, type, splittable, name) {
        super(5); /* as this class extends from GameObject, you must always call super() */

        /* These variables depend on the object */
        this.width = 50;
        this.height = 50;
        this.x = centreX;
        this.y = y;
        this.fallingSpeed = speed
        this.rotation = 2;
        this.chosen = false;
        this.index = index;
        this.type = type;
        this.hit = false
        this.splittable = splittable
        this.splitted = false
        this.visible = false
        this.wasteImg = wasteImg;
        this.name = name
    }

    updateState() {
        this.y+=this.fallingSpeed
    }

    render() {
        let sprite = new StaticImage(this.wasteImg, this.x, this.y, this.width, this.height)
        let redcircle = new StaticImage(redCircleImg, this.x, this.y, this.width, this.height)
        let yellowcircle = new StaticImage(yellowCircleImg, this.x, this.y, this.width, this.height)
        sprite.render()
        if(this.chosen){
            if(this.splittable){
                yellowcircle.render()
            }else {
                redcircle.render()
            }
        }
    }

    moveLeft() {
        if (this.x >= 45) {
            this.x -= 15
        }
    }

    moveRight() {
        if (this.x <= (canvas.width - 200)) {
            this.x += 15
        }
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    setX(_x) {
        this.x = _x;
    }

    setY(_y) {
        this.y = _y
    }

    getChosen() {
        return this.chosen;
    }

    setChosen(chosen) {
        this.chosen = chosen;
    }

    setIndex(index) {
        this.index = index;
    }

    getIndex(){
        return this.index
    }

    setSpeed(speed) {
        this.fallingSpeed = speed
    }

    setStep(step) {
        this.step = step
    }
    

    isSplittable(){
        return this.splittable
    }

    isSplitted(){
        return this.splitted
    }

    setSplitted(splitted){
        this.splitted = splitted
    }

    getFallingSpeed(){
        return this.fallingSpeed
    }

    getType(){
        return this.type
    }

    setFallingSpeed(speed){
        this.fallingSpeed = speed
    }

    isVisible(){
        return this.visible
    }

    setVisible(visible){
        this.visible = visible
    }

    isOnScreen() {
        if (this.y >= 0 && this.y <= canvas.height) {
            return true;
        } else {
            return false;
        }
    }
}