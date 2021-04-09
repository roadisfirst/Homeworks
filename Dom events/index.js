/* START TASK 1: Your code goes here */
let table = document.getElementById('table');
table.onclick = function(event) {
    let td = event.target.closest('td');
    if (!td) {
      return;
    }
    if (!table.contains(td)) {
      return;
    }
    highlight(td);
  };

  let selectedTd, selectedEmptyClass, selectedRow, selectedRowCells;

  function highlight(td) {
    if (td.id === 'specialCell') {
        selectedTd = td;
        table.classList.add('highlightGreen');
        selectedEmptyClass = table.querySelectorAll('td:not([class])');
        selectedEmptyClass.forEach(node => node.classList.add('highlightGreen'));
        selectedTd.classList.add('highlightYellow');
    } else if (td.id) {
        selectedRow = td.closest('tr');
        selectedRowCells = selectedRow.querySelectorAll('td:not([class="highlightYellow"])');
        selectedRowCells.forEach(node => node.classList.add('highlightBlue'));
    } else {
        selectedTd = td;
        selectedTd.classList.add('highlightYellow');
    }
  }
/* END TASK 1 */

/* START TASK 2: Your code goes here */
let input = document.getElementById('formInput');
let form = document.getElementById('telValidation');
let button = document.getElementById('buttonSubmit');

document.addEventListener('keyup', validate);

function validate(){
    let tel = document.getElementById('formInput').value;
    let message = document.getElementById('message');
    message.innerHTML = '';
    const regExp = /^[+380][0-9]{12}$/g;
    if (!regExp.test(tel)) {
        message.innerHTML = `Type number does not follow format<br>+380*********`;
        message.classList.add('error');
        input.classList.add('invalid');
        button.disabled = true;
    } else {
        message.classList.remove('error');
        input.classList.remove('invalid');
        button.disabled = false;
    }
}

form.addEventListener('submit', function () {
    let message = document.getElementById('message');
    message.innerHTML = 'Data was successfully sent';
    message.classList.add('success');
    // event.preventDefault();
}, false);
/* END TASK 2 */

/* START TASK 3: Your code goes here */
let ball = document.getElementById('ball');
let court = document.getElementById('court');
let zoneA = document.getElementById('scoreZoneA');
let zoneB = document.getElementById('scoreZoneB');
let scoreboardA = document.getElementById('scoreboardA');
let scoreboardB = document.getElementById('scoreboardB');
scoreboardA.textContent = '0';
scoreboardB.textContent = '0';
let team, color;
let scoreA = 0;
let scoreB = 0;

document.onclick = function(event) {
  const getHalf = 2;
  if(event.target.id === 'court'){
    let courtCoords = event.target.getBoundingClientRect();
    let ballCoords = {
      top: event.clientY - courtCoords.top - court.clientTop - ball.offsetHeight/getHalf,
      left: event.clientX - courtCoords.left - court.clientLeft - ball.offsetWidth/getHalf
    };
    // запрещаем пересекать верхнюю границу поля
    if (ballCoords.top < 0) {
      ballCoords.top = 0;
    }
    // запрещаем пересекать левую границу поля
    if (ballCoords.left < 0) {
      ballCoords.left = 0;
    }
    // запрещаем пересекать правую границу поля
    if (ballCoords.left + ball.clientWidth > court.clientWidth) {
      ballCoords.left = court.clientWidth - ball.clientWidth;
    }
    // запрещаем пересекать нижнюю границу поля
    if (ballCoords.top + ball.clientHeight > court.clientHeight) {
      ballCoords.top = court.clientHeight - ball.clientHeight;
    }

    ball.style.left = ballCoords.left + 'px';
    ball.style.top = ballCoords.top + 'px';
  }
  if(event.target.id === 'scoreZoneA' || event.target.id === 'scoreZoneB'){
    let scoreZone = event.target;
    ball.style.left = scoreZone.offsetLeft - scoreZone.clientWidth + 'px';
    ball.style.top = scoreZone.offsetTop - scoreZone.clientHeight + 'px';  
    team = scoreZone.id === 'scoreZoneA' ? 'A' : 'B';
    color = scoreZone.id === 'scoreZoneA' ? 'blue' : 'red';
    let goal = new CustomEvent('goal', {detail: {notification: `Team ${team} score!`, color: color}});
    scoreZone.dispatchEvent(goal);
  }
}

let scoreZones = [zoneA, zoneB];

scoreZones.forEach(element => element.addEventListener('goal', function(event) {
  const notificationTime = 3000;
  if(event.target.id === 'scoreZoneA'){
    scoreA++;
    scoreboardA.textContent = scoreA;
  }
  if(event.target.id === 'scoreZoneB'){
      scoreB++;
      scoreboardB.textContent = scoreB;
  }
  let notificationP = document.getElementById('notafication');
  let notificationId = setTimeout(() => {
    notificationP.textContent = event.detail.notification;
    notificationP.style.color = event.detail.color;
  }, 0);
  setTimeout(() => {
    notificationP.textContent = ''; 
    clearInterval(notificationId);
  }, notificationTime);
}));
/* END TASK 3 */