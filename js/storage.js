const RESULTS_KEY = "memory-game-results";

export function loadResults() {
  const raw = localStorage.getItem(RESULTS_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveResults(results) {
  localStorage.setItem(RESULTS_KEY, JSON.stringify(results));
}

export function addResult(moves) {
  const results = loadResults();
  results.push(moves);

  // храним только 10 лучших (отсортированных по возрастанию)
  results.sort((a, b) => a - b);
  const trimmed = results.slice(0, 10);

  saveResults(trimmed);
  return trimmed;
}