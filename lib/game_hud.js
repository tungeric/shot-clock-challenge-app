class GameHUD {
  constructor(options = {}) {
    this.pos = options.pos;
    this.game = options.game;
    this.clock = 24;
    this.startTime = null;
  }

  draw(ctx, time) {
    if(this.game.playing === false) {
      ctx.fillStyle = "white";
      ctx.font = "45px Arial";
      let header = "How many shots can you hit in 24 seconds?";
      ctx.fillText(header, 100, 100);

      ctx.fillStyle = "black";
      ctx.font = "18px Arial";
      let controls = "Controls: Click and drag. Release to shoot the ball.";
      ctx.fillText(controls, 50, 520);

      ctx.fillStyle = "black";
      ctx.font = "18px Arial";
      let credits = "Background from NBA 2K17. Curry image from ESPN.";
      ctx.fillText(credits, 50, 570);

      const startButton = new Image();
      startButton.src = './assets/start-button.png';
      ctx.drawImage(startButton, 460, 240, 200, 200);
      this.startTime = time;
      // ctx.drawImage(startButton, this.game.START_X + this.game.DIM_X * 0.45,
      //                                 this.game.START_Y + this.game.DIM_Y * 0.45,
      //                                 200, 50);
    } else {
      ctx.fillStyle = "white";
      ctx.font = "30px Arial";
      let currentScore = `Baskets made: ${this.game.checkScore()}`;
      ctx.fillText(currentScore, this.pos[0], this.pos[1]);

      ctx.fillStyle = "white";
      ctx.font = "100px Arial";
      // debugger;
      let shotClock = this.clock - Math.floor((time - this.startTime)/1000*0.8);
      let currentClock = `${shotClock}`;
      ctx.fillText(currentClock, 510, 100);
    }
  }

  move() {

  }
}

module.exports = GameHUD;
