import { createElement } from "../dom.js";

export function createCard(index) {
  const card = createElement("button", "card");
  card.type = "button";
  card.dataset.index = String(index);
  card.setAttribute("aria-label", "Карточка");

  const cardInner = createElement("div", "card__inner");

  const cardFront = createElement("div", "card__front");
  cardFront.setAttribute("aria-hidden", "true");
  cardFront.textContent = "?";

  const cardBack = createElement("div", "card__back");

  cardInner.append(cardFront, cardBack);
  card.append(cardInner);

  return card;
}