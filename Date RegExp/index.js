const getAge = (birthday) => {
    const today = new Date();
    let year = 0;
    if (today.getMonth() < birthday.getMonth()){
        year = 1;
    } else if (today.getMonth() === birthday.getMonth() && today.getDate() < birthday.getDate()){
        year = 1;
    }
    const age = today.getFullYear() - birthday.getFullYear() - year;
    return age;
}

const getWeekDay = (date) => {
    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const day = new Date(date);
    const weekDayNum = day.getDay();
    return weekDays[weekDayNum];
}

const getAmountDaysToNewYear = () => {
    const hours = 24;
    const minOrSec = 60;
    const milisec = 1000;
    const today = new Date(); 
    const newYear = new Date(today.getFullYear() + 1, 0, 1);
    const daysLeft = Math.floor((newYear - today) / (hours * minOrSec * minOrSec * milisec));
    return daysLeft;
}

const getProgrammersDay = (year) => {
    const programmersDay = 256;
    let holiday = new Date(year, 0, programmersDay);
    let [,month] = holiday.toString().split(' ');
    let str = `${holiday.getDate()} ${month}, ${year} (${getWeekDay(holiday)})`;
    return str;
}

const howFarIs = (specifiedWeekday) => {
    const today = new Date();
    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let todayNumber = today.getDay();
    let number = 0;
    let neededDay;
    for (let i = 0; i < weekDays.length; i++){
        if (weekDays[i].toLocaleLowerCase() === specifiedWeekday.toLocaleLowerCase()){
            number = (i + weekDays.length - todayNumber) % weekDays.length;
            neededDay = weekDays[i];
        }
    }
    if(neededDay === weekDays[todayNumber]){
        return `Hey, today is ${neededDay} =)`;
    } else {
        return `It's ${number} day(s) left till ${neededDay}`;
    }
}

const isValidIdentifier = (string) => {
    const regExp = /^[a-zA-z_$]+[\w$]*$/;
    return regExp.test(string);
}

const capitalize = (string) => {
    return string.replace(/\b([a-z]{1,})/g, (w) => w.charAt(0).toUpperCase() + w.slice(1));
}

const isValidAudioFile = (string) => {
    const regExp = /^[a-zA-Z]+\.(mp3$|flac$|alac$|aac$)/;
    return regExp.test(string);
}

const getHexadecimalColors = (string) => {
    let newString = string.split(/[^\w#]+/);
    const regExp = /^#(?:[0-9a-fA-F]{3}){1,2}$/g;
    let arr = [];
    newString.forEach( elem => {
        elem.match(regExp) && arr.push(elem);
    })
    return arr;
}

const isValidPassword = (string) => {
    const regExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d]{8,}$/;
    return regExp.test(string);
}

const addThousandsSeparators = (number) => {
    return number.toString().replace(/[0-9](?=(?:[0-9]{3})+(?![0-9]))/g, (thousand) => thousand + ',')
}

const getAllUrlsFromText = (text) => {
    try {
        if(!text){
            throw 'error';
        }
        const regExp = 
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g;
        return text.match(regExp) || [];
    } catch(e) {
        return e;
    }
}