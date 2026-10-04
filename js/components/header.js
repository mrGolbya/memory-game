import { createElement } from "../dom.js";
import { createButton } from "../ui-helpers.js";

export function createHeader() {
  const header = createElement("header", "header");
  const container = createElement("div", "header__container");

  const heading = createElement("h1", "header__title", "Memory Game");
  const actions = createElement("div", "header__actions");

  const newGameButton = createButton("new-game-button", "Новая игра", "header__button");
  const leaderboardButton = createButton("leaderboard-button", "Таблица лидеров", "header__button");
  const soundButton = createButton("sound-button", "Звук", "header__button sound-button");

  actions.append(newGameButton, leaderboardButton, soundButton);
  container.append(heading, actions);
  header.append(container);

  return header;
}