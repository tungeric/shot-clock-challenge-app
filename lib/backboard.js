const DEFAULTS = {
  COLOR: '#FFA500',
  WIDTH: 10,
  HEIGHT: 100
};

class Backboard {
  constructor(options = {}) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.width = DEFAULTS.WIDTH;
    this.height = DEFAULTS.HEIGHT;
    this.color = DEFAULTS.COLOR;
    this.game = options.game;
    this.restitution = 0.8;
  }

  draw(ctx) {
    // ctx.fillStyle = this.color;
    // ctx.fillRect(this.pos[0], this.pos[1], this.width, this.height);
    const image = new Image();
    image.src = './assets/hoop.png';
    ctx.drawImage(image, this.pos[0]-30, this.pos[1]-5, 130, this.height+20);
  }

  move() {

  }
}

module.exports = Backboard;
