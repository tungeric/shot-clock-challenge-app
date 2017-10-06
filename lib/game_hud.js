class GameHUD {
  constructor(options = {}) {
    this.pos = options.pos;
    this.game = options.game;
    this.clock = 24;
    this.startTime = null;
    this.currentScore = 0;
  }

  draw(ctx, time) {
    if(this.game.mute === true) {
      const unmuteButton = new Image();
      unmuteButton.src = './assets/soundoff.png';
      ctx.drawImage(unmuteButton, 1000, 600, 30, 30);
    } else {
      const muteButton = new Image();
      muteButton.src = './assets/soundon.png';
      ctx.drawImage(muteButton, 1000, 600, 30, 30);
    }
    switch(this.game.playing) {
      case "not started":
        ctx.fillStyle = "white";
        ctx.font = "45px Arial";
        let header = "How many shots can you hit in 24 seconds?";
        ctx.fillText(header, 100, 60);

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
        break;
      case "playing":
        ctx.fillStyle = "white";
        ctx.font = "30px Arial";
        this.currentScore = this.game.checkScore();
        let currentScore = `Baskets made: ${this.currentScore}`;
        ctx.fillText(currentScore, this.pos[0], this.pos[1]);

        ctx.fillStyle = "white";
        ctx.font = "100px Arial";
        // debugger;
        let shotClock = this.clock - Math.floor((time - this.startTime)/1000*0.8);
        if (shotClock <= 16) {
          this.game.backboard[0].moving = true;
        }
        if (shotClock <= 0) {
          this.game.buzzerSound.play();
          this.game.playing = "over";
          this.game.backboard[0].moving = false;
        }
        let currentClock = `${shotClock}`;
        ctx.fillText(currentClock, 510, 100);
        break;
      case "over":
        ctx.fillStyle = "white";
        ctx.font = "45px Arial";
        let result = `You made ${this.currentScore} shots!`;
        ctx.fillText(result, 350, 60);
        const restartButton = new Image();
        restartButton.src = './assets/start-button.png';
        ctx.drawImage(restartButton, 460, 240, 200, 200);
        this.startTime = time;

        ctx.fillStyle = "black";
        ctx.font = "45px Arial";
        let replay = "Replay?";
        ctx.fillText(replay, 500, 500);
      default:
        break;
    }
  }

  move() {

  }
}

module.exports = GameHUD;
