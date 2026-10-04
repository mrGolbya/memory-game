import { createCard } from "./components/card.js";
import { playCardFlip } from "./audio.js";
import { openVictoryPopup } from "./components/popup.js";
import { addResult } from "./storage.js";

const GAME_BOARD_ID = "game-board";
const MOVES_COUNTER_ID = "moves-counter";
const PAIRS_COUNTER_ID = "pairs-counter";
const PAIRS_COUNT = 8;
const FLIP_DELAY = 700;
const PEEK_DURATION = 2000;

let cardImages = [];
let currentLayout = [];

let openCards = [];
let matchedPairs = 0;
let moves = 0;
let isLocked = false;

let closeTimeoutId = null;
let peekTimeoutId = null;

export async function loadCardImages() {
  const response = await fetch("./assets/images.json");
  if (!response.ok) {
    throw new Error(`Не удалось загрузить images.json: ${response.status}`);
  }

  const data = await response.json();
  cardImages = data.slice(0, PAIRS_COUNT).map((item) => item.img);
}

export function renderBoard() {
  const board = document.getElementById(GAME_BOARD_ID);
  if (!board) return;

  cancelPendingTimers();

  board.replaceChildren();

  const doubledImages = [...cardImages, ...cardImages];
  currentLayout = shuffle(doubledImages);

  const cards = currentLayout.map((_, index) => createCard(index));
  board.append(...cards);

  openCards = [];
  matchedPairs = 0;
  moves = 0;
  isLocked = false;

  renderCounters();
  peekAllCards();
}

export function setupCardFlip() {
  const board = document.getElementById(GAME_BOARD_ID);
  if (!board) return;

  board.addEventListener("click", (event) => {
    const card = event.target.closest(".card");
    if (card) flipCard(card);
  });
}

export function peekAllCards(duration = PEEK_DURATION) {
  const board = document.getElementById(GAME_BOARD_ID);
  if (!board) return;

  const cards = board.querySelectorAll(".card");
  if (!cards.length) return;

  isLocked = true;

  cards.forEach((card) => {
    card.classList.add("card--flipped");
    revealCard(card);
  });

  playCardFlip();

  peekTimeoutId = setTimeout(() => {
    peekTimeoutId = null;

    cards.forEach((card) => {
      card.classList.remove("card--flipped");
      hideCard(card);
    });
    isLocked = false;
  }, duration);
}

function flipCard(card) {
  if (isLocked) return;
  if (card.classList.contains("card--flipped")) return;

  card.classList.add("card--flipped");
  revealCard(card);
  playCardFlip();

  openCards.push(card);

  if (openCards.length < 2) return;

  moves += 1;
  renderCounters();

  isLocked = true;
  const [firstCard, secondCard] = openCards;
  openCards = [];

  const firstImage = firstCard.querySelector(".card__back").dataset.image;
  const secondImage = secondCard.querySelector(".card__back").dataset.image;

  if (firstImage === secondImage) {
    matchedPairs += 1;
    renderCounters();

    if (matchedPairs === PAIRS_COUNT) {
      closeTimeoutId = setTimeout(() => {
        closeTimeoutId = null;
        addResult(moves);
        openVictoryPopup(moves, renderBoard);
      }, FLIP_DELAY);
    } else {
      isLocked = false;
    }
  } else {
    closeTimeoutId = setTimeout(() => {
      closeTimeoutId = null;

      playCardFlip();
      [firstCard, secondCard].forEach((c) => {
        c.classList.remove("card--flipped");
        hideCard(c);
      });
      isLocked = false;
    }, FLIP_DELAY);
  }
}

function cancelPendingTimers() {
  if (closeTimeoutId !== null) {
    clearTimeout(closeTimeoutId);
    closeTimeoutId = null;
  }

  if (peekTimeoutId !== null) {
    clearTimeout(peekTimeoutId);
    peekTimeoutId = null;
  }
}

function renderCounters() {
  const movesEl = document.getElementById(MOVES_COUNTER_ID);
  const pairsEl = document.getElementById(PAIRS_COUNTER_ID);

  if (movesEl) movesEl.textContent = String(moves);
  if (pairsEl) pairsEl.textContent = `${matchedPairs} из ${PAIRS_COUNT}`;
}

function revealCard(card) {
  const index = Number(card.dataset.index);
  const imageSrc = currentLayout[index];
  const cardBack = card.querySelector(".card__back");

  cardBack.style.backgroundImage = `url("${imageSrc}")`;
  cardBack.dataset.image = imageSrc;
}

function hideCard(card) {
  const cardBack = card.querySelector(".card__back");

  cardBack.style.backgroundImage = "";
  delete cardBack.dataset.image;
}

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}