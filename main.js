let player1Hand = [];
let player2Hand = [];
let discardPile = [];
let pairs = [];
const MODE_START_GAME = "MODE_START_GAME";
const MODE_P2_TURN = "MODE_P2_TURN";
const MODE_P1_TURN = "MODE_P1_TURN";
let gameState = MODE_START_GAME;

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
const main = () => {
  gameState = MODE_START_GAME;
  player1Hand = [];
  player2Hand = [];
  pairs = [];
  dealCards();
  gameState = MODE_P2_TURN;
  if (gameState === MODE_P2_TURN) {
    const player1CardsContainer = document.getElementById("player1Cards");
    // Add event listeners to each card in player1Hand
    player1Hand.forEach((card, idx) => {
      const cardElement = player1CardsContainer.querySelector(
        `.p1-card-${idx}`
      );
      cardElement.addEventListener("click", () => {
        const clickedCard = player1Hand[idx]; // Store the clicked card
        player1Hand.splice(idx, 1);
        player2Hand.push(clickedCard); // Push the stored card to player2Hand
        displayCards(player1Hand, player2Hand);
        console.log(`Clicked player 1 card: ${clickedCard}`);
      });
    });
  }
};

const player2DiscardPairs = () => {
  gameState = MODE_P2_TURN;
  checkForPairs(player2Hand);
  if (player2Hand.length === 0) {
    console.log("checked for p2 win");
    checkforWin(player1Hand, player2Hand);
  } else gameState = MODE_P1_TURN;
};

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
};

const p2ChooseCard = () => {
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
      //display
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

const checkForPairs = (handArray) => {
  pairs = [];
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
  gameState = MODE_P1_TURN;
  const randomIdx = Math.floor(Math.random() * player2Hand.length);
  const selectedCard = player2Hand[randomIdx];

  player2Hand.splice(randomIdx, 1);
  player1Hand.push(selectedCard);

  displayCards(player1Hand, player2Hand);
  console.log(`selected p2 card: ${selectedCard}`);

  // Check for pairs in the updated player1Hand array
  const pairs = [];
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

    // Remove pairs from player1Hand
    pairs.forEach((pair) => {
      const pairIndex = player1Hand.indexOf(pair);
      player1Hand.splice(pairIndex, 1);
    });

    console.log(`Updated player 1 hand: ${player1Hand}`);
    displayCards(player1Hand, player2Hand);
  } else {
    document.querySelector("#discardedCards").innerHTML =
      "player 1 has no pairs right now";
    console.log("p1 no pairs");
  }

  if (player1Hand.length === 0) {
    console.log("checked for comp win");
    checkforWin(player1Hand, player2Hand);
  } else {
    gameState = MODE_P2_TURN;
  }
};

const checkforWin = (player1Hand, player2Hand) => {
  if (player1Hand.length === 0) {
    document.querySelector("#player1Cards").innerHTML = "COMPUTER WINS";
  } else if (player2Hand.length === 0) {
    document.querySelector("#player2Cards").innerHTML = "YOU WIN";
  }
};
