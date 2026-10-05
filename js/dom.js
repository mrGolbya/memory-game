// Создать элемент с классом и текстом.
// Если класс или текст не нужны, можно передать пустую строку.
export function createElement(tagName, className, textContent) {
  const element = document.createElement(tagName);

  if (className) {
    element.className = className;
  }

  if (textContent) {
    element.textContent = textContent;
  }

  return element;
}