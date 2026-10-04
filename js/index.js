import { createHeader } from "./components/header.js";
import { createMain } from "./components/main.js";
import { createFooter } from "./components/footer.js";

function renderApp() {
  const header = createHeader();
  const main = createMain();
  const footer = createFooter();

  document.body.append(header, main, footer);
}

renderApp();