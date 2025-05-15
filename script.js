// Lista de emojis duplicados (pares)
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

// Variáveis do jogo
let shuffledCards = [];
let firstCard = null;
let secondCard = null;
let lock = false;
let matches = 0;

// Elementos da interface
const gameBoard = document.getElementById("gameBoard");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");

// Embaralha os elementos do array de forma aleatória.
// A função `sort()` normalmente ordena os elementos com base no retorno de uma função de comparação:
//   - Retorno negativo: a vem antes de b
//   - Retorno positivo: b vem antes de a
//   - Retorno 0: mantém a ordem
//
// Ao usar `() => 0.5 - Math.random()`, criamos uma função que retorna valores aleatórios positivos ou negativos.
// Isso faz com que os pares de elementos tenham sua ordem trocada aleatoriamente, simulando um embaralhamento.
// Exemplo:
//   Math.random() pode gerar 0.8 → 0.5 - 0.8 = -0.3 → não troca
//   Math.random() pode gerar 0.2 → 0.5 - 0.2 = 0.3 → troca

function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

// Cria o tabuleiro do jogo
function createBoard() {
  shuffledCards = shuffle([...cards]); // copia e embaralha os emojis
  gameBoard.innerHTML = ""; // limpa o tabuleiro

  shuffledCards.forEach((symbol, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.index = index;
    card.dataset.symbol = symbol;
    card.addEventListener("click", handleCardClick);
    gameBoard.appendChild(card);
  });
}

// Trata o clique nas cartas
function handleCardClick(event) {
  if (lock) return;

  const clicked = event.currentTarget;

  // Ignora se a carta já estiver revelada ou combinada
  if (
    clicked.classList.contains("revealed") ||
    clicked.classList.contains("matched")
  )
    return;

  // Revela a carta
  clicked.textContent = clicked.dataset.symbol;
  clicked.classList.add("revealed");

  // Se for a primeira carta
  if (!firstCard) {
    firstCard = clicked;
  }
  // Se for a segunda carta
  else if (!secondCard && clicked !== firstCard) {
    secondCard = clicked;
    checkMatch();
  }
}

// Verifica se as duas cartas são iguais
function checkMatch() {
  const symbol1 = firstCard.dataset.symbol;
  const symbol2 = secondCard.dataset.symbol;

  // Se forem iguais
  if (symbol1 === symbol2) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    matches += 1;
    resetTurn();

    // Se acabou o jogo
    if (matches === cards.length / 2) {
      statusText.textContent = "🎉 Você encontrou todos os pares!";
    }
  } else {
    // Se forem diferentes, esconde depois de 1 segundo
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

// Limpa o turno atual
function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lock = false;
}

// Reinicia todo o jogo
function restartGame() {
  matches = 0;
  statusText.textContent = "Encontre todos os pares!";
  createBoard();
}

// Botão de reinício
restartBtn.addEventListener("click", restartGame);

// Inicializa o jogo
createBoard();
