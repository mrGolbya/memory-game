import { createElement } from "./dom.js";

// Кнопка с типом button и id.
// Дополнительный класс (например, header__button) — необязателен.
export function createButton(id, text, extraClassName) {
  const className = extraClassName ? `button ${extraClassName}` : "button";
  const button = createElement("button", className, text);
  button.type = "button";
  button.id = id;
  return button;
}

// Счётчик со значением и подписью.
export function createStat(valueId, labelText) {
  const stat = createElement("div", "stats__item stat");

  const value = createElement("span", "stat__value", "0");
  value.id = valueId;

  const label = createElement("span", "stat__label", labelText);

  stat.append(value, label);
  return stat;
}
// Кнопка для переключения темы с иконками солнца и луны.
export function createThemeToggle() {
  const button = createElement("button", "theme-toggle", "");
  button.type = "button";
  button.id = "theme-toggle";
  button.setAttribute("aria-label", "Переключить тему");

  const sun = createElement("span", "theme-toggle__icon theme-toggle__icon--light");
  sun.setAttribute("aria-hidden", "true");

  const moon = createElement("span", "theme-toggle__icon theme-toggle__icon--dark");
  moon.setAttribute("aria-hidden", "true");

  button.append(sun, moon);
  return button;
}
export function createSoundButton() {
  const button = createElement("button", "button header__button sound-button");
  button.type = "button";
  button.id = "sound-button";
  button.setAttribute("aria-label", "Звук");
  button.setAttribute("aria-pressed", "false");

  const bars = Array.from({ length: 5 }, () => {
    const bar = createElement("span", "sound-button__bar paused");
    bar.setAttribute("aria-hidden", "true");
    return bar;
  });

  button.append(...bars);
  return button;
}