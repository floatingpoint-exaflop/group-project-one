# Group Project One: This Means War
A collaborative card game project between Andrea Cannon, Jonathan Grommesh, Ben Merchant &amp; Tim Scallon.

## Description

## Description
In this version of the card game 'War', a human player chooses a color (red or black) and plays against a computer opponent assigned to the opposite color. More information on gameplay and rules can be found in the [Usage](#usage) section below.




## Table of Contents

- [Libraries](#libraries)
- [Usage](#usage)
- [Files](#files)
- [Deployed](#deployed)
- [Credits](#credits)
- [License](#license)

## Libraries

This project uses Bootstrap 5.x.x, jQuery, and cardsJS. 

## Usage

### Game Setup

No special actions are needed from the user; the game kicks off when the user clicks the Start Game button on the index.html landing page.

When the game begins, we get a new Deck ID, and that standard 52-card deck is shuffled.

Each player gets half the deck, with the 'red' player taking all red cards (hearts and diamonds), and the 'black' player taking all black cards (clubs and spades). These stacks are shuffled once assigned and placed face-down on the playes' respective sides of the board.

### Game Rules and Play

The game is played in iterative rounds/turns, with both players making their move simultaneously each round/turn.

1. Battle begins: Players simultaneously flip and reveal the top card of their deck, which appears in the center Battlefield section.

2. The player with the higher card rank wins the Battle, and takes both played cards, placing them face down on their 'Spoils of War' stack.

3. If the cards are the same rank, the players enter a War!

#### If War Breaks Out:

1. Both players get the next card from their pile face down and place it in their respective Encampmenmt, next to the Battlefield. They each draw a second card and place it face up in their Encampment, next to their face down card.

2. The player with the higher face-up card in their Encampment wins the war and adds all the cards on the table to the bottom of their deck.

3. If players' face-up Encampment cards are the same rank, the War continues! If one player has a higher card rank, they take both piles, placing them face down on their 'Spoils of War' stack (In this example, that means they'd take four cards: the two they put down, and the two from their opponent).

4. Players reveal their face-down Encampment card, which goes on the face-up Encampment pile.

5. The player with the higher card rank takes both piles, placing them face down on their 'Spoils of War' stack (In this example, that means they'd take six cards: the three they put down so far, and the three from their opponent). 

6. When a player runs out of cards in their deck, they shuffle their Spoils of War back into it so they can keep playing.

The war continues in this fashion until a player wins via a higher card rank, or until a player runs out of cards COMPLETELY (i.e. no deck, and no remaining Spoils of War).

    If a player runs out of cards COMPLETELY in the middle of a "war", they lose the war and are out of the game entirely.

    If a player wins a "war" without either player running out of cards, the game continues from Battle Begins.

<!-- Alternatively, they can turn their last card face up, and these count as their played card in the war -->

The game as a whole continues until one player wins all the cards from the table. The player who took all the cards is the winner!


## Files

- HTML:

- CSS:

- JS:


## Deployed

[Click here to view the deployed webpage.](https://floatingpoint-exaflop.github.io/group-project-one)

![image](./assets/deployed-screenshot.png)


## Credits

### API and Library

[Deck of Cards API](https://www.deckofcardsapi.com/) by [crobertsbmw](https://github.com/crobertsbmw).

[CardsJS](https://richardschneider.github.io/cardsJS/) Copyright © 2015 [Richard Schneider](https://github.com/richardschneider/cardsJS).

Thanks to Eric Meyer for the [reset.css](http://meyerweb.com/eric/tools/css/reset/) code.

Shoutout to [prettycons](https://www.flaticon.com/free-icons/ace-of-spades/) for lending us a favicon png, and to [favicon.io](https://favicon.io/favicon-converter/) for the file build.

### Textures

Cards: [Vector Playing Card Library 1.3](http://code.google.com/p/vectorized-playing-cards/) by [Chris Aguilar](webmaster@totalnonsense.com)

Tabletop Felt: [u/buddingmonkey](https://www.reddit.com/user/buddingmonkey/) via [r/tabletopsimulator](https://www.reddit.com/r/tabletopsimulator/comments/35qk30/i_made_a_felt_tabletop_for_your_custom_large/)

Casino Carpet: [Briton's Design Studio Online](https://www.brintons.net/dso-account/sign-in), via [Pintrest](https://www.pinterest.com/pin/high-energy-colorful-axminster-carpet-designs-for-casino-floor-casinodesign-casinocarpets-casinoc--573223858819239298/)

Wood Border: https://img.freepik.com/premium-photo/old-wooden-texture-background_41471-10627.jpg

## License

MIT License (see repo)