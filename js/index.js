import { createHeader } from "./components/header.js";
import { createMain } from "./components/main.js";
import { createFooter } from "./components/footer.js";
import { initTheme } from "./theme.js";

initTheme();

function renderApp() {
  document.body.append(createHeader(), createMain(), createFooter());
}

renderApp();