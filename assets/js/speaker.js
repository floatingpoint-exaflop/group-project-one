//Tying my js to the emoji I'm using as a button
const modeToggle = document.querySelector('#🔊');

//tying my js to the body so I can easily swap all colors
const song = document.querySelector('#disco-ultralounge');

//getting a variable tied to whatever state we have, if any, from the dark/light mode
let chosenMode = '🔊';

let deckNoise = new Audio('./assets/sound/cards-on-table.mp3');
let cardNoise = new Audio('./assets/sound/place-card.mp3');
let shuffleNoise = new Audio('./assets/sound/shuffle-cards.mp3');

//function looks at the state of light/dark mode, if any. By default, the page will be in light mode (null state), but otherwise it will load as whatever the state icon is set to.
    //I am kind of really liking using emoji in code. It honestly makes it a lot easier for me to keep track of certain stuff.
const playStop = function() {
    if (chosenMode == null || chosenMode === '🔊') {
        song.pause();
        modeToggle.textContent = '🔇';
        console.log("The music mode is 🔇");
    } else if (chosenMode === '🔇') {
        song.play();
        modeToggle.textContent = '🔊';
        console.log("The music mode is 🔊");
    }
}
playStop();

//Regardless of whether it renders as a sun or moon, the event listener allows the user to toggle between the two accurately, and it sets to state so reloaded pages will have whatever state the user left off with.
    //I was able to make this really simple by just having a light and dark class for everything in the body.
    modeToggle.addEventListener('click', function (event) {
        event.preventDefault();
        if (song.paused) {
            song.play();
            modeToggle.textContent = '🔊';
            localStorage.setItem('modeStored', '🔊');
            console.log('The music has been changed to 🔊');
        } else if (song.play) {
            song.pause();
            modeToggle.textContent = '🔇';
            localStorage.setItem('modeStored', '🔇');
            console.log('The music mode has been changed to 🔇');
        }
    });