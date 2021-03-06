const Game = require("./game");
class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;

    // this.basketball = this.game.addBasketball();
  }

  start() {
    this.lastTime = 0;
    //start the animation
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    const timeDelta = time - this.lastTime;
    this.game.step(timeDelta);
    this.game.draw(this.ctx, time);
    this.lastTime = time;
    //every call to animate requests causes another call to animate
    requestAnimationFrame(this.animate.bind(this));
  }
}

module.exports = GameView;
