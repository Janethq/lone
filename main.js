let player1Hand = [];
let player2Hand = [];
let discardPile = [];
let pairs = [];
const MODE_START_GAME = "MODE_START_GAME";
const MODE_P2_TURN = "MODE_P2_TURN";
const MODE_P1_TURN = "MODE_P1_TURN";
let gameState = MODE_START_GAME;

document.querySelector("#message").innerHTML = "Click Start to play.";

let cards = [
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
  "card6",
  "card6",
  "card7",
  "card7",
  "oldMaid",
];

let selectedCards = [];

const checkEndGameCondition = () => {
  return (
    (player1Hand.length === 0 && player2Hand.length === 1) ||
    (player2Hand.length === 0 && player1Hand.length === 1)
  );
};

document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();
  const selectedNumCards = document.querySelector("#numCards").value;
  console.log(selectedNumCards);
  selectedCards = cards.slice(0, selectedNumCards - 1);
  selectedCards.push("oldMaid");

  console.log(selectedCards);
});

const cardImages = {
  card1: "./bird-card.png",
  card2: "./elephant-card.png",
  card3: "./rabbit-card.png",
  card4: "./tiger-card.png",
  card5: "./zebra-card.png",
  card6: "./pig-card.png",
  card7: "./giraffe-card.png",
  oldMaid: "./lone-card.png",
};

const coveredCard = {
  cardBack: "./card-back.png",
};

const startButton = document.getElementById("start-button");
const discardButton = document.getElementById("discard-button");
const doneButton = document.getElementById("end-turn-button");

startButton.disabled = false;
discardButton.disabled = true;
doneButton.disabled = true;

const main = () => {
  gameState = MODE_START_GAME;
  startButton.disabled = true;
  discardButton.disabled = true;
  doneButton.disabled = true;
  player1Hand = [];
  player2Hand = [];
  pairs = [];
  dealCards();
  document.querySelector("#discardedCards").innerHTML = "";
  gameState = MODE_P2_TURN;
  if (gameState === MODE_P2_TURN) {
    player1Hand = shuffle(player1Hand);
    document.querySelector("#message").innerHTML =
      "Select a card from your opponent.";
    const player1CardsContainer = document.getElementById("player1Cards");
    player1Hand.forEach((card, idx) => {
      const cardElement = player1CardsContainer.querySelector(
        `.p1-card-${idx}`
      );
      cardElement.addEventListener("click", () => {
        const clickedCard = player1Hand[idx];
        player1Hand.splice(idx, 1);
        player2Hand.push(clickedCard);
        displayCards(player1Hand, player2Hand);
        document.querySelector("#message").innerHTML =
          "Discard the pair if you have one. Otherwise, select 'Done'.";
        startButton.disabled = true;
        discardButton.disabled = false;
        doneButton.disabled = false;
        console.log(`Clicked player 1 card: ${clickedCard}`);
      });
    });
  }
};

const player2DiscardPairs = () => {
  console.log("player2 discard pairs");
  checkForPairs(player2Hand);
  document.querySelector("#message").innerHTML =
    "Your turn is over, select 'done'.";
  startButton.disabled = true;
  discardButton.disabled = false;
  doneButton.disabled = false;
  console.log(player2Hand.length);
  if (checkEndGameCondition()) {
    console.log("checked for p2 win");
    checkforWin(player1Hand, player2Hand);
  } else gameState = MODE_P1_TURN;
};

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const dealCards = () => {
  const shuffledCards = shuffle(selectedCards);
  const numCardsPerPlayer = shuffledCards.length / 2;
  player1Hand = shuffledCards.slice(0, numCardsPerPlayer);
  player2Hand = shuffledCards.slice(numCardsPerPlayer);
  displayCards(player1Hand, player2Hand);
};

const p2ChooseCard = () => {
  const player1CardsContainer = document.getElementById("player1Cards");
  player1Hand.forEach((card, idx) => {
    const cardElement = player1CardsContainer.querySelector(`.p1-card-${idx}`);
    cardElement.addEventListener("click", () => {
      player1Hand.splice(idx, 1);
      player2Hand.push(player1Hand[idx]);
      displayCards(player1Hand, player2Hand);
      console.log(`Clicked player 1 card: ${card}`);
    });
  });
};

const displayCards = (player1Hand, player2Hand) => {
  document.querySelector("#player1Cards").innerHTML = player1Hand
    .map(
      (card, idx) =>
        `<img class='p1-card-${idx} card-image' src=${coveredCard.cardBack} alt='${coveredCard.cardBack}'>`
    )
    .join(" ");

  document.querySelector("#player2Cards").innerHTML = player2Hand
    .map(
      (card, idx) =>
        `<img class='p2-card-${idx} card-image' src='${cardImages[card]}' alt='${card}'>`
    )
    .join(" ");
};

const checkForPairs = (handArray) => {
  pairs = [];
  handArray.reduce((acc, curr) => {
    if (
      handArray.indexOf(curr) !== handArray.lastIndexOf(curr) &&
      pairs.length === 0
    ) {
      pairs.push(curr, curr);
    }
    return acc;
  }, []);

  if (pairs.length >= 1) {
    document.querySelector("#discardedCards").innerHTML = pairs
      .map(
        (card) =>
          `<img class='pair-card card-image' src='${cardImages[card]}' alt='${card}'>`
      )
      .join(" ");

    for (let i = player2Hand.length - 1; i >= 0; i--) {
      if (pairs.includes(player2Hand[i])) {
        player2Hand.splice(i, 1);
      }
    }
    displayCards(player1Hand, player2Hand);
  } else {
    discardButton.disabled = true;
    document.querySelector("#discardedCards").innerHTML =
      "You have no pairs right now. Click 'Done' instead.";
  }

  return pairs;
};

const player1Turn = () => {
  gameState = MODE_P1_TURN;
  const randomIdx = Math.floor(Math.random() * player2Hand.length);
  const selectedCard = player2Hand[randomIdx];

  player2Hand.splice(randomIdx, 1);
  player1Hand.push(selectedCard);

  displayCards(player1Hand, player2Hand);
  console.log(`selected p2 card: ${selectedCard}`);

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

  if (pairs.length >= 1) {
    document.querySelector("#discardedCards").innerHTML = pairs
      .map(
        (card) =>
          `<img class='pair-card card-image' src='${cardImages[card]}' alt='${card}'>`
      )
      .join(" ");

    for (let i = player1Hand.length - 1; i >= 0; i--) {
      if (pairs.includes(player1Hand[i])) {
        player1Hand.splice(i, 1);
      }
    }

    displayCards(player1Hand, player2Hand);
  } else {
    document.querySelector("#discardedCards").innerHTML =
      "Computer has no pairs right now";
  }
  console.log(player1Hand.length);
  if (checkEndGameCondition()) {
    console.log("checked for comp win");
    checkforWin(player1Hand, player2Hand);
  } else {
    gameState = MODE_P2_TURN;
    if (gameState === MODE_P2_TURN) {
      player1Hand = shuffle(player1Hand);
      document.querySelector("#message").innerHTML =
        "Select a card from your opponent.";
      player1CardsContainer = document.getElementById("player1Cards");
      player1Hand.forEach((card, idx) => {
        cardElement = player1CardsContainer.querySelector(`.p1-card-${idx}`);
        cardElement.addEventListener("click", () => {
          clickedCard = player1Hand[idx];
          player1Hand.splice(idx, 1);
          player2Hand.push(clickedCard);
          document.querySelector("#message").innerHTML =
            "Discard the pair if you have one. Otherwise, select 'Done'.";
          displayCards(player1Hand, player2Hand);
          console.log(`Clicked player 1 card: ${clickedCard}`);
        });
      });
    }
  }
};

const checkforWin = (player1Hand, player2Hand) => {
  console.log("checkforwin is running");
  console.log(player1Hand.length, player2Hand.length);
  if (player1Hand.length === 0 || player2Hand.length === 1) {
    startButton.disabled = false;
    discardButton.disabled = true;
    doneButton.disabled = true;
    document.querySelector("#message").innerHTML =
      "YOU LOST! Click start to play again.";
  } else if (player2Hand.length === 0) {
    startButton.disabled = false;
    discardButton.disabled = true;
    doneButton.disabled = true;
    const test = document.querySelector("#player1Cards");
    console.log(test);
    document.querySelector("#player1Cards").innerHTML = player1Hand
      .map(
        (card, idx) =>
          `<img class='p1-card-${idx} card-image' src=${cardImages[card]}>`
      )
      .join(" ");
    document.querySelector("#message").innerHTML =
      "YOU WIN! Click start to play again.";
  }
};
