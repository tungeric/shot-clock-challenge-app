class GameHUD {
  constructor(options = {}) {
    this.pos = options.pos;
    this.game = options.game;
  }

  draw(ctx) {
    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    let currentScore = `Baskets made: ${this.game.checkScore()}`;
    ctx.fillText(currentScore, this.pos[0], this.pos[1]);
  }

  move() {

  }
}

module.exports = GameHUD;
