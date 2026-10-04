import { createElement } from "../dom.js";
import { createButton, createSoundButton, createThemeToggle } from "../ui-helpers.js";
import { toggleTheme } from "../theme.js";
import { playButtonClick, toggleBackgroundMusic, isBackgroundMusicPlaying } from "../audio.js";
import { renderBoard } from "../game.js";

export function createHeader() {
  const header = createElement("header", "header");
  const container = createElement("div", "container header__container");

  const heading = createElement("h1", "header__title", "Memory Game");
  const actions = createElement("div", "header__actions");

  const newGameButton = createButton("new-game-button", "Новая игра", "header__button");
  const leaderboardButton = createButton("leaderboard-button", "Таблица лидеров", "header__button");
  const soundButton = createSoundButton();
  const themeToggle = createThemeToggle();

  newGameButton.addEventListener("click", () => {
    playButtonClick();
    renderBoard();
  });

  leaderboardButton.addEventListener("click", () => {
    playButtonClick();
    // TODO: открыть попап с таблицей лидеров
  });

  soundButton.addEventListener("click", () => {
    playButtonClick();
    toggleBackgroundMusic();
    updateSoundButton(soundButton);
  });

  themeToggle.addEventListener("click", () => {
    playButtonClick();
    toggleTheme();
  });

  actions.append(newGameButton, leaderboardButton, soundButton, themeToggle);
  container.append(heading, actions);
  header.append(container);

  return header;
}

function updateSoundButton(button) {
  const isPlaying = isBackgroundMusicPlaying();
  const bars = button.querySelectorAll(".sound-button__bar");

  bars.forEach((bar) => {
    bar.classList.toggle("paused", !isPlaying);
  });

  button.setAttribute("aria-pressed", String(isPlaying));
}