function reverseNumber(num) {
    let reversedNum = '';
    let negative = '';
    let transformedNum = num.toString();
    for (let i = transformedNum.length - 1; i >= 0; i--){
        if(transformedNum[i] !== '-'){
            reversedNum += transformedNum[i]
        } else {
            negative = '-';
        }    
    }
    reversedNum = negative + reversedNum;
    return +reversedNum;
}

function forEach(arr, func) {
    for (let item of arr){
        item = func(item);
    }
}

function map(arr, func) {
    let result = [];
    forEach(arr, (item) => result.push(func(item)));
    return result;
}

function filter(arr, func) {
    let result = [];
    forEach(arr, (item) => func(item) && result.push(item));
    return result;
}

function getAdultAppleLovers(data) {
    const adultAge = 18;
    let filtration = person => person.favoriteFruit === 'apple' && person.age > adultAge && person;
    return map(filter(data, filtration), person => person.name);
}

function getKeys(obj) {
    let arr = [];
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            arr.push(key);
        }
    }
    return arr;
}

function getValues(obj) {
    let arr = [];
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            arr.push(obj[key]);
        }
      }
    return arr;
}

function showFormattedDate(dateObj) {
    let str = dateObj.toString();
    let day, month, year;
    [,month, day, year] = str.split(' ');
    let result = 'It is '+ day + ' of ' + month + ', ' + year;
    return result;
}