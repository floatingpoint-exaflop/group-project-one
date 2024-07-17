//-----------User Input DOM Elements-------------------
const saveGameBtn = $('#save-game-button');
const testGameBtn = $('#test-game-button');
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
        console.log(storedGameState);}
        else {setUp()
            let redPlayerName = "Erik the Red";   
            let blackPlayerName = "Black Bart";
        ;}
        if (storedGameState) {
            let redPlayerName = storedGameState.redPlayerName;   
            let blackPlayerName = storedGameState.blackPlayerName;
            let deck = storedGameState.deck;
            let BlackHand = storedGameState.BlackHand;
            let RedHand = storedGameState.RedHand;
            let wonBlack = storedGameState.wonBlack;
            let wonRed = storedGameState.wonRed;
            let contestedBlack = storedGameState;contestedBlack;
            let contestedRed = storedGameState. contestedRed;
            let drawnBlack = storedGameState.drawnBlack;
            let drawnRed = storedGameState.drawnRed;
            let currentHand = storedGameState.currentHand;
            let go = storedGameState.go;
            let b = storedGameState.b;
            let r = storedGameState.r;
            let i = storedGameState.i;
            let winner = storedGameState.winner;
            let winnerDeck = storedGameState.winnerDeck;
            updateAllCards();
        }
    }

//event listener to save game
saveGameBtn.on('click', saveGameState);




// loadGameState();
