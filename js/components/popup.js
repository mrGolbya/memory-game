import { createElement } from "../dom.js";

let currentPopup = null;

export function openVictoryPopup(moves) {
  const text = createElement("p", "popup__text", `Тебе потребовалось ${moves} ходов`);
  openPopup("Поздравляю!", [text]);
}

export function openLeaderboardPopup(results) {
  if (!results.length) {
    const empty = createElement("p", "popup__text", "Пока нет результатов");
    openPopup("Таблица лидеров", [empty]);
    return;
  }

  const leaderboard = buildLeaderboard(results);
  openPopup("Таблица лидеров", [leaderboard]);
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

export function openPopup(title, bodyNodes = []) {
  if (currentPopup) closePopup();

  const overlay = createElement("div", "popup popup--open");
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");

  const container = createElement("div", "popup__container");
  const titleEl = createElement("h2", "popup__title", title);

  const bodyEl = createElement("div", "popup__body");
  bodyNodes.forEach((node) => bodyEl.append(node));

  const closeButton = createElement("button", "popup__close");
  closeButton.type = "button";
  closeButton.setAttribute("aria-label", "Закрыть");
  closeButton.textContent = "×";

  container.append(titleEl, bodyEl, closeButton);
  overlay.append(container);

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) closePopup();
  });

  closeButton.addEventListener("click", closePopup);

  document.body.append(overlay);
  currentPopup = overlay;

  return overlay;
}

export function closePopup() {
  if (!currentPopup) return;
  currentPopup.remove();
  currentPopup = null;
}