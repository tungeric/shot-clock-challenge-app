const DEFAULTS = {
  COLOR: '#FFA500',
  WIDTH: 10,
  HEIGHT: 10
};

class FrontRim {
  constructor(options = {}) {
    this.pos = options.pos;
    this.vel = options.vel;
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

module.exports = FrontRim;

class BackRim {
  constructor(options = {}) {
    this.pos = options.pos;
    this.vel = options.vel;
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

module.exports = BackRim;
