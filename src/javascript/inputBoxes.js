const allBoxes = []
var wordleBox
var document
var currentBox

class inputBox {
    constructor(inputGroup, inputPosition) {
        this.inputGroup = inputGroup
        this.inputPosition = inputPosition
        this.inputBox = document.createElement('input')
        wordleBox.appendChild(this.inputBox)
        this.inputBox.style.backgroundColor = "white"
        this.inputBox.classList.add('letterInput')

        if (inputGroup > 0){
            this.inputBox.disabled = true
            this.inputBox.style.backgroundColor = "grey"
        }
        this.inputBox.style.left = "" + (100/6*(inputPosition+1)) - 7.5 + "%"
        this.inputBox.style.top = "" + (100/6*(inputGroup)) + "%"
        this.inputBox.maxLength = 1
        this.inputBox.addEventListener('keydown', (e) => {
            if (e.keyCode == 8 || e.keycode == 46) {
                if (this.inputBox.value.length == 0) {
                    inputBox.getPrevious()
                }else{
                    this.inputBox.value = ""
                }
            }else if (this.inputBox.value.length == 1) {
                inputBox.getNext()
            }
        })

        this.inputBox.addEventListener('click', (e) => {
            if (this.inputBox.value.length == 1) {
                var backColor = this.inputBox.style.backgroundColor
                if (backColor == "white"){
                    this.inputBox.style.backgroundColor = "orange"
                }else if (backColor == "orange"){
                    this.inputBox.style.backgroundColor = "green"
                }else{
                    this.inputBox.style.backgroundColor = "white"
                }
            }
        })
        
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


    static getNext(){
        if (currentBox < 29) {
            allBoxes[currentBox + 1].inputBox.focus()
            currentBox = currentBox + 1
        }
    }
    static getPrevious(){
        if (currentBox > 0) {
            allBoxes[currentBox - 1].inputBox.focus()
            currentBox = currentBox - 1
        }
    }
    static setClick(){
        for (let boxI = 0; boxI < allBoxes.length; boxI++) {
            const box = allBoxes[boxI];
            if (box.inputBox == document.activeElement){
                currentBox = (box.inputGroup*5) + box.inputPosition
                return box
            }
        }
    }
}

export default inputBox