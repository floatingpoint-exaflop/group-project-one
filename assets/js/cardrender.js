// //-----------User Input DOM Elements-------------------
// const saveGameBtn = document.getElementById('#save-game-button');
// const musicBtn = document.getElementById('#🔊');
// const viewRulesModalBtn = document.getElementById('computer-name-box');

// //------Black Player's Card Location DOM Elements------
// const blackPlayerNameEl = document.getElementById('computer-name-box');
// const blackHandEl = document.getElementById('black-deck');
// const blackSpoilsEl = document.getElementById('black-win-pile');
// const blackWarEl = document.getElementById('war-black-round-1');
// const blackCampEl = document.getElementById('war-black-round-2');

// const battleGroundEl = document.getElementById('battleground-play-space');

// //-------Red Player's Card Location DOM Elements-------
// const redCampEl = document.getElementById('war-red-round-2');
// const redWarEl = document.getElementById('war-red-round-1');
// const redSpoilsEl = document.getElementById('red-win-pile');
// const redHandEl = document.getElementById('red-deck');
// const redPlayerNameEl = document.getElementById('red-name-box');

//--------------------Functions------------------------
//----Updating Displayed Contents of different divs----
//Called for a given area by a gamelogic function that updates information for that area.

//redeclaring Jonathan's global variables because I am cooked and don't know how to test this
let deck
let BlackHand = ['3C', '4C', '5C', '6C', '7C'] //blackdeck
let RedHand = ['3D', '4D', '5D', '6D', '7D'] //reddeck
let wonBlack = ['3S', '4S', '5S', '6S', '7S']  //spoilsblack
let wonRed = ['3H', '4H', '5H', '6H', '7H']  //spoilsred
let contestedBlack = ['8C', '9C', '10C', 'JC', 'QC'] //blkencampment
let contestedRed = ['8D', '9D', '10D', 'JD', 'QD'] //redencampment
let drawnBlack = ['KC'] //battleblack first card was tie, second is new contest
let drawnRed = ['KD'] // redbattle first card was tie, second is new contest
let go = false
let blackPlayerName = 'black bart';
let redPlayerName = 'erik the red';


let b = 0
let r = 0
let i = 0
let winner
let winnerDeck

function updatePlayerNames(){
    //fill player names when game begins
    blackPlayerNameEl.text(blackPlayerName);
    redPlayerNameEl.text(redPlayerName);
    console.log("Updated Player Names.");
}

function updateBlackWar(){
    //Black War Pile should be face up and show last card in that array
    blackWarEl.html(`<img src="./assets/cards/${drawnBlack.pop()}.svg" width="40px"height="60px">`);
    console.log("Updated Black Player's Top War Card.");
}

function updateRedWar(){
    //Red War Pile should be face up and show last card in that array
    redWarEl.html(`<img src="./assets/cards/${drawnRed.pop()}.svg" width="40px"height="60px">`);
    console.log("Updated Red Player's Top War Card.");
}
    
function updateBlackHand(){
    //Black Hand Pile should be face down and always show a cardback
    blackHandEl.html(`<img src="./assets/cards/RED_BACK.svg" width="40px"height="60px">`);
    console.log("Updated Black Player's Hand Cards (These are hidden!).");
}

function updateRedHand(){
    //Red Hand Pile should be face down and always show a cardback
    redHandEl.html(`<img src="./assets/cards/RED_BACK.svg" width="40px"height="60px">`);
    console.log("Updated Red Player's Hand Cards (These are hidden!).");
}

function updateBlackSpoils(){
    //Spoils Black Pile should be face down and always show a cardback
    blackSpoilsEl.html(`<img src="./assets/cards/RED_BACK.svg" width="40px"height="60px">`);
    console.log("Updated Black Player's Winnings/Spoils (These are hidden!).");
}

function updateRedSpoils(){
    //Spoils Black Pile should be face down and always show a cardback
    redSpoilsEl.html(`<img src="./assets/cards/RED_BACK.svg" width="40px"height="60px">`);
    console.log("Updated Red Player's Winnings/Spoils (These are hidden!).");
}

function updateBlackCamp() {
    // Clear the existing content of blackCampEl
    blackCampEl.html('');
    // Loop through the contestedBlack array and create image elements for each item
    contestedBlack.forEach(card => {
        let blackCardCamp = $(`<img src="./assets/cards/${card}.svg" width="40" height="60">`);
        // blackCardCamp.src = `./assets/cards/${card}.svg`;
        // blackCardCamp.width = 40;
        // blackCardCamp.height = 60;
        blackCampEl.append(blackCardCamp);
        console.log("Updated Black Player's Camp Cards. These are at stake if Red wins this War!");
    });
    
}

function updateRedCamp() {
    // Clear the existing content of blackCampEl
    redCampEl.html('');
    // Loop through the contestedBlack array and create image elements for each item
    contestedRed.forEach(card => {
        let redCardCamp = $(`<img src="./assets/cards/${card}.svg" width="40" height="60">`);
        // blackCardCamp.src = `./assets/cards/${card}.svg`;
        // blackCardCamp.width = 40;
        // blackCardCamp.height = 60;
        blackCampEl.append(redCardCamp);
        console.log("Updated Red Player's Camp Cards. These are at stake if Black wins this War!");
    });
}


updatePlayerNames()
updateBlackWar()
updateRedWar()
updateRedHand()
updateBlackHand()
updateBlackSpoils()
updateRedSpoils()
updateBlackCamp()
updateRedCamp()

