// declare global variables
let deck
let BlackHand = []
let RedHand = []
let wonBlack = []
let wonRed = []
let contestedBlack = []
let contestedRed = []
let drawnBlack = []
let drawnRed = []
let currentHand
let go = false
let b = 0
let r = 0
let i = 0
let winner
let winnerDeck
let blackPlayerName
let redPlayerName


// let deck
// let BlackHand = ['3C', '4C', '5C', '6C', '7C'] //blackdeck
// let RedHand = ['3D', '4D', '5D', '6D', '7D'] //reddeck
// let wonBlack = ['3S', '4S', '5S', '6S', '7S']  //spoilsblack
// let wonRed = ['3H', '4H', '5H', '6H', '7H']  //spoilsred
// let contestedBlack = ['8C', '9C', '10C', 'JC', 'QC'] //blkencampment
// let contestedRed = ['8D', '9D', '10D', 'JD', 'QD'] //redencampment
// let drawnBlack = ['KC'] //battleblack first card was tie, second is new contest
// let drawnRed = ['KD'] // redbattle first card was tie, second is new contest
// let go = false
// let blackPlayerName = 'black bart';
// let redPlayerName = 'erik the red';



//-----------User Input DOM Elements-------------------
const saveGameBtn = $('#save-game-button');
const forfeitBtn = $('#forfeit-game-button');
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



//SAVE STUFF

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



        //If there's already a winner, we shouldn't even load the previous game state beyond this. We should nuke it all and restart.
//         if (storedGameState.winner !== '') {
//             localStorage.clear();
//             blackPlayerNameEl.html('');
//             blackHandEl.html('');
//             blackSpoilsEl.html('');
//             blackWarEl.html('');
//             blackCampEl.html('');
//             battleGroundEl.html('');
//             redCampEl.html('');
//             redWarEl.html('');
//             redSpoilsEl.html('');
//             redHandEl.html('');
//             redPlayerNameEl.html('');
//             alert("Since there was already a winner, the game will reset to be played again!");
//             window.location.reload()


// function loadGameState() {
//     let storedGameStateString = localStorage.getItem('gameState');
//     if (storedGameStateString) {
//         let storedGameState = JSON.parse(storedGameStateString);
//         console.log(storedGameState);
//         }
//         if (storedGameState) {
//         refreshBoard(storedGameState)
//         }
//     }
// }

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
// forfeitBtn.on('click', resetGameState);



loadGameState();
