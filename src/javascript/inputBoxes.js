const allBoxes = []
var wordleBox = undefined
var document = undefined

class inputBox {
    constructor(inputGroup, inputPosition) {
        this.inputGroup = inputGroup
        this.inputPosition = inputPosition
        this.inputBox = document.createElement('input')
        wordleBox.appendChild(this.inputBox)
        this.inputBox.classList.add('letterInput')

        if (inputGroup > 0){
            this.inputBox.disabled = true
        }
        this.inputBox.style.left = "" + (10*inputPosition) + "%"
        this.inputBox.style.top = "" + (10*inputGroup) + "%"
        
        allBoxes.push(this)
    }
    static setWindow(documentVar){
        document = documentVar
        wordleBox = documentVar.getElementById("wordleBoxes")
    }
    static createBoxes(){
        for (let group = 0; group < 6; group++) {
            for (let collumn = 0; collumn < 5; collumn++){
                new inputBox(group, collumn)
            }
        }
    }
    static handleClick(){

    }
}

export default inputBox