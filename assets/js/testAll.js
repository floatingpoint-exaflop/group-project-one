//declare global variables
const redCardsHere = document.querySelector("#red-cards-here")

let deck
let BlackHand = []
let RedHand = []
let wonBlack = []
let wonRed = []
let contestedBlack = []
let contestedRed = []
let drawnBlack = []
let drawnRed = []
let currentHand    //need to add to savestate stuff
let go = false
let b = 0
let r = 0
let winner
let winnerDeck
// let blackPlayerName = 'black bart';
// let redPlayerName = 'erik the red';


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


//-----------------BEGIN MAIN CONTENT gamelogic-true.js---------------

//GARY'S RENDER FUNCTIONS
// const renderCards = (data) => data.map( (card) => ({ card: card.code, value: card.value, suit: card.suit, imgfile: `./assets/cards/${card.code.replace("0", "10")}.svg`}))

// const renderCards2 = (data) => data.map( (card) => ({ ...card, imgfile: `./assets/cards/${card.code.replace("0", "10")}.svg`}))


// function getRenderedCards(data){
//     const result = data.map( function(card) {
//         return {
//             code: card.code, 
//             value: card.value, 
//             suit: card.suit,
//             imgfile: `./assets/cards/${card.code.replace("0", "10")}.svg`
//         }
//     })
//     console.log(result)
//     return result
// }
//END RENDER FUNCTIONS


//BEGIN SETUP:

setUp()

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

//build player piles of all Red and all Black cards. Call shuffle functions
async function buildPiles(){
    const respB = await fetch(`https://deckofcardsapi.com/api/deck/${deck}/pile/Black0/add/?cards=AC,2C,3C,4C,5C,6C,7C,8C,9C,0C,JC,QC,KC,AS,2S,3S,4S,5S,6S,7S,8S,9S,0S,JS,QS,KS`)
    const dataB = await respB.json()
    if (dataB.success === true){
        currentHand = BlackHand
        let pile = 'Black'.concat(b)
        console.log("Black built", dataB)
        await shuffle(pile)
        
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
    } else {
        console.log('error')
    }
}

//END SETUP:

// Shuffle
async function shuffle(hand){
    resp = await fetch(`https://deckofcardsapi.com/api/deck/${deck}/pile/${hand}/shuffle/`)
    data = await resp.json()
    if (data.success === true){
        console.log(`${hand} shuffled`)
        await listHand(hand)
    } else {
        console.log('error')
    }
}

//List and update arrays
async function listHand(hand){
    const resp = await fetch(`https://deckofcardsapi.com/api/deck/${deck}/pile/${hand}/list/`)
    const data = await resp.json()
    console.log(data)
    if (data.success === true){
        data.piles[hand].cards.forEach(function(element){
            currentHand.push(element.code)
        })
        go = true
        if (data.piles[hand].remaining = 0){
            console.log('Game Over:')
        }
    } else {
        console.log('error')
    }
    console.log(` `)
    // Gary's Rendering
    // const renderableCards = getRenderedCards(data.piles[hand].cards)
    // const container = document.createElement("div")
    // container.setAttribute("class", "hand hhand-compact");
    // renderableCards.forEach( function(card){
    //     const cardImg = document.createElement("img")
    //     cardImg.setAttribute("class", "card")
    //     cardImg.setAttribute("data-value", card.value)
    //     cardImg.setAttribute("data-suit", card.suit)
    //     cardImg.setAttribute("src", card.imgfile)
    //     container.appendChild(cardImg)
    // })
    // redCardsHere.appendChild(container)
}


function run(){
    if (RedHand.length === 26 && BlackHand.length === 26){
        console.log('ready to play!')
        go = true
    } else {
        console.log('error')
    }
    
}


//END OF SETUP:

//TURN:

async function turn(){
    console.log('TURN')
    
    if (go = true){
        go = false
        if (BlackHand.length == 0){
            b == b++
            currentHand = BlackHand
            let pile = 'Black'.concat(b)
            await reshuffle(wonBlack, pile)
            
        }
        if (RedHand.length == 0){
            r == r++
            currentHand = RedHand
            let pile = 'Red'.concat(r)
            await reshuffle(wonRed, pile)
        }
        //Draw Cards
        drawnBlack.push(BlackHand[0])
        BlackHand.shift()
        drawnRed.push(RedHand[0])
        RedHand.shift()

        console.log('Challengers:', 'Red,', drawnRed, 'Black,', drawnBlack)

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
            // if(BlackHand.length < i+3)
            //     reshuffle()
            winner = 'Tie';
            console.log("Tie! It's a War!")
            for (i=0; i < 3; i++){
                if (BlackHand.length === 1 && wonBlack.length === 0){
                    break;
                } else if (BlackHand.length === 0) {
                    b == b++
                currentHand = BlackHand
                let pile = 'Black'.concat(b)
                await reshuffle(wonBlack, pile)
                    
                }
                contestedBlack.push(BlackHand[0])
                BlackHand.shift()
                console.log(contestedBlack[0], "Has moved to encampment")
            }
            for (i=0; i < 3; i++){
                if (RedHand.length === 1 && wonRed.length === 0){
                    break;
                } else if (RedHand.length === 0) {
                    r == r++
                    currentHand = RedHand
                    let pile = 'Red'.concat(r)
                    await reshuffle(wonRed, pile)
                    
                }
                contestedRed.push(RedHand[0])
                RedHand.shift()
                console.log(contestedRed[0], "Has moved to encampment")
            }
        }   
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
    
    console.log('Red has', RedHand, ' ready for battle');
    console.log('Black has', BlackHand, ' ready for battle');
    console.log('Black has conscripted', wonBlack);
    console.log('Red has conscripted', wonRed);
    console.log(BlackHand.length, "cards left for Black");
    console.log(RedHand.length, "cards left got Red");
    contestedBlack = [];
    contestedRed = [];
    drawnBlack = [];
    drawnRed = [];
    go = true
};
    
async function reshuffle(fromPile, toPile){
    const resp = await fetch(`https://deckofcardsapi.com/api/deck/${deck}/pile/${toPile}/add/?cards=${fromPile}`)
    const data = await resp.json()
    if (data.success === true){
        console.log("Reshuffling", data)
        await shuffle(toPile)
        fromPile.splice(0, fromPile.length)
    } else {
        console.log('error')
    }
};


// // function checkWin(){

// redCardsHere.addEventListener("click", function(event){
//     console.log(event.target)
//     if( event.target.matches('.card') ){
//         console.log(`card clicked: ${event.target.getAttribute("data-value")} of ${event.target.getAttribute("data-suit")}`)
//     }
// })

//-----------------END CONTENT gamelogic-true.js---------------




//----------------BEGIN MAIN CONTENT cardrender.js-------------





//--------------------END CONTENT cardrender.js----------------







//----------------BEGIN MAIN CONTENT saveState.js--------------






//---------------------END CONTENT saveState.js----------------