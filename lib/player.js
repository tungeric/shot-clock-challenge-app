class Player {
  constructor(options = {}) {
    this.pos = options.pos;
    this.vel = [0,-5];
    this.game = options.game;
    this.mass = 0.1;
    this.starting_pos = this.game.playerStartingPosition();
    this.width = 60;
    this.height = 200;
    this.released = false;
  }

  draw(ctx) {
    const image = new Image();
    if(this.pos[1] >= this.starting_pos[1]) {
      // console.log("SET!");
      this.pos[1] = this.starting_pos[1];
      image.src = './assets/curry-set.png';
      ctx.drawImage(image, this.pos[0], this.pos[1], this.width, this.height);
    } else if (this.released === false) {
      // console.log(this.vel);

      image.src = './assets/curry-rise.png';
      ctx.drawImage(image, this.pos[0], this.pos[1], this.width*1.05, this.height*1.05);
    } else {
      image.src = './assets/curry-release.png';
      ctx.drawImage(image, this.pos[0], this.pos[1], this.width*1.15, this.height*1.15);
    }
  }

  move(timeDelta) {
    //timeDelta is number of milliseconds since last move
    //if the computer is busy the time delta will be larger
    //in this case the MovingObject should move farther in this frame
    //velocity of object is how far it should move in 1/60th of a second
    // this.pos[1] = this.pos[1] - 1;
    if (this.pos[0] === this.starting_pos[0] &&
        this.pos[1] >= this.starting_pos[1]) {
          // console.log(this.pos[1]);
          // console.log(this.starting_pos[1]);
      return;
    }

    const Cd = 0.3; // Dimensionless
    const rho = 2; // kg / m^3
    const A = Math.PI * this.width/3 * this.width/3 / (10000);
    const ag = 9.81;

    // Do physics
    // Drag force: Fd = -1/2 * Cd * A * rho * v * v
    let Fx = -0.5 * Cd * A * rho * this.vel[0] * this.vel[0] * this.vel[0] / Math.abs(this.vel[0]);
    let Fy = -0.5 * Cd * A * rho * this.vel[1] * this.vel[1] * this.vel[1] / Math.abs(this.vel[1]);

    Fx = (isNaN(Fx) ? 0 : Fx);
    Fy = (isNaN(Fy) ? 0 : Fy);

    // Calculate acceleration ( F = ma )
    let ax = Fx / this.mass;
    let ay = ag + (Fy / this.mass);

    // Integrate to get velocity
    this.vel[0] += ax*frameRate;
    this.vel[1] += ay*frameRate;

    // Integrate to get position
    this.pos[0] += this.vel[0]*frameRate*100;
    this.pos[1] += this.vel[1]*frameRate*100;

  }
}

const frameRate = 1/60;
module.exports = Player;
