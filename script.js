import Deck from './deck.js';

let playerDeck,computerDeck,inRound,roundNumber,stop;

const CARD_VALUE_MAP ={
    "1":1,
    "2":2,
    "3":3,
    "4":4,
    "5":5,
    "6":6,
    "7":7,
    "8":8,
    "9":9,
    "10":10,
    J:11,
    Q:12,
    K:13,
    A:14
}

document.addEventListener('click',()=>{

    if(stop){
        startGame();
        return;
    }
    if(inRound){
        cleanBeForeRound()
    }else{
        flipCards()
    }
})

const computerCardSlot =  document.querySelector('.computer-card-slot');
const playerCardSlot = document.querySelector('.player-card-slot');
const computerDeckElement =  document.querySelector('.computer-deck');
const playerDeckElement = document.querySelector('.player-deck');
const gameText =  document.querySelector('.text')





startGame();

function startGame() {
    const deck = new Deck();
    console.log(deck.cards);
     //divide the deck into 2 equal stacks
    const deckMidPoint = Math.ceil(deck.numberOfCards/2);
    playerDeck = new Deck(deck.cards.slice(0,deckMidPoint));
    computerDeck = new Deck(deck.cards.slice(deckMidPoint,deck.numberOfCards));
    roundNumber = 1;
    stop = false;
    cleanBeForeRound();
   
}

function cleanBeForeRound() {
    
      inRound = false;
      gameText.textContent = '';
      computerCardSlot.innerHTML = '';
      playerCardSlot.innerHTML = '';

      updateDeckCount()

}

function updateDeckCount() {
    computerDeckElement.textContent = computerDeck.numberOfCards
    playerDeckElement.textContent = playerDeck.numberOfCards
    
}

function flipCards(){

    inRound = true;

    let playerCard = playerDeck.pop();
    let computerCard = computerDeck.pop();

    playerCardSlot.appendChild(playerCard.getHTML());
    computerCardSlot.appendChild(computerCard.getHTML());
    updateDeckCount()
    
    if(isRoundWinner(playerCard,computerCard)){

        gameText.textContent = `Player Won Round ${roundNumber++}`
        playerDeck.push(playerCard);
        playerDeck.push(computerCard);

    }else if(isRoundWinner(computerCard,playerCard)){
        gameText.textContent = `Computer Won Round ${roundNumber++}`
        computerDeck.push(computerCard)
        computerDeck.push(playerCard)
    }else{
        gameText.textContent = `Draw Round ${roundNumber++}`
        playerDeck.push(playerCard);
        computerDeck.push(computerCard)
    }

    if(isGameOver(playerDeck)){
        gameText.textContent = 'The Computer Won The Game';
        stop = true;
    }else if(isGameOver(computerDeck)){
        gameText.textContent = 'The Player Won The Game'
        stop = true;
    }

}


function isRoundWinner(cardOne, cardTwo) {
    return CARD_VALUE_MAP[cardOne.value] > CARD_VALUE_MAP[cardTwo.value]; 
}

function isGameOver(deck) {
    return deck.numberOfCards === 0;
}