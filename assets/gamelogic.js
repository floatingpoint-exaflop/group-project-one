//declare global variables
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

const renderCards = (data) => data.map( (card) => ({ card: card.code, value: card.value, suit: card.suit, imgfile: `./assets/cards/${card.code.replace("0", "10")}.svg`}))

const renderCards2 = (data) => data.map( (card) => ({ ...card, imgfile: `./assets/cards/${card.code.replace("0", "10")}.svg`}))


function getRenderedCards(data){
    const result = data.map( function(card) {
        return {
            code: card.code, 
            value: card.value, 
            suit: card.suit,
            imgfile: `./assets/cards/${card.code.replace("0", "10")}.svg`
        }
    })
    console.log(result)
    return result
}

//BEGIN SETUP:
//get deckId and call empty deck
function setUp(){
    fetch('https://deckofcardsapi.com/api/deck/new/')
    .then(function (response){
        return response.json();
    })
    //declare deck id from response
    .then(function (data){
        deck = data.deck_id;
        console.log(deck)
        emptyDeck(deck)
    })
}

//draw all cards from deck and call build piles
function emptyDeck(deck){
   fetch(`https://deckofcardsapi.com/api/deck/${deck}/draw/?count=52`)
        .then(function (response){
            return response.json();
        })
        .then(function (data){
            console.log(data)
            console.log(deck)
            buildPiles(deck)
        })
}

//build player piles of all Red and all Black cards. Call shuffle functions
function buildPiles(deck){
    // fetch(`https://deckofcardsapi.com/api/deck/${deck}/pile/Black${b}/add/?cards=AC,2C,3C,4C,5C,6C,7C,8C,9C,0C,JC,QC,KC,AS,2S,3S,4S,5S,6S,7S,8S,9S,0S,JS,QS,KS`)
    fetch(`https://deckofcardsapi.com/api/deck/${deck}/pile/Black/add/?cards=AC,2C,3C,4C,5C,6C,7C,8C,9C,0C,JC,QC,KC,AS,2S,3S,4S,5S,6S,7S,8S,9S,0S,JS,QS,KS`)
        .then(function(response){
            return response.json()
        })
        .then(function (data){
            console.log(data);
            shuffleBlack()
        })
    // fetch(`https://deckofcardsapi.com/api/deck/${deck}/pile/Red${r}/add/?cards=AH,2H,3H,4H,5H,6H,7H,8H,9H,0H,JH,QH,KH,AD,2D,3D,4D,5D,6D,7D,8D,9D,0D,JD,QD,KD`)
    fetch(`https://deckofcardsapi.com/api/deck/${deck}/pile/Red/add/?cards=AH,2H,3H,4H,5H,6H,7H,8H,9H,0H,JH,QH,KH,AD,2D,3D,4D,5D,6D,7D,8D,9D,0D,JD,QD,KD`)
        .then(function(response){
        return response.json()
        })
        .then(function (data){
            console.log(data);
            shuffleRed()
        })
}
//END SETUP:

// Shuffle Piles
function shuffleBlack(){
    // fetch(`https://deckofcardsapi.com/api/deck/${deck}/pile/Black${b}/shuffle/`)
    fetch(`https://deckofcardsapi.com/api/deck/${deck}/pile/Black/shuffle/`)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data);
        listHand('Black');
    })
}

function shuffleRed(){
    // fetch(`https://deckofcardsapi.com/api/deck/${deck}/pile/Red${r}/shuffle/`)
    fetch(`https://deckofcardsapi.com/api/deck/${deck}/pile/Red/shuffle/`)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data)
        listHand('Red');
    })
}

// List Piles, update variables for display
function listBlackHand(){
    fetch(`https://deckofcardsapi.com/api/deck/${deck}/pile/Black/list/`)
    // fetch(`https://deckofcardsapi.com/api/deck/${deck}/pile/Black${b}/list/`)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        BlackHand = []
        data.piles.Black.cards.forEach(function(element){
            BlackHand.push(element.code)
        })
        go = true
        console.log('Black', BlackHand)
        if (data.piles.Black.cards.length = 0){
            console.log('Game Over: Red Wins')
        }
    })
}

async function listHand(color){
    const resp = await fetch(`https://deckofcardsapi.com/api/deck/${deck}/pile/${color}/list/`)
    const data = await resp.json()
    const renderableCards = getRenderedCards(data.piles[color].cards)
    const container = document.createElement("div")
    container.setAttribute("class", "hand hhand-compact");
    renderableCards.forEach( function(card){
        const cardImg = document.createElement("img")
        cardImg.setAttribute("class", "card")
        cardImg.setAttribute("data-value", card.value)
        cardImg.setAttribute("data-suit", card.suit)
        cardImg.setAttribute("src", card.imgfile)
        container.appendChild(cardImg)
    })
    redCardsHere.appendChild(container)
}

function listRedHandOld(){
    // fetch(`https://deckofcardsapi.com/api/deck/${deck}/pile/${r}/list/`)
    fetch(`https://deckofcardsapi.com/api/deck/${deck}/pile/Red/list/`)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data.piles.Red.cards)


        RedHand = []
        data.piles.Red.cards.forEach(function(element){
            RedHand.push(element.code)
        })
        go = true
        console.log('Red', RedHand)
        if (data.piles.Red.cards.length = 0){
            console.log('Game Over: Black Wins')
        }
    })
}

function run(){
    console.log('ready to play!')
}

setUp()
//END OF SETUP:

//TURN:

//draw cards 1. api calls, BlackPlay and RedPlay
//compare cards AFTER
//

function turn(){
    console.log('TURN')
    if (go = true){
        drawnBlack.push(BlackHand[i])
        drawnRed.push(RedHand[i])
        //Compare cards
        let result = compareCards();
        //Resolve result
        if(result === 'Black'){;
            winner = 'Black';
            winnerDeck = wonBlack;
            resolveTurn()
        } else if (result === 'Red'){
            winner = 'Red';
            winnerDeck = wonRed;
            resolveTurn();
        } else if (result === 'Tie'){
            // if(BlackHand.length < i+3)
            //     reshuffle()
            winner = 'Tie';
            contestedBlack.push(BlackHand[i+1], BlackHand[i+2], BlackHand[i+3]);
            contestedRed.push(RedHand[i+1], RedHand[i+2], RedHand[i+3]);
            i = (i+4);     
    }     
}
}

//Evaluate winner of turn
function compareCards(){
    let BlackCardValue = convertCard2Value(BlackHand[i])
    let RedCardValue = convertCard2Value(RedHand[i])
    if (BlackCardValue > RedCardValue){
        result = 'Black'
        return result
    } else if (BlackCardValue < RedCardValue){
        result = 'Red'
        return result
    } else if (BlackCardValue = RedCardValue){
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
}

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
    let x = Number
        console.log(i);
    for (x = 0; x <=i; x++){
        BlackHand.shift();
        RedHand.shift();
    };
    if(RedHand.legth === 0){
        reshuffleRed();
        console.log("reshuffling red")
    };
    if(BlackHand.length === 0){
        console.log("reshuffling black")
        reshuffleBlack();
    };
    
    console.log('redhand', RedHand);
    console.log('blachhand', BlackHand);
    console.log('black wins', wonBlack);
    console.log('red wins', wonRed);
    console.log(BlackHand.length);
    console.log(RedHand.length);
    contestedBlack = [];
    contestedRed = [];
    drawnBlack = [];
    drawnRed = [];
    i = 0;
    
};

function reshuffleBlack(){
    b = b++
    console.log(b)
        fetch(`https://deckofcardsapi.com/api/deck/${deck}/pile/Black${b}/add/?cards=${wonBlack}`)
            .then(function(response){
                return response.json()
            })
            .then(function (data){
                console.log(data);
                shuffleBlack()
            })
    }
//     

// console.log('reshuffling')
//     fetch(`https://deckofcardsapi.com/api/deck/${deck}/pile/Black/add/?cards=${wonBlack}`)
//     .then(function(response){
//         return response.json()
//     })
//     .then(function(data){
//         console.log(data);
//         shuffleBlack()
//     })
// }

function reshuffleRed(){
    r = r++
    console.log(r)
    fetch(`https://deckofcardsapi.com/api/deck/${deck}/pile/Red${r}/add/?cards=${wonRed}`)
            .then(function(response){
            return response.json()
            })
            .then(function (data){
                console.log(data);
                shuffleRed()
            })
//     console.log('reshuffling')
//     fetch(`https://deckofcardsapi.com/api/deck/${deck}/pile/Red/add/?cards=${wonRed}`)
//     .then(function(response){
//         return response.json()
//     })
//     .then(function(data){
//         console.log(data);
//         shuffleRed();
//     })
}

// // function checkWin(){

redCardsHere.addEventListener("click", function(event){
    console.log(event.target)
    if( event.target.matches('.card') ){
        console.log(`card clicked: ${event.target.getAttribute("data-value")} of ${event.target.getAttribute("data-suit")}`)
    }
})