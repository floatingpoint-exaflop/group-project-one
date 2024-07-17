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

//declare global variables

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
let game = ''
let b = 0
let r = 0
let winner
let winnerDeck

//dummy player names
let blackPlayerName = 'black bart';
let redPlayerName = 'erik the red';

//TIM'S RENDER FUNCTIONS

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
    if (drawnBlack.length > 0) 
        {if (drawnBlack[drawnBlack.length-1] === "0S"){
            blackWarEl.html(`<img src="./assets/cards/10S.svg" width="40px"height="60px">`);}
        else if (drawnBlack[drawnBlack.length-1] === "0C"){
            blackWarEl.html(`<img src="./assets/cards/10C.svg" width="40px"height="60px">`);}
        else if (drawnBlack[drawnBlack.length-1] === "0H"){
            blackWarEl.html(`<img src="./assets/cards/10H.svg" width="40px"height="60px">`);}
        else if (drawnBlack[drawnBlack.length-1] === "0D"){
            blackWarEl.html(`<img src="./assets/cards/10D.svg" width="40px"height="60px">`);}
        else {blackWarEl.html(`<img src="./assets/cards/${drawnBlack.pop()}.svg" width="40px"height="60px">`);}
        console.log("Updated Black Player's Top War Card.");
    } else {blackWarEl.html('');}
}

function updateRedWar(){
    //Red War Pile should be face up and show last card in that array
    if (drawnRed.length > 0)
        {if (drawnRed[drawnRed.length-1] === "0S"){
            redWarEl.html(`<img src="./assets/cards/10S.svg" width="40px"height="60px">`);}
        else if (drawnRed[drawnRed.length-1] === "0C"){
            redWarEl.html(`<img src="./assets/cards/10C.svg" width="40px"height="60px">`);}
        else if (drawnRed[drawnRed.length-1] === "0H"){
            redWarEl.html(`<img src="./assets/cards/10H.svg" width="40px"height="60px">`);}
        else if (drawnRed[drawnRed.length-1] === "0D"){
            redWarEl.html(`<img src="./assets/cards/10D.svg" width="40px"height="60px">`);}
        else {redWarEl.html(`<img src="./assets/cards/${drawnRed.pop()}.svg" width="40px"height="60px">`);}
        console.log("Updated Red Player's Top War Card.");}
     else {redWarEl.html('');}
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
    if (contestedBlack.length > 0) {contestedBlack.forEach(card => 
        {if (card === "0S"){
            blackCampEl.html(`<img src="./assets/cards/10S.svg" width="40px"height="60px">`);}
        else if (card === "0C"){
            blackCampEl.html(`<img src="./assets/cards/10C.svg" width="40px"height="60px">`);}
        else if (card === "0H"){
            blackCampEl.html(`<img src="./assets/cards/10H.svg" width="40px"height="60px">`);}
        else if (card === "0D"){
            blackCampEl.html(`<img src="./assets/cards/10D.svg" width="40px"height="60px">`);}
        else {let blackCardCamp = $(`<img src="./assets/cards/${card}.svg" width="40" height="60">`);
        blackCampEl.append(blackCardCamp);}
        console.log("Updated Black Player's Camp Cards. These are at stake if Red wins this War!");})}
    else blackCampEl.html('');
}

function updateRedCamp() {
    // Clear the existing content of blackCampEl first
    redCampEl.html('');
    if (contestedRed.length > 0) {contestedRed.forEach(card => 
        {if (card === "0S"){
            redCampEl.html(`<img src="./assets/cards/10S.svg" width="40px"height="60px">`);}
        else if (card === "0C"){
            redCampEl.html(`<img src="./assets/cards/10C.svg" width="40px"height="60px">`);}
        else if (card === "0H"){
            redCampEl.html(`<img src="./assets/cards/10H.svg" width="40px"height="60px">`);}
        else if (card === "0D"){
            redCampEl.html(`<img src="./assets/cards/10D.svg" width="40px"height="60px">`);}
        else {let redCardCamp = $(`<img src="./assets/cards/${card}.svg" width="40" height="60">`);
        redCampEl.append(redCardCamp);}
        console.log("Updated Black Player's Camp Cards. These are at stake if Red wins this War!");})}
    else redCampEl.html('');
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

//Get deck from API
async function setUp(){
    const resp = await fetch('https://deckofcardsapi.com/api/deck/new/')
    const data = await resp.json()
    if (data.success === true){
        console.log("Deck obtained")
        deck = data.deck_id
        emptyDeck()
    } else {
        console.log('error')
    }
}

//Draw all cards from deck
async function emptyDeck(){
    const resp = await fetch(`https://deckofcardsapi.com/api/deck/${deck}/draw/?count=52`)
    const data = await resp.json()
    if (data.success === true){
        console.log("Deck emptied", data)
        buildPiles()
    } else {
        console.log('error')
    }
}

//Build player piles of all Red and all Black cards. Call shuffle functions.
async function buildPiles(){
    const respB = await fetch(`https://deckofcardsapi.com/api/deck/${deck}/pile/Black0/add/?cards=AC,2C,3C,4C,5C,6C,7C,8C,9C,0C,JC,QC,KC,AS,2S,3S,4S,5S,6S,7S,8S,9S,0S,JS,QS,KS`)
    const dataB = await respB.json()
    if (dataB.success === true){
        currentHand = BlackHand
        let pile = 'Black'.concat(b)
        console.log("Black built", dataB)
        await shuffle(pile)
        updateBlackHand()
    } else {
        console.log('error')
    }
    const respR = await fetch(`https://deckofcardsapi.com/api/deck/${deck}/pile/Red0/add/?cards=AH,2H,3H,4H,5H,6H,7H,8H,9H,0H,JH,QH,KH,AD,2D,3D,4D,5D,6D,7D,8D,9D,0D,JD,QD,KD`)
    const dataR = await respR.json()
    if (dataR.success === true){
        currentHand = RedHand
        let pile = 'Red'.concat(r)
        console.log("Red built", dataR)
        await shuffle(pile)
        updateRedHand()
    } else {
        console.log('error')
    }
}

//END SETUP:


// SHUFFLE FUNCTIONS:

//Check for Shuffle/Gameover
async function statusCheck(){
    if (BlackHand.length == 0 && wonBlack.length == 0){
        winner = 'Red'
        endGame();
    } else if (BlackHand.length == 0){
        b == b++
        currentHand = BlackHand
        let pile = 'Black'.concat(b)
        await reshuffle(wonBlack, pile)
    } updateRedHand()
    if (RedHand.length == 0 && wonRed.length == 0){
        winner = 'Black'
        endGame();
    } else if (RedHand.length == 0){
        r == r++
        currentHand = RedHand
        let pile = 'Red'.concat(r)
        await reshuffle(wonRed, pile)
    } updateBlackHand()
}

//Reshuffle won cards into main hand
async function reshuffle(fromPile, toPile){
    const resp = await fetch(`https://deckofcardsapi.com/api/deck/${deck}/pile/${toPile}/add/?cards=${fromPile}`)
    const data = await resp.json()
    if (data.success === true){
        await shuffle(toPile)
        fromPile.splice(0, fromPile.length)
    } else {
        console.log('error')
    } 
    updateBlackSpoils();
    updateBlackHand();
    updateRedSpoils();
    updateRedHand();
};

//Shuffle Empty Hand
async function shuffle(hand){
    resp = await fetch(`https://deckofcardsapi.com/api/deck/${deck}/pile/${hand}/shuffle/`)
    data = await resp.json()
    if (data.success === true){
        await listHand(hand)
    } else {
        console.log('error')
    }
}

//List and Update Arrays
async function listHand(hand){
    const resp = await fetch(`https://deckofcardsapi.com/api/deck/${deck}/pile/${hand}/list/`)
    const data = await resp.json()
    if (data.success === true){
        data.piles[hand].cards.forEach(function(element){
            currentHand.push(element.code)
             console.log(`${hand}'s reinforcements have arrived!!`)
        })
        if (data.piles[hand].remaining = 0){
            console.log('Game Over:')
        }
    } else {
        console.log('error')
    }
}

//END OF SHUFFLE FUNCTIONS

//GAMEPLAY
function run(){
    if (RedHand.length === 26 && BlackHand.length === 26){
        console.log('ready to play!')
        go = true
    } else {
        console.log('error')
    }
    
}

//TURN:
async function turn(){
    if (go == true && !game){
        go = false
        console.log('TURN')
        console.log('Blacks troops:', BlackHand,);
        console.log('Reds troops:', RedHand,);
        //Draw Cards
        drawnBlack.push(BlackHand[0])
        BlackHand.shift()
        drawnRed.push(RedHand[0])
        RedHand.shift()
        updateBlackWar()
        updateBlackHand()
        updateRedWar()
        updateRedHand()
        //TIME OUT FUNCTION GOES HERE, GIVE A COUPLE SECONDS SO WE CAN SEE THE WAR!
        console.log('At the front lines:', 'Black,', drawnBlack, 'Red,', drawnRed)

        //Compare cards
        let result = compareCards();
        if(result === 'Black'){;
            winner = 'Black';
            console.log("Black Wins!")
            winnerDeck = wonBlack;
            resolveTurn()
        } else if (result === 'Red'){
            winner = 'Red';
            console.log("Red Wins!")
            winnerDeck = wonRed;
            resolveTurn();
        } else if (result === 'Tie'){
            winner = 'Tie';
            console.log("Tie! It's a War!")
            for (i=0; i < 3; i++){
                await statusCheck()
                if (BlackHand.length === 1 && wonBlack.length === 0){
                    console.log('Blacks champion: ', BlackHand[0])
                } else { 
                contestedBlack.push(BlackHand[0])
                updateBlackCamp()
                BlackHand.shift()
                updateBlackHand()
                console.log(contestedBlack[contestedBlack.length-1], "Has moved to Black encampment")
                }
                if (RedHand.length === 1 && wonRed.length === 0){
                    console.log('Reds champion: ', RedHand[0])
                } else { 
                contestedRed.push(RedHand[0])
                updateRedCamp()
                RedHand.shift()
                updateRedHand()
                console.log(contestedRed[contestedRed.length-1], "Has moved to Red encampment")
                }
            }
        }   
        await statusCheck()
        go = true
    } else {
        console.log('slow down there buck-o')
    }
}


//Evaluate winner of turn
function compareCards(){
    let BlackCardValue = convertCard2Value(drawnBlack[drawnBlack.length-1])
    let RedCardValue = convertCard2Value(drawnRed[drawnRed.length-1])
    if (BlackCardValue > RedCardValue){
        result = 'Black'
        return result
    } else if (BlackCardValue < RedCardValue){
        result = 'Red'
        return result
    } else if (BlackCardValue == RedCardValue){
        result = 'Tie'
        return result
    }
}


//Convert card codes to number for comparison
function convertCard2Value(card){
    if (
        card === "2S" || card === "2C" || card === "2H" || card === "2D"){
            return 2
     } else if (
        card === "3S" || card === "3C" || card === "3H" || card === "3D"){
            return 3
     } else if (
        card === "4S" || card === "4C" || card === "4H" || card === "4D"){
            return 4
     } else if (
        card === "5S" || card === "5C" || card === "5H" || card === "5D"){
            return 5
     } else if (
        card === "6S" || card === "6C" || card === "6H" || card === "6D"){
            return 6
     } else if (
        card === "7S" || card === "7C" || card === "7H" || card === "7D"){
            return 7
     } else if (
        card === "8S" || card === "8C" || card === "8H" || card === "8D"){
            return 8
     } else if (
        card === "9S" || card === "9C" || card === "9H" || card === "9D"){
            return 9
     } else if (
        card === "0S" || card === "0C" || card === "0H" || card === "0D"){
            return 10
     } else if (
        card === "JS" || card === "JC" || card === "JH" || card === "JD"){
            return 11
     } else if (
        card === "QS" || card === "QC" || card === "QH" || card === "QD"){
            return 12
     } else if (
        card === "KS" || card === "KC" || card === "KH" || card === "KD"){
            return 13
     } else if (
        card === "AS" || card === "AC" || card === "AH" || card === "AD"){
            return 14
     }
};

//Call API to update pile lists
function resolveTurn(){
   
    contestedBlack.forEach(function(element){
        winnerDeck.push(element);
    } );
    contestedRed.forEach(function(element){
        winnerDeck.push(element);
    } );
    drawnBlack.forEach(function(element){
        winnerDeck.push(element);
    } );
    drawnRed.forEach(function(element){
        winnerDeck.push(element);
    } );
    
    contestedBlack = [];
    contestedRed = [];
    drawnBlack = [];
    drawnRed = [];
    updateAllCards();
    console.log('spoils dispersed')
    console.log('Black has conscripted', wonBlack);
    console.log('Red has conscripted', wonRed);
    console.log(BlackHand.length, "cards left for Black");
    console.log(RedHand.length, "cards left got Red");
};

function endGame(){
    console.log(`Game Over: ${winner} wins!!`)
    game = 'over'
}







//SAVE GAME:

function saveGameState(event) {
    // event.preventDefault();
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
        i: 0,
        game: game,
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
    let storedGameState
    let storedGameStateString = localStorage.getItem('gameState');
    console.log(storedGameStateString)

    if( !storedGameStateString ){
        setUp();
        redPlayerName = "Erik the Red";   
        blackPlayerName = "Black Bart";
    } else {
        storedGameState = JSON.parse(storedGameStateString);
        redPlayerName = storedGameState.redPlayerName;   
        blackPlayerName = storedGameState.blackPlayerName;
        deck = storedGameState.deck;
        BlackHand = storedGameState.BlackHand;
        RedHand = storedGameState.RedHand;
        wonBlack = storedGameState.wonBlack;
        wonRed = storedGameState.wonRed;
        contestedBlack = storedGameState.contestedBlack;
        contestedRed = storedGameState.contestedRed;
        drawnBlack = storedGameState.drawnBlack;
        drawnRed = storedGameState.drawnRed;
        currentHand = storedGameState.currentHand;
        go = storedGameState.go;
        b = storedGameState.b;
        r = storedGameState.r;
        i = storedGameState.i;
        game = game;
        winner = storedGameState.winner;
        winnerDeck = storedGameState.winnerDeck;
        updateAllCards();
    }
}


// loadGameState()
loadGameState()
// updatePlayerNames()
// updateAllCards()

    // // function checkWin(){

// redCardsHere.addEventListener("click", function(event){
//     console.log(event.target)
//     if( event.target.matches('.card') ){
//         console.log(`card clicked: ${event.target.getAttribute("data-value")} of ${event.target.getAttribute("data-suit")}`)
//     }
// 