const DEFAULTS = {
  COLOR: '#000000',
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
    this.moving = false;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(0, this.pos[1]+this.height*0.4, this.pos[0], 30);
    const image = new Image();
    image.src = './assets/hoop.png';
    ctx.drawImage(image, this.pos[0]-30, this.pos[1]-5, 130, this.height+20);
  }

  move() {
    if (this.moving === true) {
      if(this.pos[1] < 100) {
        this.vel=[0,0.3];
      }
      if(this.pos[1] > 300) {
        this.vel = [0,-0.3];
      }
      this.pos[0] += this.vel[0]*frameRate*100;
      this.pos[1] += this.vel[1]*frameRate*100;
    }


  }
}
const frameRate = 1/60;

module.exports = Backboard;
