const isEquals = (a, b) => a === b;

const isBigger = (a, b) => a > b;

const storeNames = (...str) => str;

const getDifference = (a, b) => a - b > 0 ? a - b : b - a;

const negativeCount = arr => {
    let count = 0;
    arr.forEach(element => { 
        element < 0 && count++ 
    });
    return count;
};

const letterCount = (string, letter) => {
    let count = 0;
    for (let i = 0; i < string.length; i++){
        if (string[i].toLowerCase() === letter.toLowerCase()){
            count++;
        }
    }
    return count;
};

const countPoints = (arr) => {
    let result = 0;
    const bestScore = 3;
    arr.forEach(element => {
        let [we, they] = element.split(':');
        if (parseInt(we) > parseInt(they)) {
            result += bestScore;
        } else if (parseInt(we) === parseInt(they)){
            result += 1;
        }
    });
    return result;
};