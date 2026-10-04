// Плейлист фоновой музыки
const MUSIC_PLAYLIST = [
  "./assets/audios/Vague_Reason.mp3",
  "./assets/audios/I-Am-With-You.mp3",
];

const CARD_FLIP_SOURCE = "./assets/audios/mb_card_deal_08.mp3";
const BUTTON_CLICK_SOURCE = "./assets/audios/button-click.mp3";

const MUSIC_VOLUME = 0.7;
const CARD_FLIP_VOLUME = 0.7;
const BUTTON_CLICK_VOLUME = 0.2;

let currentTrackIndex = 0;
let userWantsMusic = true;

const backgroundMusic = new Audio(MUSIC_PLAYLIST[currentTrackIndex]);
backgroundMusic.volume = MUSIC_VOLUME;
backgroundMusic.loop = MUSIC_PLAYLIST.length === 1;
backgroundMusic.addEventListener("ended", playNextTrack);
backgroundMusic.addEventListener("play", dispatchMusicChange);
backgroundMusic.addEventListener("pause", dispatchMusicChange);

function dispatchMusicChange() {
  document.dispatchEvent(new CustomEvent("musicchange"));
}

function playNextTrack() {
  if (MUSIC_PLAYLIST.length < 2) return;
  if (!userWantsMusic) return;

  currentTrackIndex = (currentTrackIndex + 1) % MUSIC_PLAYLIST.length;
  backgroundMusic.src = MUSIC_PLAYLIST[currentTrackIndex];
  backgroundMusic.play().catch(() => {});
}

const cardFlipSound = new Audio(CARD_FLIP_SOURCE);
cardFlipSound.volume = CARD_FLIP_VOLUME;

const buttonClickSound = new Audio(BUTTON_CLICK_SOURCE);
buttonClickSound.volume = BUTTON_CLICK_VOLUME;

function playFromStart(audio) {
  audio.currentTime = 0;
  audio.play().catch(() => {});
}

export function playButtonClick() {
  playFromStart(buttonClickSound);
}

export function playCardFlip() {
  playFromStart(cardFlipSound);
}

export function toggleBackgroundMusic() {
  if (backgroundMusic.paused) {
    userWantsMusic = true;
    backgroundMusic.play().catch(() => {});
  } else {
    userWantsMusic = false;
    backgroundMusic.pause();
  }
}

export function isBackgroundMusicPlaying() {
  return !backgroundMusic.paused;
}

export function initAudioOnFirstInteraction() {
  if (!backgroundMusic.paused) return;

  document.addEventListener(
    "click",
    () => {
      if (userWantsMusic && backgroundMusic.paused) {
        backgroundMusic.play().catch(() => {});
      }
    },
    { once: true }
  );
}