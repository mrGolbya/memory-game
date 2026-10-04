import { createElement } from "../dom.js";
import { createButton, createThemeToggle } from "../ui-helpers.js";
import { toggleTheme } from "../theme.js";
import {
  playButtonClick,
  toggleBackgroundMusic,
  isBackgroundMusicPlaying,
} from "../audio.js";

export function createHeader() {
  const header = createElement("header", "header");
  const container = createElement("div", "container header__container");

  const heading = createElement("h1", "header__title", "Memory Game");
  const actions = createElement("div", "header__actions");

  const newGameButton = createButton("new-game-button", "Новая игра", "header__button");
  const leaderboardButton = createButton("leaderboard-button", "Таблица лидеров", "header__button");
  const soundButton = createButton("sound-button", "Звук", "header__button sound-button");

  const themeToggle = createThemeToggle();

  // Обработчики
  soundButton.addEventListener("click", () => {
    playButtonClick();
    toggleBackgroundMusic();
    updateSoundButtonState(soundButton);
  });

  themeToggle.addEventListener("click", toggleTheme);

  actions.append(newGameButton, leaderboardButton, soundButton, themeToggle);
  container.append(heading, actions);
  header.append(container);

  return header;
}

function updateSoundButtonState(button) {
  const isPlaying = isBackgroundMusicPlaying();
  button.classList.toggle("sound-button--active", isPlaying);
  button.setAttribute("aria-pressed", String(isPlaying));
}