# Memory Game

A memory card game with 16 cards (8 pairs). Theme inspired by Jujutsu Kaisen.

## Features

- 4×4 board with 16 cards (8 pairs of matching images)
- Move counter and pairs found counter
- Victory modal with number of moves
- Leaderboard with top 10 results (rank, moves, date)
- Results saved in `localStorage`
- Two themes: light and Jujutsu Kaisen
- Background music (playlist of two tracks) and sound effects
- Responsive layout for mobile devices

## Tech Stack

- HTML5
- CSS3 (Sass, partials)
- JavaScript (ES modules)
- `localStorage` for storing results
- `Audio` API for sound

All markup is created via `document.createElement` — no `innerHTML`, `insertAdjacentHTML`, or third-party libraries.

## Project Structure

```
memory-game/
├── index.html
├── README.md
├── assets/
│   ├── audios/          # music and sound effects
│   │   ├── button-click.mp3
│   │   ├── mb_card_deal_08.mp3
│   │   ├── I-Am-With-You.mp3
│   │   └── Vague_Reason.mp3
│   ├── images/          # card images
│   ├── favicon.svg
│   └── images.json      # card data
├── js/
│   ├── index.js         # entry point
│   ├── audio.js         # sound and music
│   ├── dom.js           # element factory
│   ├── game.js          # game logic
│   ├── storage.js       # localStorage handling
│   ├── theme.js         # theme switching
│   ├── ui-helpers.js    # UI helper functions
│   └── components/
│       ├── card.js
│       ├── footer.js
│       ├── header.js
│       ├── main.js
│       └── popup.js
└── styles/
    ├── sass/            # source partials
    │   ├── style.scss
    │   ├── _variables.scss
    │   ├── _reset.scss
    │   ├── _base.scss
    │   ├── _layout.scss
    │   ├── _components.scss
    │   ├── _helpers.scss
    │   └── _normalize.css
    └── css/
        ├── style.css    # compiled CSS
        └── style.css.map
```

## Running Locally

The app uses ES modules and `fetch`, so **it will not work** by opening `index.html` directly (browsers block modules on `file://`). A local server is required.

### Option 1. VS Code Live Server (recommended)

1. Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension in VS Code.
2. Open the project folder in VS Code.
3. Right-click `index.html` → **Open with Live Server**.
4. The browser opens at `http://127.0.0.1:5500/`.

### Option 2. npx serve

If Node.js is installed:

```bash
npx serve .
```

Open the address shown in the terminal.

## How to Play

- **Card** — click to flip. Open two at a time: if the images match, they stay open; if not, they close after 0.7 seconds.
- **New Game** — shuffles the cards and resets the counters.
- **Leaderboard** — shows the top 10 results.
- **Sound** — toggles background music on/off.
- **Theme** — switches between light and dark themes.

## Deployment

Deployed on GitHub Pages:

**https://mrGolbya.github.io/memory-game/**

## Author

[GitHub: mrGolbya](https://github.com/mrGolbya)