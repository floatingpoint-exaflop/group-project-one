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

let b = 0
let r = 0
let i = 0
let winner
let winnerDeck

function updatePlayerNames(){
    console.log('Updated Player Names.');
    //fill player names when game begins
    blackPlayerNameEl.textContent = blackPlayerName;
    redPlayerNameEl.textContent = redPlayerName;
}

function updateBlackWar(){
    //Black War Pile should be face up and show last card in that array
    blackWarEl.innerHTML = `<img src="../cards/${drawnBlack.pop()}.svg" width="40px"height="60px">`;
}

function updateRedWar(){
    //Red War Pile should be face up and show last card in that array
    redWarEl.innerHTML = `<img src="../cards/${drawnRed.pop()}.svg" width="40px"height="60px">`;
}
    
function updateBlackHand(){
    //Black Hand Pile should be face down and always show a cardback
    blackHandEl.innerHTML = `<img src="../cards/RED_BACK.svg" width="40px"height="60px">`;
}

function updateRedHand(){
    //Red Hand Pile should be face down and always show a cardback
    redHandEl.innerHTML = `<img src="../cards/RED_BACK.svg" width="40px"height="60px">`;
}

function updateBlackSpoils(){
    //Spoils Black Pile should be face down and always show a cardback
    blackSpoilsEl.innerHTML = `<img src="../cards/RED_BACK.svg" width="40px"height="60px">`;
}

function updateRedSpoils(){
    //Spoils Black Pile should be face down and always show a cardback
    redSpoilsEl.innerHTML = `<img src="../cards/RED_BACK.svg" width="40px"height="60px">`;
}

function updateBlackCamp(){
    //Spoils Black Pile should be face down and always show a cardback
    blackCampEl.clear()
    //need to show up to six cards in camp (last six cards in the contestedBlack array)
    let blackCardsCamp1 = document.createElement(`<img src="../cards/${contestedBlack.pop()}.svg" width="40px"height="60px">`)
    let blackCardsCamp2 = document.createElement(`<img src="../cards/${contestedBlack[contestedBlack.length - 2]}.svg" width="40px"height="60px">`)
    let blackCardsCamp3 = document.createElement(`<img src="../cards/${contestedBlack[contestedBlack.length - 3]}.svg" width="40px"height="60px">`)
    let blackCardsCamp4 = document.createElement(`<img src="../cards/${contestedBlack[contestedBlack.length - 4]}.svg" width="40px"height="60px">`)
    let blackCardsCamp5 = document.createElement(`<img src="../cards/${contestedBlack[contestedBlack.length - 5]}.svg" width="40px"height="60px">`)
    let blackCardsCamp6 = document.createElement(`<img src="../cards/${contestedBlack[contestedBlack.length - 6]}.svg" width="40px"height="60px">`)
    blackCampEl.appendChildren(blackCardsCamp1, blackCardsCamp2, blackCardsCamp3, blackCardsCamp4, blackCardsCamp5, blackCardsCamp6)
}

function updateRedCamp(){
    //Spoils Black Pile should be face down and always show a cardback
    redCampEl.clear()
    //need to show up to six cards in camp (last cards in the contestedRed array)
    let redCardsCamp1 = document.createElement(`<img src="../cards/${contestedRed.pop()}.svg" width="40px"height="60px">`)
    let redCardsCamp2 = document.createElement(`<img src="../cards/${contestedRed[contestedRed.length - 2]}.svg" width="40px"height="60px">`)
    let redCardsCamp3 = document.createElement(`<img src="../cards/${contestedRed[contestedRed.length - 3]}.svg" width="40px"height="60px">`)
    let redCardsCamp4 = document.createElement(`<img src="../cards/${contestedRed[contestedRed.length - 4]}.svg" width="40px"height="60px">`)
    let redCardsCamp5 = document.createElement(`<img src="../cards/${contestedRed[contestedRed.length - 5]}.svg" width="40px"height="60px">`)
    let redCardsCamp6 = document.createElement(`<img src="../cards/${contestedRed[contestedRed.length - 6]}.svg" width="40px"height="60px">`)
    redCampEl.appendChildren(redCardsCamp1, redCardsCamp2, redCardsCamp3, redCardsCamp4, redCardsCamp5, redCardsCamp6)
};