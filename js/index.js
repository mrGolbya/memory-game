import { createHeader } from "./components/header.js";
import { createMain } from "./components/main.js";
import { createFooter } from "./components/footer.js";
import { initTheme } from "./theme.js";
import { loadCardImages, renderBoard } from "./game.js";

initTheme();

function renderApp() {
  document.body.append(createHeader(), createMain(), createFooter());
}

async function init() {
  renderApp();

  try {
    await loadCardImages();
    renderBoard();
  } catch (error) {
    console.error(error);
  }
}

init();