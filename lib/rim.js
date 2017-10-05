const DEFAULTS = {
  COLOR: 'red',
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
    if (this.game.backboard[0].moving === true) {
      if(this.pos[1] < 100) {
        this.vel=[0,1];
      }
      if(this.pos[1] > 300) {
        this.vel = [0,-1];
      }
    }

    this.pos[0] += this.vel[0]*frameRate*100;
    this.pos[1] += this.vel[1]*frameRate*100;
  }
}
const frameRate = 1/60;
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
    if (this.game.backboard[0].moving === true) {
      if(this.game.backboard[0].pos[1] < 100) {
        this.vel=[0,0.3];
      }
      if(this.game.backboard[0].pos[1] > 300) {
        this.vel = [0,-0.3];
      }
      this.pos[0] += this.vel[0]*frameRate*100;
      this.pos[1] += this.vel[1]*frameRate*100;
    }

  }
}

module.exports = BackRim;
