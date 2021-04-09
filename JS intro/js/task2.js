let totalPrize = 0;
const attemptsNumber = 3;
const maxRange = 8;
const winMultiplier = 2;

let decisionStart = confirm('Do you want to play a game?');
gameStart(decisionStart);

function game(attempts = attemptsNumber, multiplier = 1, addRange = 0 ){
    let newRange = maxRange + addRange;
    const ballPlace = getRndInteger(newRange);
    const maxPossiblePrize = 100;
    let restart;
    let playMore;

    for (let i = 0; i < attemptsNumber; i++){
        let possiblePrize = multiplier * maxPossiblePrize / Math.pow(winMultiplier, i);
        let userGuess = inputMessage(possiblePrize, attempts, newRange);
        if(ballPlace === +userGuess){
            totalPrize += possiblePrize;
            playMore = confirm(`Congratulation, you won! Your prize is: ${totalPrize} $. Do you want to continue?`);
            break;  
        }
        attempts--;
    }
            
    if(playMore){
        let newMultiplier = multiplier * winMultiplier;
        let newAddRange = addRange + winMultiplier * winMultiplier;
        game(attemptsNumber, newMultiplier, newAddRange);
    } else {
        restart = gameContinue();
        gameStart(restart);
    }
    return;   
}

function getRndInteger(max) {
    return Math.floor(Math.random() * (max + 1));
}

function inputMessage(possiblePrize, attempts, newRange){
    const input = prompt(`Choose a roulette pocket number from 0 to ${newRange}
Attempts left: ${attempts}
Total prize: ${totalPrize}
Possible prize on current attempt ${possiblePrize}`);
    return input;
}

function gameContinue(){
    alert(`Thank you for your participation. Your prize is: ${totalPrize} $`);
    return confirm('Do you want to play again?');
}

function gameStart(decision){
    if(decision){
        totalPrize = 0;
        game();
    } else {
        return alert('You did not become a billionaire, but can.');
    }  
}