const cards = [
  "🍕",
  "🍕",
  "🎮",
  "🎮",
  "🐶",
  "🐶",
  "🚀",
  "🚀",
  "🎲",
  "🎲",
  "🎧",
  "🎧",
  "📱",
  "📱",
  "🍩",
  "🍩",
];
let shuffledCards = [];
let firstCard = null;
let secondCard = null;
let lock = false;
let matches = 0;

const gameBoard = document.getElementById("gameBoard");
const statusText = document.getElementById("status");

function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

function createBoard() {
  shuffledCards = shuffle(cards);
  gameBoard.innerHTML = "";
  shuffledCards.forEach((symbol, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.index = index;
    card.dataset.symbol = symbol;
    card.addEventListener("click", handleCardClick);
    gameBoard.appendChild(card);
  });
}

function handleCardClick(event) {
  if (lock) return;

  const clicked = event.currentTarget;
  if (
    clicked.classList.contains("revealed") ||
    clicked.classList.contains("matched")
  )
    return;

  clicked.textContent = clicked.dataset.symbol;
  clicked.classList.add("revealed");

  if (!firstCard) {
    firstCard = clicked;
  } else if (!secondCard && clicked !== firstCard) {
    secondCard = clicked;
    checkMatch();
  }
}

function checkMatch() {
  const symbol1 = firstCard.dataset.symbol;
  const symbol2 = secondCard.dataset.symbol;

  if (symbol1 === symbol2) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    matches += 1;
    resetTurn();

    if (matches === cards.length / 2) {
      statusText.textContent = "🎉 Você encontrou todos os pares!";
    }
  } else {
    lock = true;
    setTimeout(() => {
      firstCard.textContent = "";
      secondCard.textContent = "";
      firstCard.classList.remove("revealed");
      secondCard.classList.remove("revealed");
      resetTurn();
    }, 1000);
  }
}

function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lock = false;
}

createBoard();
