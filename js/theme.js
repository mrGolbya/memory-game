const THEME_KEY = "memory-game-theme";

export function initTheme() {
  const saved = localStorage.getItem(THEME_KEY) || "light";
  document.documentElement.dataset.theme = saved;
}

export function toggleTheme() {
  const current = document.documentElement.dataset.theme;
  const next = current === "light" ? "jjk" : "light";
  document.documentElement.dataset.theme = next;
  localStorage.setItem(THEME_KEY, next);
}