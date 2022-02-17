const lineReader = require('line-reader');
var allWords = []
lineReader.eachLine('../../../five-letter-words.txt',(line,last)=>{
    allWords.push(line)
})

function binarySearch(arr, l, r, x){
    if (r >= l) {
        let mid = l + Math.floor((r - l) / 2);
    
        // If the element is present at the middle
        // itself
        if (arr[mid] == x)
            return true;
    
        // If element is smaller than mid, then
        // it can only be present in left subarray
        if (arr[mid] > x)
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