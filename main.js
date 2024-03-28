let player1Hand = [];
let player2Hand = [];
let discardPile = [];
let theresPairs = false;
const cards = [
  "card1",
  "card1",
  "card2",
  "card2",
  "card3",
  "card3",
  "card4",
  "card4",
  "card5",
  "card5",
  "oldMaid",
];

//shuffle deck function
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

//called the function in HTML upon clicking START
const dealCards = () => {
  //shuffle the deck
  const shuffledCards = shuffle(cards);
  //get first half of deck + 1 extra card
  player1Hand = shuffledCards.slice(0, 6);
  //get second half of deck
  player2Hand = shuffledCards.slice(6, 11);
  //display it
  document.querySelector("#player1Cards").innerHTML = player1Hand
    .map((card) => `<div class='card'>${card}</div>`)
    .join("");
  document.querySelector("#player2Cards").innerHTML = player2Hand
    .map((card) => `<div class='card'>${card}</div>`)
    .join("");
};

const player2DiscardPairs = () => {
  checkForPairs(player2Hand);
};

//check if theres pairs
const checkForPairs = (handArray) => {
  let pairs = handArray.reduce((acc, curr) => {
    if (handArray.indexOf(curr) !== handArray.lastIndexOf(curr)) {
      acc.push(curr);
    }
    return acc;
  }, []);

  console.log(`pairs: ${pairs}`);

  if (pairs.length >= 1) {
    theresPairs = true;
    console.log("there are pairs");
    document.querySelector("#discardedCards").innerHTML = pairs
      .map((card) => `<div class='card'>${card}</div>`)
      .join("");
    //update player2Hand without discarded pairs
    player2Hand = player2Hand.filter((card) => !pairs.includes(card));
    console.log(`Updated player 2 hand: ${player2Hand}`);
    document.querySelector("#player2Cards").innerHTML = player2Hand
      .map((card) => `<div class='card'>${card}</div>`)
      .join("");
  } else {
    document.querySelector("#discardedCards").innerHTML =
      "You have no pairs right now";
    console.log("no pairs");
  }
  return pairs;
};
