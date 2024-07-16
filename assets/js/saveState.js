//-----------User Input DOM Elements-------------------
const saveGameBtn = $('#save-game-button');
const musicBtn = $('#🔊');
const viewRulesModalBtn = $('#computer-name-box');

//------Black Player's Card Location DOM Elements------
const blackPlayerNameEl = $('#computer-name-box');
const blackHandEl = $('#black-deck');
const blackSpoilsEl = $('#black-win-pile');
const blackWarEl = $('#war-black-round-1');
const blackCampEl = $('#war-black-round-2');

const battleGroundEl = $('#battleground-play-space');

//-------Red Player's Card Location DOM Elements-------
const redCampEl = $('#war-red-round-2');
const redWarEl = $('#war-red-round-1');
const redSpoilsEl = $('#red-win-pile');
const redHandEl = $('#red-deck');
const redPlayerNameEl = $('#red-name-box');

//--------------------Functions------------------------
//---------Search History and localStorage-------------
//Reloads the saved game state and puts the cards back on the screen where they were when we saved.

function saveGameState(event) {
    event.preventDefault();
    console.log('Saving Game...');

    let gameState = {
        deck: deck,
        BlackHand: BlackHand,
        RedHand: RedHand,
        wonBlack: wonBlack,
        wonRed: wonRed,
        contestedBlack: contestedBlack,
        contestedRed: contestedRed,
        drawnBlack: drawnBlack,
        drawnRed: drawnRed,
        currentHand: currentHand,
        go: go,
        b: b,
        r: r,
        i: i,
        winner: winner,
        winnerDeck: winnerDeck,
        blackPlayerName: blackPlayerNameEl.val(''),
        redPlayerName: redPlayerNameEl.val('')
    };

let gameStateString = JSON.stringify(gameState);
localStorage.setItem('gameState', gameStateString);
console.log('Game Saved. Leaving page... BYE FELICIA');
//leaves page, effectively making this a save-and-quit function.
window.location.replace("./index.html");
}

function loadGameState() {
    let storedGameStateString = localStorage.getItem('gameState');
    if (storedGameStateString) {
        let storedGameState = JSON.parse(storedGameStateString);
        console.log(storedGameState);
        //If there's already a winner, we shouldn't even load the previous game state beyond this. We should nuke it all and restart.
        if (storedGameState.winner !== '') {
            localStorage.clear();
            blackPlayerNameEl.html('');
            blackHandEl.html('');
            blackSpoilsEl.html('');
            blackWarEl.html('');
            blackCampEl.html('');
            battleGroundEl.html('');
            redCampEl.html('');
            redWarEl.html('');
            redSpoilsEl.html('');
            redHandEl.html('');
            redPlayerNameEl.html('');
            alert("Since there was already a winner, the game will reset to be played again!");
            window.location.reload()
        }
        if (storedGameState) {
        refreshBoard(storedGameState)
        }
    }
}

function refreshBoard(storedGameState){
    blackPlayerNameEl.text(blackPlayerName);
    redPlayerNameEl.text(redPlayerName);

    blackWarEl.html(`<img src="./assets/cards/${drawnBlack.pop()}.svg" width="40px"height="60px">`);
    redWarEl.html(`<img src="./assets/cards/${drawnRed.pop()}.svg" width="40px"height="60px">`);

    blackHandEl.html(`<img src="./assets/cards/RED_BACK.svg" width="40px"height="60px">`);
    redHandEl.html(`<img src="./assets/cards/RED_BACK.svg" width="40px"height="60px">`);

    blackSpoilsEl.html(`<img src="./assets/cards/RED_BACK.svg" width="40px"height="60px">`);
    redSpoilsEl.html(`<img src="./assets/cards/RED_BACK.svg" width="40px"height="60px">`);

    contestedBlack.forEach(card => {
        let blackCardCamp = $(`<img src="./assets/cards/${card}.svg" width="40" height="60">`);
        blackCampEl.append(blackCardCamp);})

    contestedRed.forEach(card => {
        let redCardCamp = $(`<img src="./assets/cards/${card}.svg" width="40" height="60">`);
        redCampEl.append(redCardCamp);})

    let deck = storedGameState.deck;
    let go = storedGameState.go;
    let b = storedGameState.b;
    let r = storedGameState.r;
    let i = storedGameState.i;
    let currentHand = storedGameState.currentHand;
    let winner = storedGameState.winner;
    let winnerDeck = storedGameState.winnerDeck;
};

//event listener to save game
saveGameBtn.on('click', saveGameState);




// loadGameState();
