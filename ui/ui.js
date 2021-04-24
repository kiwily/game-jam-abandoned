const btnPlay = document.querySelector("#btn-play");
const btnPause = document.querySelector("#btn-pause");
const ulScore = document.querySelector("#ul-score");

let IS_PLAYING = false;

btnPlay.addEventListener("click", (event) => {
  if (IS_PLAYING) {
    return;
  };
  console.log("Play");
  Runner.run(runner, engine);
  IS_PLAYING = true;

  btnPlay.disabled = true;
  btnPause.disabled = false;
});

btnPause.addEventListener("click", (event) => {
  if (!IS_PLAYING) {
    return;
  };
  console.log("Pause");
  Runner.stop(runner);
  IS_PLAYING = false;

  btnPlay.disabled = false;
  btnPause.disabled = true;
});

document.addEventListener("lost", (event) => {
  const player = event?.detail.?player;
  if (!player) {
    console.error("[LOST EVENT] No player found")
    return;
  };
})
