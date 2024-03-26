// /*----- constants -----*/
// const deck = [
// "a",
// "a",
// "b",
// "b",
// "c",
// "c",
// "d",
// "d",
// "e",
// "e",
// "f",
// "f",
// "g",
// "g",
// "h",
// "h",
// "i",
// "i",
// "j",
// "j",
// "lone",
// ];

// /*----- state variables -----*/
// const computerHand = [];
// const playerHand = [];
// const discardPile = [];
// const gameCounter = 0;
// const winCounter = 0;
// const GAMESTATE = "START GAME";

// /*----- cached elements  -----*/

// /*----- event listeners -----*/

// /*----- functions -----*/

// // https://www.programiz.com/javascript/examples/shuffle-card for card shuffling and display function
// // shuffle the cards
// const shuffleDeck = () => {
//   for (let i = deck.length - 1; i > 0; i--) {
//     let j = Math.floor(Math.random() * i);
//     let temp = deck[i];
//     deck[i] = deck[j];
//     deck[j] = temp;
//   }
//   return deck.join(", ");
// };

// // display card results
// const dealCards = () => {
//   for (let i = 0; i < 10; i++) {
//     playerHand.push(deck[i]);
//     console.log(`Player 1's Hand: ${playerHand.join(", ")}`);
//   }
// };

// const main = () => {
//   shuffleDeck();
//   dealCards();
// };

const cards = [
  "a",
  "a",
  "b",
  "b",
  "c",
  "c",
  "d",
  "d",
  "e",
  "e",
  "f",
  "f",
  "g",
  "g",
  "h",
  "h",
  "i",
  "i",
  "j",
  "j",
  "lone",
];

const shuffleDeck = () => {
  let currentIndex = cards.length,
    tempValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    tempValue = cards[currentIndex];
    cards[currentIndex] = cards[randomIndex];
    cards[randomIndex] = tempValue;
  }
};
let player1 = [];
let player2 = [];

function dealCards() {
  for (let i = 0; i < cards.length; i += 2) {
    player1.push(cards[i]);
    player2.push(cards[i + 1]);
  }
  return [player1, player2];
}

const startGame = () => {
  shuffleDeck();
  let players = dealCards();
  player1 = players[0];
  player2 = players[1];
  document.querySelector(
    "#p1-cards"
  ).innerHTML = `Player 1 hand: ${player1.join(", ")}`;
  document.querySelector(
    "#p2-cards"
  ).innerHTML = `Player 2 hand: ${player2.join(", ")}`;
  console.log("Player 1's Hand: " + player1.join(", "));
  console.log("Player 2's Hand: " + player2.join(", "));
};

const startButton = document.querySelector("#startButton");
startButton.addEventListener("click", startGame);

// function checkForMatch(playerHand) {
//   for (let i = 0; i < playerHand.length; i++) {
//     if (playerHand[i] === "O") {
//       let matchIndex = playerHand.findIndex(card => card !== "O" && card.charAt(0) === playerHand[i].charAt(0));

//       if (matchIndex !== -1) {
//         let matchCard = playerHand[matchIndex];
//         console.log("Player has a match with cards: " + playerHand[i] + " and " + matchCard);

//         playerHand.splice(i, 1);
//         playerHand.splice(matchIndex, 1);

//         return true;
//       }
//     }
//   }
//   return false;
// }

const checkForMatch = (arr) => {
  for (i = 0; i < arr.length; i++) {
    for (j = 0; j < arr.length; j++) {
      if (arr[i] === arr[j]) {
        console.log(`pairs: ${arr[i]}, ${arr[j]}`);
        arr.pop(arr[i]);
        arr.pop(arr[j]);
        return arr;
      }
    }
  }
};

let player1HasMatch = checkForMatch(player1);
console.log(player1HasMatch);
// let player2HasMatch = checkForMatch(player2Hand);
