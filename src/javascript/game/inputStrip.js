var document

class inputStrip {
    constructor(boundingBox, verticalOffset) {
        this.line = []
        this.boundingBox = document.getElementById(boundingBox)
        this.currentBox = 0

        // a submit button should also be added
        
        for (let box = 0; box < 5; box++) {
            this.newInputBox(box, verticalOffset)
        }
    }
    newInputBox(collumn, verticalOffset) {
        var input = document.createElement('input')
        this.boundingBox.appendChild(input)
        input.style.backgroundColor = "white"
        input.classList.add('letterInput')

        // var newHeight = parseInt(input.style.width.substr(0,2))*this.boundingBox.style.width/100
        // console.log(newHeight)
        // input.style.height = "" + newHeight + "px"
        input.style.left = "" + (100/6*(collumn+1)) - 7.5 + "%"
        input.style.top = "" + verticalOffset + "px"
        input.maxLength = 1
        input.addEventListener('keydown', (e) => {
            if (e.keyCode == 8 || e.keycode == 46) {
                if (input.value.length == 0) {
                    if (this.currentBox > 0) {
                        this.line[this.currentBox - 1].focus()
                        this.currentBox = this.currentBox - 1
                    }
                }else{
                    input.value = ""
                }
            }else if (input.value.length == 1) {
                if (this.currentBox < this.line.length) {
                    this.line[this.currentBox + 1].focus()
                    this.currentBox = this.currentBox + 1
                }
            }
        })
        input.addEventListener('click', () => {
            for (let boxI = 0; boxI < this.line.length; boxI++) {
                const box = this.line[boxI];
                if (box == document.activeElement){
                    this.currentBox = boxI
                }
            }
        })
        this.line.push(input)
    }
    static setWindow(documentVar){
        document = documentVar
    }
    disableInput(){
        for (let i = 0; i < this.line.length; i ++) {
            this.line[i].disabled = true;
        }
    }
    getStripInfo(){
        var code = ""
        for (let i = 0; i < this.line.length; i ++) {
            code += this.line[i].value
        }
        return code
    }
    setStripInfo(value) {
        for (let i = 0; i < this.line.length; i++) {
            var inputBox = this.line[i]
            if (value.substr(i,1) != " "){
                inputBox.value = value.substr(i,1)
            }
        }
    }
    setFocusAtStart(){
        this.line[0].focus()
    }
}

export default inputStrip