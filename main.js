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
  //display
  displayCards(player1Hand, player2Hand);

  const player1CardsContainer = document.getElementById("player1Cards");
  // Add event listeners to each card in player1Hand
  player1Hand.forEach((card, idx) => {
    const cardElement = player1CardsContainer.querySelector(`.p1-card-${idx}`);
    cardElement.addEventListener("click", () => {
      //remove the clicked card from p1 array
      player1Hand.splice(idx, 1);
      //add to p2 array
      player2Hand.push(player1Hand[idx]);
      // WHY UNDEFINEDD?
      //display updated
      displayCards(player1Hand, player2Hand);
      console.log(`Clicked player 1 card: ${card}`);
    });
  });
};

const displayCards = (player1Hand, player2Hand) => {
  document.querySelector("#player1Cards").innerHTML = player1Hand
    .map((card, idx) => `<div class='p1-card-${idx} card'>${card}</div>`)
    .join("");
  document.querySelector("#player2Cards").innerHTML = player2Hand
    .map((card, idx) => `<div class='p2-card-${idx} card'>${card}</div>`)
    .join("");
};

const player2DiscardPairs = () => {
  checkForPairs(player2Hand);
};

let pairs = [];
const checkForPairs = (handArray) => {
  // discard the first pair found in handArray
  handArray.reduce((acc, curr) => {
    if (
      handArray.indexOf(curr) !== handArray.lastIndexOf(curr) &&
      pairs.length === 0
    ) {
      pairs.push(curr, curr);
    }
    return acc;
  }, []);
  console.log(`pairs: ${pairs}`);

  if (pairs.length >= 1) {
    console.log("there are pairs");
    document.querySelector("#discardedCards").innerHTML = pairs
      .map((card) => `<div class='card'>${card}</div>`)
      .join("");
    //iterates over player2Hand array in reverse order to avoid index shifting when removing elements. check if current card is included in the pairs array and removes it from player2Hand if yes
    for (let i = player2Hand.length - 1; i >= 0; i--) {
      if (pairs.includes(player2Hand[i])) {
        player2Hand.splice(i, 1);
      }
    }
    console.log(`Updated player 2 hand: ${player2Hand}`);
    //display it
    displayCards(player1Hand, player2Hand);
  } else {
    document.querySelector("#discardedCards").innerHTML =
      "You have no pairs right now";
    console.log("p2 no pairs");
  }
  return pairs;
};

//write logic for computer gameplay
const player1Turn = () => {
  //generate random number for p2 hand array index
  const randomIdx = Math.floor(Math.random() * player2Hand.length);
  //select random card from p2 hand
  const player2CardsContainer = document.getElementById("player2Cards");
  // Add event listeners to each card in player2Hand
  player2Hand.forEach((card, idx) => {
    const randomElement = player2CardsContainer.querySelector(
      `.p2-card-${idx}`
    );
    randomElement.addEventListener("click", () => {
      //remove card

      //???

      console.log(`selected player 2 card: ${card}`);
    });
  });
  //discard pairs if any
  //empty out pairs array
  pairs = [];
  player1Hand.reduce((acc, curr) => {
    if (
      player1Hand.indexOf(curr) !== player1Hand.lastIndexOf(curr) &&
      pairs.length === 0
    ) {
      pairs.push(curr, curr);
    }
    return acc;
  }, []);
  console.log(`pairs: ${pairs}`);

  if (pairs.length >= 1) {
    console.log("there are pairs");
    document.querySelector("#discardedCards").innerHTML = pairs
      .map((card) => `<div class='card'>${card}</div>`)
      .join("");
    for (let i = player1Hand.length - 1; i >= 0; i--) {
      if (pairs.includes(player1Hand[i])) {
        player1Hand.splice(i, 1);
      }
    }
    console.log(`Updated player 1 hand: ${player1Hand}`);
    //display
    displayCards(player1Hand, player2Hand);
  } else {
    document.querySelector("#discardedCards").innerHTML =
      "player 1 has no pairs right now";
    console.log("p1 no pairs");
  }
  //SWITCH TO P2 TURN
  //???
};

//write win logic (when either p1 or p2 hand array .length === 0, trigger win)
const checkforWin = (player1Hand, player2Hand) => {
  if (player1Hand.length === 0) {
    document.querySelector("#player1Cards").innerHTML = "COMPUTER WINS";
  } else if (player2Hand.length === 0) {
    document.querySelector("#player2Cards").innerHTML = "YOU WIN";
  }
};
