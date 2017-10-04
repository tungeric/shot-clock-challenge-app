const DEFAULTS = {
  COLOR: '#FFA500',
  WIDTH: 2000,
  HEIGHT: 10
};

class Ground {
  constructor(options = {}) {
    this.pos = options.pos;
    this.vel = [0,0];
    this.width = DEFAULTS.WIDTH;
    this.height = DEFAULTS.HEIGHT;
    this.color = DEFAULTS.COLOR;
    this.game = options.game;
    this.restitution = 1;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.pos[0], this.pos[1], this.width, this.height);
  }

  move() {

  }
}

module.exports = Ground;
