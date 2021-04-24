const btnPlay = document.querySelector("#btn-play");
const btnPause = document.querySelector("#btn-pause");
const ulScore = document.querySelector("#ul-score");


function renderUlScore() {
  while (ulScore.firstChild) {
    ulScore.removeChild(ulScore.firstChild);
  };

  PLAYERS_ID.forEach((item, i) => {
    const liItem = document.createElement("li");
    const content = document.createTextNode(`Player ${item}: ${PLAYERS_LOST[item]}`);

    liItem.appendChild(content);

    liItem.style.color = PLAYERS_COLOR[i];
    ulScore.appendChild(liItem);
  });
}

// Initialise scores
renderUlScore();

// Start game
Runner.run(runner, engine);
let IS_PLAYING = true;

// Play game
btnPlay.addEventListener("click", (event) => {
  if (IS_PLAYING) {
    return;
  };
  Runner.run(runner, engine);
  IS_PLAYING = true;

  btnPlay.disabled = true;
  btnPause.disabled = false;
});

// Pause game
btnPause.addEventListener("click", (event) => {
  if (!IS_PLAYING) {
    return;
  };
  Runner.stop(runner);
  IS_PLAYING = false;

  btnPlay.disabled = false;
  btnPause.disabled = true;
});

// Update Score
document.addEventListener("lost", (event) => {
  const player = event?.detail?.player;
  console.log("Dead", player);
  if (player === undefined) {
    console.error("[LOST EVENT] No player found");
    return;
  };
  PLAYERS_SCORES_LOST[player] += 1;
  renderUlScore();
})
