const RESULTS_KEY = "memory-game-results";
const MAX_RESULTS = 10;

export function loadResults() {
  const raw = localStorage.getItem(RESULTS_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter(
      (item) =>
        item &&
        typeof item.moves === "number" &&
        typeof item.date === "string"
    );
  } catch {
    return [];
  }
}

export function saveResults(results) {
  localStorage.setItem(RESULTS_KEY, JSON.stringify(results));
}

export function addResult(moves) {
  const results = loadResults();

  const newResult = {
    moves,
    date: new Date().toISOString(),
  };

  results.push(newResult);
  results.sort(compareResults);

  const trimmed = results.slice(0, MAX_RESULTS);
  saveResults(trimmed);

  return trimmed;
}

function compareResults(a, b) {
  if (a.moves !== b.moves) {
    return a.moves - b.moves;
  }
  return new Date(a.date) - new Date(b.date);
}