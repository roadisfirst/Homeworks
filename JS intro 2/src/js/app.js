let eventName = prompt('Please enter name of event', 'meeting');
document.getElementById('container').style.display = 'block';

function validation(event){
    let name = document.getElementById('name');
    let time = document.getElementById('time');
    let place = document.getElementById('place');

    const timeRegExp = /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$/;

    let emptyTest = name.value.length === 0 || place.value.length === 0 || time.value.length === 0; 
    let rightTimeTest = timeRegExp.test(time.value);

    if (emptyTest) {
        alert('Input all data');
        return false;
    } else if (!rightTimeTest) {
        alert('Enter time in format hh:mm');
        return false;
    } else {
        if(!eventName){
            eventName = 'meeting';
        }
        console.log(`${name.value} has a ${eventName} at ${time.value} somewhere in ${place.value}`);
        event.preventDefault();
        return true;
    }
}

function convert(){
    const fixedDigits = 2;
    const eurRate = 32.92;
    const usdRate = 27.7;
    const hundred = 100;

    let eurAmount = prompt('Please enter amount of euros');
    let usdAmount = prompt('Please enter amount of dollars');

    let positiveNumberTest = !isNaN(eurAmount) && eurAmount > 0 && !isNaN(usdAmount) && usdAmount > 0;

    if (eurAmount && usdAmount && positiveNumberTest) {
        let eurConverted = (eurRate * round(eurAmount)).toFixed(fixedDigits);
        let usdConverted = (usdRate * round(usdAmount)).toFixed(fixedDigits); 
        alert(`
        ${round(eurAmount)} euros are equal ${eurConverted}hrns,
        ${round(usdAmount)} dollars are equal ${usdConverted}hrns`);
    } else {
        alert('Please enter positive numbers');
    }

    function round(num){
        return +(Math.round(num * hundred) / hundred);
    }
}

