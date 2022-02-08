const allBoxes = []
var wordleBox
var document
var currentBox

class inputBox {
    constructor(inputGroup, inputPosition) {
        this.inputGroup = inputGroup
        this.inputPosition = inputPosition
        this.inputBox = document.createElement('input')
        this.color = "white"
        wordleBox.appendChild(this.inputBox)
        this.inputBox.style.backgroundColor = "white"
        this.inputBox.classList.add('letterInput')

        this.inputBox.style.height = "" + this.inputBox.clientWidth + "px"
        this.inputBox.style.left = "" + (100/6*(inputPosition+1)) - 7.5 + "%"
        this.inputBox.style.top = "" + ((this.inputBox.clientWidth+20)*(inputGroup)) + "px"
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
    }

    static setWindow(documentVar){
        document = documentVar
        wordleBox = documentVar.getElementById("wordleBoxes")
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
    static addRow() {
        // automatically updates the row 
        for (let boxI = 0; boxI < allBoxes.length; boxI++) {
            const box = array[boxI];
            box.inputGroup = box.inputGroup + 1
            box.inputBox.disabled = true
        }

        // creates new boxes
        var newRow = []
        for (let collumn = 0; collumn < 5; collumn++){
            newRow.push(new inputBox(0, collumn))
        }
        
        // adds them to all boxes
        for (let boxI = allBoxes.length - 1; boxI > -1; boxI--) {
            const box = array[boxI];
            allBoxes.prepend(box)
        }
    }
}

export default inputBox