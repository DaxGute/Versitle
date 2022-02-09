var document

class inputStrip {
    constructor(boundingBox, verticalOffset) {
        this.line = []
        this.boundingBox = document.getElementById(boundingBox)
        this.currentBox = 0
        
        for (let box = 0; box < 5; box++) {
            this.newInputBox(box, verticalOffset)
        }
        // this.input.addEventListener('click', (e) => {
        //     if (this.input.value.length == 1) {
        //         var backColor = this.input.style.backgroundColor
        //         if (backColor == "white"){
        //             this.input.style.backgroundColor = "orange"
        //         }else if (backColor == "orange"){
        //             this.input.style.backgroundColor = "green"
        //         }else{
        //             this.input.style.backgroundColor = "white"
        //         }
        //     }
        // })
    }
    newInputBox(collumn, verticalOffset) {
        var input = document.createElement('input')
        this.boundingBox.appendChild(input)
        input.style.backgroundColor = "white"
        input.classList.add('letterInput')

        input.style.height = "" + input.clientWidth + "px"
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
}

export default inputStrip