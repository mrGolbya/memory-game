import { createCard } from "./components/card.js";
import { playCardFlip } from "./audio.js";

const GAME_BOARD_ID = "game-board";
const PAIRS_COUNT = 8;
const FLIP_DELAY = 700;

let cardImages = [];
let currentLayout = [];

let openCards = [];
let matchedPairs = 0;
let isLocked = false;

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

  board.replaceChildren();

  const doubledImages = [...cardImages, ...cardImages];
  currentLayout = shuffle(doubledImages);

  const cards = currentLayout.map((_, index) => createCard(index));
  board.append(...cards);

  openCards = [];
  matchedPairs = 0;
  isLocked = false;
}

export function setupCardFlip() {
  const board = document.getElementById(GAME_BOARD_ID);
  if (!board) return;

  board.addEventListener("click", (event) => {
    const card = event.target.closest(".card");
    if (card) flipCard(card);
  });
}

function flipCard(card) {
  if (isLocked) return;
  if (card.classList.contains("card--flipped")) return;

  card.classList.add("card--flipped");
  revealCard(card);
  playCardFlip();

  openCards.push(card);

  if (openCards.length < 2) return;

  isLocked = true;
  const [firstCard, secondCard] = openCards;
  openCards = [];

  const firstImage = firstCard.querySelector(".card__back").dataset.image;
  const secondImage = secondCard.querySelector(".card__back").dataset.image;

  if (firstImage === secondImage) {
  matchedPairs += 1;
  isLocked = false;
    } else {
  setTimeout(() => {
    playCardFlip();// ← добавить: звук при закрытии
    [firstCard, secondCard].forEach((c) => {
      c.classList.remove("card--flipped");
      hideCard(c);
    });
    isLocked = false;
  }, FLIP_DELAY);
}
}

function revealCard(card) {
  const index = Number(card.dataset.index);
  const imageSrc = currentLayout[index];
  const cardBack = card.querySelector(".card__back");

  cardBack.style.setProperty("--card-image", `url("${imageSrc}")`);
  cardBack.dataset.image = imageSrc;
}

function hideCard(card) {
  const cardBack = card.querySelector(".card__back");

  cardBack.style.removeProperty("--card-image");
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