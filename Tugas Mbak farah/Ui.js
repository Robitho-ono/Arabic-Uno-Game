let game;

document.getElementById("startBtn").addEventListener("click", () => {
  const players = parseInt(document.getElementById("playerSelect").value);
  const level = parseInt(document.getElementById("levelSelect").value);
  game = new UnoGame(players, level);

  document.getElementById("menuScreen").classList.remove("active");
  document.getElementById("gameScreen").classList.add("active");

  renderGame();
});

document.getElementById("drawPile").addEventListener("click", () => {
  const player = game.players[game.currentPlayer];
  player.hand.push(game.drawCard());
  game.nextTurn();
  renderGame();
});

function renderGame() {
  // Giliran
  document.getElementById("turnInfo").innerText = `Giliran Pemain ${game.currentPlayer + 1}`;

  // Discard pile
  const discardDiv = document.getElementById("discardPile");
  discardDiv.innerHTML = "";
  const top = game.discardPile[game.discardPile.length - 1];
  discardDiv.appendChild(createCardElement(top));

  // Player hands
  const handsDiv = document.getElementById("playerHands");
  handsDiv.innerHTML = "";
  game.players.forEach((player, idx) => {
    const row = document.createElement("div");
    row.innerHTML = `<h3>Pemain ${idx+1}</h3>`;
    player.hand.forEach((card, cIdx) => {
      const el = createCardElement(card);
      if (idx === game.currentPlayer) {
        el.addEventListener("click", () => {
          game.playCard(idx, cIdx);
          renderGame();
        });
      } else {
        el.style.opacity = "0.5";
      }
      row.appendChild(el);
    });
    handsDiv.appendChild(row);
  });

  // Scoreboard
  const scoreList = document.getElementById("scoreList");
  scoreList.innerHTML = "";
  game.getScores().forEach((score, idx) => {
    const li = document.createElement("li");
    li.textContent = `Pemain ${idx+1}: ${score} kartu`;
    scoreList.appendChild(li);
  });
}

function createCardElement(card) {
  const div = document.createElement("div");
  div.className = `card ${card.color}`;
  div.textContent = card.value;
  return div;
}
