const root = document.getElementById('root');

const tweetButton = root.querySelector('.addTweet');
const mainPage = document.getElementById('tweetItems');
const tweetForm = document.getElementById('modifyItem');
const tweetFormHeader = document.getElementById('modifyItemHeader');
const buttonSave = document.getElementById('saveModifiedItem');
const buttonCancel = document.getElementById('cancelModification');
const textArea = document.getElementById('modifyItemInput');
const ul = document.getElementById('list');
const alertWindow = document.getElementById('alertMessage');
const alertMessageText = document.getElementById('alertMessageText');
textArea.setAttribute('maxlength', '140');
const pageTitle = mainPage.querySelector('h1');
const modifyItem = document.getElementById('modifyItem');

const goToLikedButton = document.createElement('button');
goToLikedButton.textContent = 'Go to liked';
goToLikedButton.id = 'goToLikedButton';
tweetButton.after(goToLikedButton);
const backButton = document.createElement('button');
backButton.textContent = 'Back';
backButton.id = 'back';
goToLikedButton.after(backButton);
let editedURL, editedId;

main();

document.onclick = function(event){
    if(event.target === buttonSave){
        let tweetId = parseInt(localStorage.getItem('tweets-id-counter')) || 0;
        saveTweet(buttonSave.dataset.id || ++tweetId);
    }
    if(event.target === buttonCancel){
        closeAlertMessage();
        buttonSave.removeAttribute('data-id');
        main();
    }
    if(event.target === tweetButton){
        addTweetPage();
        textArea.focus();
    }
    if(event.target === alertWindow){
        closeAlertMessage();
    }
    if(event.target === goToLikedButton){
        likedPage();
    }
    if(event.target === backButton){
        main();
    }
}

ul.onclick = function(event) {
    if(event.target && event.target.tagName !== 'BUTTON'){
        let div = event.target.closest('div.tweet');
        if( !div || !ul.contains(div)) {
            return;
        }
        editedId = div.id;
        editTweet(div.id);
    }
    if(event.target && event.target.tagName === 'BUTTON'){
        let button = event.target;
        let [,,id] = button.id.split('-');
        if(button.textContent === 'Remove'){
            removeTweet(id);
        }
        if(button.textContent === 'Like') {
            alertMessage(`Hooray! You liked tweet with id ${id}!`);
            likeToggle(button.id);
        } else if(button.textContent === 'Unlike') {
            alertMessage(`Sorry! You no longer like tweet with id ${id}!`);
            likeToggle(button.id);
        }
    }    
}

function main () {
    location.hash ='';
    pageTitle.textContent ='Simple Tweeter';
    mainPage.classList.remove('hidden');
    modifyItem.classList.add('hidden');
    backButton.classList.add('hidden');
    tweetButton.classList.remove('hidden');
    showTweets();
}

function addTweetPage () {
    location.hash = '#/add';
    textArea.value = '';
    mainPage.classList.add('hidden');
    modifyItem.classList.remove('hidden');
    tweetFormHeader.textContent = 'Add Tweet'; 
}

function likedPage () {
    location.hash = '#/liked';
    pageTitle.textContent ='Liked Tweets';
    showLikedTweets();
    backButton.classList.remove('hidden');
    tweetButton.classList.add('hidden');
    goToLikedButton.classList.add('hidden');
    mainPage.classList.remove('hidden');
    modifyItem.classList.add('hidden');
}

function editTweet (tweetId) {
    let [,,id] = tweetId.split('-');
    mainPage.classList.add('hidden');
    modifyItem.classList.remove('hidden');
    tweetFormHeader.textContent = 'Edit Tweet';
    const tweetItem = JSON.parse(localStorage.getItem(id));
    textArea.value = tweetItem.text;
    buttonSave.dataset.id = id;
    location.hash = `#/edit/:item_${id}`;
    editedURL = location.hash;
}

function saveTweet (id) {
    let oldTweet = false;
    let existing = false;
    let exception;
    if (textArea.value !== ''){
        for (let i = 0; i < localStorage.length; i++){
            let tweet = localStorage.key(i);
            if (tweet === id){
                oldTweet = true;
                exception = id;
            }
            if(textArea.value === JSON.parse(localStorage.getItem(tweet)).text && tweet !== exception){
                existing = true;
            }
        }
        if (existing){
            alertMessage(`Error! You can't tweet about that`);
        } else {
            if (!oldTweet){
                localStorage.setItem('tweets-id-counter', id);
            }
            const tweetItem = {
                id: id,
                text: textArea.value,
                liked: false
            }
            if (oldTweet){
                buttonSave.removeAttribute('data-id');
            }
            localStorage.setItem( id, JSON.stringify(tweetItem));
            main();
        } 
    }
}

function showTweets () {
    let array = getTweetsArray();
    renderTweetsArray(array);
    let likedArray = array.filter((element) => element.liked);
    if(likedArray){
        showGoToLikedButton(likedArray);
    }
}

function showLikedTweets () {
    let array = getTweetsArray();
    let likedArray = array.filter((element) => element.liked);
    renderTweetsArray(likedArray); 
}

function alertMessage(message){
    const notificationTime = 3000;
    alertMessageText.textContent = message;
    alertWindow.classList.remove('hidden');
    alertWindow.classList.add('alert-message');
    setTimeout(() => { 
        alertWindow.classList.add('hidden');
        alertWindow.classList.remove('alert-message');
      }, notificationTime);
}

function closeAlertMessage() {
    alertWindow.classList.add('hidden');
}

function removeTweet (tweetId) {
    localStorage.removeItem(tweetId);
    main();   
}

function likeToggle (tweetId) {
    let [,,id] = tweetId.split('-');
    let tweetItem = JSON.parse(localStorage.getItem(id));
    const likeButton = document.getElementById(tweetId);
    let div = likeButton.closest('LI').firstElementChild;
    if (!tweetItem.liked){
        tweetItem.liked = true;

        div.classList.add('liked'); 
        likeButton.textContent = 'Unlike';
    } else if (tweetItem.liked){
        tweetItem.liked = false;
        div.classList.remove('liked');
        likeButton.textContent = 'Like';
    }
    localStorage.setItem( id, JSON.stringify(tweetItem));
    main();
}

function showGoToLikedButton (array) {
    if(array.length !== 0){
        goToLikedButton.classList.remove('hidden');
    } else {
        goToLikedButton.classList.add('hidden');
    }
}

function getTweetsArray () {
    let array = [];
    if(localStorage.length > 1){
        for (let i = 1; i < localStorage.length; i++){
            let tweetNumber = localStorage.key(i);
            if (tweetNumber !== 'tweets-id-counter'){
                array[tweetNumber-1] = JSON.parse(localStorage.getItem(tweetNumber));
            } 
        }
    }
    return array;   
}

function renderTweetsArray (array) {
    ul.innerHTML = '';
    array.forEach((element) => {
        let li = document.createElement('li');
        let likeButtonSetter = element.liked ? `<button id="like-btn-${element.id}">Unlike</button>` 
        : `<button id="like-btn-${element.id}">Like</button>`;
        let likedTweet = element.liked ? ' liked' : '';
        li.insertAdjacentHTML('afterbegin', `<div id="tweet-id-${element.id}" class="tweet${likedTweet}">
        <p>${element.text}</p><div class="tweet-btn-group" data-id="${element.id}">
        <button id="remove-btn-${element.id}">Remove</button>${likeButtonSetter}</div></div>`)
        ul.prepend(li);
    });
}

window.onpopstate = function() {
    let editing = false;
    let regExp = /^#\/edit\/:item_\d+$/;
    if(regExp.test(location.hash)){
        editTweet(editedId);
        editing = true;
    }
    if(!editing){
        switch (location.hash) {
            case '':
                main()
                break
            case '#/add':
                addTweetPage()
                break
            case '#/liked':
                likedPage()
                break
            default:
                main()
        }
    }
}