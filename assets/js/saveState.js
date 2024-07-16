//-----------User Input DOM Elements-------------------
const saveGameBtn = document.getElementById('#save-game-button');
const musicBtn = document.getElementById('#🔊');
const viewRulesModalBtn = document.getElementById('computer-name-box');

//------Black Player's Card Location DOM Elements------
const blackPlayerNameEl = document.getElementById('computer-name-box');
const blackHandEl = document.getElementById('black-deck');
const blackSpoilsEl = document.getElementById('black-win-pile');
const blackWarEl = document.getElementById('war-black-round-1');
const blackCampEl = document.getElementById('war-black-round-2');

const battleGroundEl = document.getElementById('battleground-play-space');

//-------Red Player's Card Location DOM Elements-------
const redCampEl = document.getElementById('war-red-round-2');
const redWarEl = document.getElementById('war-red-round-1');
const redSpoilsEl = document.getElementById('red-win-pile');
const redHandEl = document.getElementById('red-deck');
const redPlayerNameEl = document.getElementById('red-name-box');

//--------------------Functions------------------------
//---------Search History and localStorage-------------
//Reloads the saved game state and puts the cards back on the screen where they were when we saved.

//redeclaring Jonathan's global variables because I am cooked and don't know how to test this
const redCardsHere = document.querySelector("#red-cards-here")

let deck
let BlackHand = [] //blackdeck
let RedHand = [] //reddeck
let wonBlack = []  //spoilsblack
let wonRed = []  //spoilsred
let contestedBlack = [] //blkencampment
let contestedRed = [] //redencampment
let drawnBlack = [] //battleblack first card was tie, second is new contest
let drawnRed = [] //// redbattle first card was tie, second is new contest
let go = false

let b = 0
let r = 0
let i = 0
let winner
let winnerDeck


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
console.log('Game Saved.');
//leaves page, effectively making this a save-and-quit function.
window.location.replace("./index.html");
}

function loadGameState(event) {
    event.preventDefault();
    let storedGameStateString = localStorage.getItem('gameState');
    if (storedGameStateString) {
        let storedGameState = JSON.parse(storedGameStateString);
        console.log(storedGameState);
        //If there's already a winner, we shouldn't even load the previous game state beyond this. We should nuke it all and restart.
        if (storedGameState.winner !== '') {
            localStorage.clear();
            blackPlayerNameEl.empty();
            blackHandEl.empty();
            blackSpoilsEl.empty();
            blackWarEl.empty();
            blackCampEl.empty();
            battleGroundEl.empty();
            redCampEl.empty();
            redWarEl.empty();
            redSpoilsEl.empty();
            redHandEl.empty();
            redPlayerNameEl.empty();
            alert("Since there was already a winner, the game will reset to be played again!");
            window.location.reload()
        }
        if (storedGameState) {
        refreshBoard(storedGameState)
        }
    }
}

function refreshBoard(storedGameState){
    console.log('Refreshing Board Display...');
    //fill player names
    blackPlayerNameEl.textContent = storedGameState.blackPlayerName;
    redPlayerNameEl.textContent = storedGameState.redPlayerName;
    //for piles which should be face up, get and display the last image in the array for each pile, if the pile should be face-up.
    redWarEl.innerHTML = `<img src="../cards/${storedGameState.drawnRed.pop()}.svg" width="40px"height="60px">`;
    blackWarEl.innerHTML = `<img src="../cards/${storedGameState.drawnBlack.pop()}.svg" width="40px"height="60px">`;
    //face down piles
    blackHandEl.innerHTML = `<img src="../cards/RED_BACK.svg" width="40px"height="60px">`;
    blackSpoilsEl.creat = `<img src="../cards/RED_BACK.svg" width="40px"height="60px">`;
    // blackCampEl.innerHTML = `<img src="../cards/RED_BACK.svg" width="40px"height="60px">`;
    //need to show up to six cards in camp (last cards in the contestedBlack array)
    let blackCardsCamp1 = document.createElement(`<img src="../cards/${storedGameState.contestedBlack.pop()}.svg" width="40px"height="60px">`)
    let blackCardsCamp2 = document.createElement(`<img src="../cards/${storedGameState.contestedBlack[contestedBlack.length - 2]}.svg" width="40px"height="60px">`)
    let blackCardsCamp3 = document.createElement(`<img src="../cards/${storedGameState.contestedBlack[contestedBlack.length - 3]}.svg" width="40px"height="60px">`)
    let blackCardsCamp4 = document.createElement(`<img src="../cards/${storedGameState.contestedBlack[contestedBlack.length - 4]}.svg" width="40px"height="60px">`)
    let blackCardsCamp5 = document.createElement(`<img src="../cards/${storedGameState.contestedBlack[contestedBlack.length - 5]}.svg" width="40px"height="60px">`)
    let blackCardsCamp6 = document.createElement(`<img src="../cards/${storedGameState.contestedBlack[contestedBlack.length - 6]}.svg" width="40px"height="60px">`)
    blackCampEl.appendChildren(blackCardsCamp1, blackCardsCamp2, blackCardsCamp3, blackCardsCamp4, blackCardsCamp5, blackCardsCamp6)

    //need to show up to six cards in camp (last cards in the contestedRed array)
    let redCardsCamp1 = document.createElement(`<img src="../cards/${storedGameState.contestedBlack.pop()}.svg" width="40px"height="60px">`)
    let redCardsCamp2 = document.createElement(`<img src="../cards/${storedGameState.contestedBlack[contestedBlack.length - 2]}.svg" width="40px"height="60px">`)
    let redCardsCamp3 = document.createElement(`<img src="../cards/${storedGameState.contestedBlack[contestedBlack.length - 3]}.svg" width="40px"height="60px">`)
    let redCardsCamp4 = document.createElement(`<img src="../cards/${storedGameState.contestedBlack[contestedBlack.length - 4]}.svg" width="40px"height="60px">`)
    let redCardsCamp5 = document.createElement(`<img src="../cards/${storedGameState.contestedBlack[contestedBlack.length - 5]}.svg" width="40px"height="60px">`)
    let redCardsCamp6 = document.createElement(`<img src="../cards/${storedGameState.contestedBlack[contestedBlack.length - 6]}.svg" width="40px"height="60px">`)
    blackCampEl.appendChildren(redCardsCamp1, redCardsCamp2, redCardsCamp3, redCardsCamp4, redCardsCamp5, redCardsCamp6)

    redSpoilsEl.innerHTML = `<img src="../cards/RED_BACK.svg" width="40px"height="60px">`;
    redHandEl.innerHTML = `<img src="../cards/RED_BACK.svg" width="40px"height="60px">`;
    let deck = storedGameState.deck;
    let go = storedGameState.go;
    let b = storedGameState.b;
    let r = storedGameState.r;
    let i = storedGameState.i;
    let winner = storedGameState.winner;
    let winnerDeck = storedGameState.winnerDeck;
};

saveGameBtn.on('click', saveGameState);
// viewRulesModalBtn.on('click', saveGameState);