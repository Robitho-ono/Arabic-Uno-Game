class UnoGame {
  constructor(players, level) {
    this.numPlayers = players;
    this.level = level;
    this.deck = generateDeck(level);
    this.discardPile = [];
    this.players = Array.from({ length: players }, () => ({ hand: [] }));
    this.currentPlayer = 0;

    // Bagi kartu
    for (let i = 0; i < 7; i++) {
      for (let p = 0; p < players; p++) {
        this.players[p].hand.push(this.drawCard());
      }
    }

    // Kartu awal
    this.discardPile.push(this.drawCard());
  }

  drawCard() {
    if (this.deck.length === 0) {
      this.deck = this.discardPile.splice(0, this.discardPile.length - 1);
      shuffle(this.deck);
    }
    return this.deck.pop();
  }

  playCard(playerIndex, cardIndex) {
    const card = this.players[playerIndex].hand[cardIndex];
    const top = this.discardPile[this.discardPile.length - 1];

    if (card.color === top.color || card.value === top.value) {
      this.discardPile.push(card);
      this.players[playerIndex].hand.splice(cardIndex, 1);
      this.nextTurn();
    } else {
      alert("Kartu tidak cocok!");
    }
  }

  nextTurn() {
    this.currentPlayer = (this.currentPlayer + 1) % this.numPlayers;
  }

  getScores() {
    return this.players.map(p => p.hand.length);
  }
}
