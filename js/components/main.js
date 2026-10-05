import { createElement } from "../dom.js";
import { createStat } from "../ui-helpers.js";

export function createMain() {
  const main = createElement("main", "main");
  const container = createElement("div", "container main__container");

  const stats = createElement("div", "stats");
  stats.append(
    createStat("moves-counter", "moves"),
    createStat("pairs-counter", "Pairs found")
  );

  const gameBoard = createElement("div", "game-board");
  gameBoard.id = "game-board";

  container.append(stats, gameBoard);
  main.append(container);

  return main;
}