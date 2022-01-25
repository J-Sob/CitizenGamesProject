
class Score extends GameObject
{
    /* Each gameObject MUST have a constructor() and a render() method.        */
    /* If the object animates, then it must also have an updateState() method. */

    constructor(value)
    {
        super(5); /* as this class extends from GameObject, you must always call super() */
        this.value = value
    }
 

    render()
    {
        
    }

    updateState(){
        this.value += 2
    }

    setValue(value){
        this.value = value
    }

    getValue(){
        return this.value
    }
}