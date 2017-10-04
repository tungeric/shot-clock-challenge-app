class Player {
  constructor(options = {}) {
    this.pos = options.pos;
    this.vel = [0,0];
    this.game = options.game;
    this.starting_pos = this.pos;
  }

  draw(ctx) {
    const image = new Image();
    image.src = './assets/curry-set.png';
    ctx.drawImage(image, this.pos[0], this.pos[1], 60, 200);
  }

  move() {

  }
}

module.exports = Player;
