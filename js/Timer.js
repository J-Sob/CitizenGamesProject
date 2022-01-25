/* Author: Derek O Reilly, Dundalk Institute of Technology, Ireland. */

class Timer extends GameObject
{
    /* Each gameObject MUST have a constructor() and a render() method.        */
    /* If the object animates, then it must also have an updateState() method. */

    constructor(x, y, timeleft, font, fontSize, colour)
    {
        super(1000); /* as this class extends from GameObject, you must always call super() */

        /* These variables depend on the object */
        this.timeleft = timeleft;
        this.x = x;
        this.y = y;
        this.font = font;
        this.fontSize = fontSize;
        this.colour = colour;
        this.finished = false;

        ctx.font = this.fontSize + "px " + this.font;
        this.width = ctx.measureText(this.text).width;
        if (this.x === STATIC_TEXT_CENTRE)
        {
            this.x = ((canvas.width - 200) - this.width) / 2;
        }
    }

    render()
    {
        ctx.fillStyle = this.colour;
        ctx.font = this.fontSize + "px " + this.font; // need to set the font each time, as it might have been changed by other gameObjects.
        ctx.fillText(this.timeleft, this.x, this.y);
    }

    updateState()
    {
        this.timeleft--
        if(this.timeleft === 0){
            this.stop()
            this.finished = true
        }
    }

    isFinished(){
        return this.finished
    }
}