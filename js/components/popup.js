import { createElement } from "../dom.js";
import { playButtonClick } from "../audio.js";

let currentPopup = null;
let onCloseCallback = null;

export function openVictoryPopup(moves, onNewGame) {
  const text = createElement("p", "popup__text", `Тебе потребовалось ${moves} ходов`);

  const newGameButton = createElement("button", "button popup__button", "Новая игра");
  newGameButton.type = "button";
  newGameButton.addEventListener("click", () => {
    playButtonClick();
    closePopup();
    onNewGame();
  });

  const closeButton = createElement("button", "button button--ghost popup__button", "Закрыть");
  closeButton.type = "button";
  closeButton.addEventListener("click", () => {
    playButtonClick();
    closePopup();
  });

  openPopup("Поздравляю!", [text], [newGameButton, closeButton]);
}

export function openLeaderboardPopup(results) {
  const closeButton = createElement("button", "button button--ghost popup__button", "Закрыть");
  closeButton.type = "button";
  closeButton.addEventListener("click", () => {
    playButtonClick();
    closePopup();
  });

  if (!results.length) {
    const empty = createElement("p", "popup__text", "Пока нет результатов");
    openPopup("Таблица лидеров", [empty], [closeButton]);
    return;
  }

  const leaderboard = buildLeaderboard(results);
  openPopup("Таблица лидеров", [leaderboard], [closeButton]);
}

function buildLeaderboard(results) {
  const container = createElement("div", "leaderboard");

  const headerRow = createElement("div", "leaderboard__row leaderboard__row--head");
  headerRow.append(
    createElement("span", "leaderboard__cell", "Место"),
    createElement("span", "leaderboard__cell", "Ходы"),
    createElement("span", "leaderboard__cell", "Дата")
  );

  container.append(headerRow);

  results.forEach((result, index) => {
    const row = createElement("div", "leaderboard__row");
    row.append(
      createElement("span", "leaderboard__cell", String(index + 1)),
      createElement("span", "leaderboard__cell", String(result.moves)),
      createElement("span", "leaderboard__cell", formatDate(result.date))
    );
    container.append(row);
  });

  return container;
}

function formatDate(isoString) {
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

export function openPopup(title, bodyNodes = [], actions = []) {
  if (currentPopup) closePopup();

  const overlay = createElement("div", "popup popup--open");
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");

  const container = createElement("div", "popup__container");
  const titleEl = createElement("h2", "popup__title", title);

  const bodyEl = createElement("div", "popup__body");
  bodyNodes.forEach((node) => bodyEl.append(node));

  container.append(titleEl, bodyEl);

  if (actions.length) {
    const actionsEl = createElement("div", "popup__actions");
    actions.forEach((action) => actionsEl.append(action));
    container.append(actionsEl);
  }

  overlay.append(container);

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) closePopup();
  });

  document.body.append(overlay);
  currentPopup = overlay;

  document.documentElement.classList.add("modal-open");
  document.addEventListener("keydown", handleEscape);

  return overlay;
}

export function closePopup() {
  if (!currentPopup) return;

  currentPopup.remove();
  currentPopup = null;

  document.documentElement.classList.remove("modal-open");
  document.removeEventListener("keydown", handleEscape);

  if (onCloseCallback) {
    const cb = onCloseCallback;
    onCloseCallback = null;
    cb();
  }
}

function handleEscape(event) {
  if (event.key === "Escape") {
    closePopup();
  }
}

export function setOnClose(callback) {
  onCloseCallback = callback;
}