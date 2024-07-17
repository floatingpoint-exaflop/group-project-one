//-----------User Input DOM Elements-------------------
// // const saveGameBtn = $('#save-game-button');
// const musicBtn = $('#🔊');
// const viewRulesModalBtn = $('#computer-name-box');

// //------Black Player's Card Location DOM Elements------
// const blackPlayerNameEl = $('#computer-name-box');
// const blackHandEl = $('#black-deck');
// const blackSpoilsEl = $('#black-win-pile');
// const blackWarEl = $('#war-black-round-1');
// const blackCampEl = $('#war-black-round-2');

// const battleGroundEl = $('#battleground-play-space');

// //-------Red Player's Card Location DOM Elements-------
// const redCampEl = $('#war-red-round-2');
// const redWarEl = $('#war-red-round-1');
// const redSpoilsEl = $('#red-win-pile');
// const redHandEl = $('#red-deck');
// const redPlayerNameEl = $('#red-name-box');

//--------------------Functions------------------------
//----Updating Displayed Contents of different divs----
//Called for a given area by a gamelogic function that updates information for that area.

//redeclaring Jonathan's global variables because I am cooked and don't know how to test this
let deck

// '3C', '4C', '5C', '6C', '7C' //blackdeck
let BlackHand = []
    
let RedHand = ['3D', '4D', '5D', '6D', '7D'] //reddeck
let wonBlack = ['3S', '4S', '5S', '6S', '7S']  //spoilsblack
let wonRed = ['3H', '4H', '5H', '6H', '7H']  //spoilsred
let contestedBlack = ['8C', '9C', '10C', 'JC', 'QC'] //blkencampment
let contestedRed = ['8D', '9D', '10D', 'JD', 'QD'] //redencampment
let drawnBlack = ['KC'] //battleblack first card was tie, second is new contest
let drawnRed = ['KD'] // redbattle first card was tie, second is new contest
let go = false

console.log(BlackHand)
console.log(RedHand)

let b = 0
let r = 0
let i = 0
let winner
let winnerDeck

let blackPlayerName = 'black bart';
let redPlayerName = 'erik the red';

//fill player names when game begins
function updatePlayerNames(){
    if (blackPlayerName) {
    blackPlayerNameEl.text(blackPlayerName);
    } else blackPlayerNameEl.html('');
    if (redPlayerName) {
    redPlayerNameEl.text(redPlayerName);
    } else redPlayerNameEl.html('');
    console.log("Updated Player Names.");
}



function updateBlackWar(){
    //Black War Pile should be face up and show last card in that array
    if (drawnBlack.length > 0) {blackWarEl.html(`<img src="./assets/cards/${drawnBlack.pop()}.svg" width="40px"height="60px">`);
    console.log("Updated Black Player's Top War Card.");
    } else blackWarEl.html(''); 
}



function updateRedWar(){
    //Red War Pile should be face up and show last card in that array
    if (drawnRed.length > 0) {redWarEl.html(`<img src="./assets/cards/${drawnRed.pop()}.svg" width="40px"height="60px">`);
    console.log("Updated Red Player's Top War Card.");
    } else redWarEl.html(''); 
}


function updateBlackHand(){
    //Black Hand Pile should be face down and always show a cardback
    if (BlackHand.length > 0) {blackHandEl.html(`<img src="./assets/cards/RED_BACK.svg" width="40px"height="60px">`);
    console.log("Updated Black Player's Hand Cards (These are hidden!).");
    } else blackHandEl.html('');
}

function updateRedHand(){
    //Red Hand Pile should be face down and always show a cardback
    if (RedHand.length > 0) {redHandEl.html(`<img src="./assets/cards/RED_BACK.svg" width="40px"height="60px">`);
    console.log("Updated Red Player's Hand Cards (These are hidden!).");
    } else redCampEl.html('');
}

function updateBlackSpoils(){
    //Spoils Black Pile should be face down and always show a cardback
    if (wonBlack.length > 0) {blackSpoilsEl.html(`<img src="./assets/cards/RED_BACK.svg" width="40px"height="60px">`);
    console.log("Updated Black Player's Winnings/Spoils (These are hidden!).");
    } else blackSpoilsEl.html('');
}

function updateRedSpoils(){
    //Spoils Black Pile should be face down and always show a cardback
    if (wonRed.length > 0) {redSpoilsEl.html(`<img src="./assets/cards/RED_BACK.svg" width="40px"height="60px">`);
    console.log("Updated Red Player's Winnings/Spoils (These are hidden!).");
    } else redSpoilsEl.html('');
}

function updateBlackCamp() {
    // Clear the existing content of blackCampEl first
    blackCampEl.html('');
    if (contestedBlack.length > 0) {contestedBlack.forEach(card => {
        let blackCardCamp = $(`<img src="./assets/cards/${card}.svg" width="40" height="60">`);
        blackCampEl.append(blackCardCamp);})
        console.log("Updated Black Player's Camp Cards. These are at stake if Red wins this War!");
    } else blackCampEl.html('');
}

function updateRedCamp() {
    // Clear the existing content of redCampEl first
    redCampEl.html('');
    if (contestedRed.length > 0) {contestedRed.forEach(card => {
        let redCardCamp = $(`<img src="./assets/cards/${card}.svg" width="40" height="60">`);
        console.log("Updated Red Player's Camp Cards. These are at stake if Black wins this War!");
        redCampEl.append(redCardCamp);})
    } else redCampEl.html('');
}

function updateAllCards() {
    updateBlackHand()
    updateRedHand()
    updateBlackWar()
    updateRedWar()
    updateBlackSpoils()
    updateRedSpoils()
    updateBlackCamp()
    updateRedCamp()
}

updateAllCards()