const fs = require('fs')
const data = fs.readFileSync('./src/textFiles/five-letter-words.txt', 'utf8')
var allWords = data.split('\n')


function binarySearch(arr, l, r, x){
    if (r >= l) {
        let mid = l + Math.floor((r - l) / 2);
        console.log("mid: " + mid)
        console.log("l " +l)
        console.log("r " +r)
        // If the element is present at the middle
        // itself
        if (arr[mid] == x)
            return true;
        
        // If element is smaller than mid, then
        // it can only be present in left subarray
        if (arr[mid].localeCompare(x) > 0)
            return binarySearch(arr, l, mid - 1, x);
    
        // Else the element can only be present
        // in right subarray
        return binarySearch(arr, mid + 1, r, x);
    }
    
    // We reach here when element is not
    // present in array
    return false;
}

function isWordReal(word) {
    return binarySearch(allWords, 0, allWords.length - 1, word)
}


module.exports = isWordReal