import { createCard } from "./components/card.js";

const GAME_BOARD_ID = "game-board";
const PAIRS_COUNT = 8;

let cardImages = [];
let currentLayout = [];


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
}

export function revealCard(card) {
  const index = Number(card.dataset.index);
  const imageSrc = currentLayout[index];
  const cardBack = card.querySelector(".card__back");

  cardBack.style.setProperty("--card-image", `url("${imageSrc}")`);
  cardBack.dataset.image = imageSrc;
}

export function hideCard(card) {
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