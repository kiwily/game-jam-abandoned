const btnAudio = document.querySelector("#btn-audio");

const audioGameBackground = new Audio("/assets/Minimalistic Loops/loopTwo.wav");
audioGameBackground.loop = true;
audioGameBackground.volume = 0.3;

const audioCanBePlay = false;
audioGameBackground.addEventListener("canplaythrough", event => {
  /* the audio is now playable; play it if permissions allow */
  btnAudio.disabled = false;
});

let hasAudio = false;
btnAudio.addEventListener("click", (e) => {
  if (hasAudio) {
    audioGameBackground.pause();
    hasAudio = false;
    btnAudio.setAttribute('aria-pressed', false);
  } else {
    audioGameBackground.play();
    hasAudio = true;
    btnAudio.setAttribute('aria-pressed', true);
  };
});


function playCustomAudio(audio) {
  if (hasAudio) {
    audio.play();
  }
}
