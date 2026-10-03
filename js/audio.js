// Пути к аудиофайлам
const MUSIC_SOURCE = "./assets/audios/audio-theme.mpeg";
const CARD_FLIP_SOURCE = "./assets/audios/mb_card_deal_08.mp3";
const BUTTON_CLICK_SOURCE = "./assets/audios/button-click.mp3";

// Громкость звуков (от 0 до 1)
const MUSIC_VOLUME = 0.7;
const CARD_FLIP_VOLUME = 0.7;
const BUTTON_CLICK_VOLUME = 0.2;

const backgroundMusic = new Audio(MUSIC_SOURCE);
backgroundMusic.loop = true;
backgroundMusic.volume = MUSIC_VOLUME;

const cardFlipSound = new Audio(CARD_FLIP_SOURCE);
cardFlipSound.volume = CARD_FLIP_VOLUME;

const buttonClickSound = new Audio(BUTTON_CLICK_SOURCE);
buttonClickSound.volume = BUTTON_CLICK_VOLUME;

// Проиграть звук с самого начала.
// Если браузер блокирует автозапуск, ошибка просто игнорируется.
function playFromStart(audio) {
  audio.currentTime = 0;
  audio.play().catch(() => {});
}

// Короткий клик по кнопке.
export function playButtonClick() {
  playFromStart(buttonClickSound);
}

// Звук переворота карточки.
export function playCardFlip() {
  playFromStart(cardFlipSound);
}

// Переключить фоновую музыку: играет — выключить, на паузе — включить.
export function toggleBackgroundMusic() {
  if (backgroundMusic.paused) {
    backgroundMusic.play().catch(() => {});
  } else {
    backgroundMusic.pause();
  }
}

// Узнать, играет ли сейчас музыка.
export function isBackgroundMusicPlaying() {
  return !backgroundMusic.paused;
}