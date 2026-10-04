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

  const list = createElement("ol", "popup__list");

  results.forEach((moves, index) => {
    const item = createElement(
      "li",
      "popup__list-item",
      `${index + 1}. ${moves} ходов`
    );
    list.append(item);
  });

  openPopup("Таблица лидеров", [list]);
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