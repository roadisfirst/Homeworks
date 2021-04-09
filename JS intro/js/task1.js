const amountInitial = prompt('Initial amount');
const yearsNumber = prompt('Number of years');
const percentage = prompt('Persentage of year');
const minimumAmount = 1000;
const fixedDigits = 2;
const maxPercentage = 100;

if (isNaN(amountInitial) || isNaN(yearsNumber) || isNaN(percentage)) {
    alert('Invalid input data');
} else if (amountInitial < minimumAmount || yearsNumber < 1 || 0 > percentage || percentage > maxPercentage) {
    alert('Invalid input data');
} else if (!Number.isInteger(+yearsNumber)) {
    alert('Invalid input data');
} else {
    depositProfitInfo(amountInitial, yearsNumber, percentage);
}

function depositProfitInfo(amountStart, years, percent){
    let profit = 0;
    let profitTotal = 0;
    let amountTotal = parseFloat(amountStart);

    for (let i = 0; i < +years; i++) {
        profit = +amountTotal * parseFloat(+percent) / maxPercentage;
        profit = +profit.toFixed(fixedDigits);
        profitTotal = profitTotal + profit;
        profitTotal = +profitTotal.toFixed(fixedDigits);
        amountTotal += profit;
        amountTotal = +amountTotal.toFixed(fixedDigits);  
    }
    
    alert(`
    Initial amount: ${amountInitial}
    Number of years: ${yearsNumber}
    Percentage of year: ${percentage}
    
    Total profit: ${profitTotal}
    Total amount: ${amountTotal}`);

    return true;
}