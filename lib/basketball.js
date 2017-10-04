
const DEFAULTS = {
  COLOR: '#FFA500',
  RADIUS: 18,
  SPEED: 0
};

class Basketball {
  constructor(options = {}) {
    this.pos = options.pos;
    this.vel = [0,0];
    this.radius = DEFAULTS.RADIUS;
    this.color = DEFAULTS.COLOR;
    this.game = options.game;
    this.mass = 0.1;
    this.restitution = 1;
    this.starting_pos = options.game.bballStartingPosition();
  }

  draw(ctx) {
    // ctx.fillStyle = this.color;
    // ctx.beginPath();
    // ctx.arc(
    //   this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    // );
    // ctx.fill();
    const image = new Image();
    image.src = './assets/bball.png';
    // ctx.save();
    let netVel = Math.sqrt(Math.pow(this.vel[0], 2) + Math.pow(this.vel[1], 2));
    // ctx.rotate(0.2*netVel);
    ctx.drawImage(image, this.pos[0]-this.radius, this.pos[1]-this.radius, this.radius*2, this.radius*2);
    // ctx.restore();
  }

  move(timeDelta) {
    //timeDelta is number of milliseconds since last move
    //if the computer is busy the time delta will be larger
    //in this case the MovingObject should move farther in this frame
    //velocity of object is how far it should move in 1/60th of a second

    if (this.pos[0] === this.starting_pos[0] &&
        this.pos[1] >= this.starting_pos[1]) {
          // console.log(this.pos[1]);
          // console.log(this.starting_pos[1]);
      return;
    }

    const Cd = 0.3; // Dimensionless
    const rho = 2; // kg / m^3
    const A = Math.PI * this.radius * this.radius / (10000);
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

    // this.vel[1] = this.vel[1] + g * timeDelta / NORMAL_FRAME_TIME_DELTA;
    // const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
    //     offsetX = this.vel[0] * velocityScale,
    //     offsetY = this.vel[1] * velocityScale;
    //
    // this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];

    // if (this.game.isOutOfBounds(this.pos)) {
    //   if (this.isWrappable) {
    //     this.pos = this.game.wrap(this.pos);
    //   } else {
    //     this.remove();
    //   }
    // }
  }

  collidedWithSides(otherObject) {
    let x1 = this.pos[0];
    let y1 = this.pos[1];
    let x2 = otherObject.pos[0];
    let y2 = otherObject.pos[1];
    if(y1 > y2 && y1 < (y2 + otherObject.height)) {
      if (((x1 - this.radius) <= (x2 + otherObject.width)) &&
          ((x1 + this.radius) >= x2)) {
        return true;
      } else {
        return false;
      }
    }
  }

  collidedWithTopOrBot(otherObject) {
    let x1 = this.pos[0];
    let y1 = this.pos[1];
    let x2 = otherObject.pos[0];
    let y2 = otherObject.pos[1];
    if(x1 > x2 && x1 < (x2 + otherObject.width)) {
      if (((y1 + this.radius) >= (y2)) &&
          ((y1 - this.radius) <= y2 + otherObject.height)) {
        return true;
      } else {
        return false;
      }
    }
  }

  collidedWithCorners(otherObject) {
    let x1 = this.pos[0];
    let y1 = this.pos[1];
    let x2 = otherObject.pos[0];
    let y2 = otherObject.pos[1];
    let distToTopRight = Math.sqrt(Math.pow((x2+otherObject.width) - x1, 2) + Math.pow(y2 - y1, 2));
    let distToTopLeft = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    let distToBotRight = Math.sqrt(Math.pow((x2+otherObject.width) - x1, 2) +
                         Math.pow((y2+otherObject.height) - y1, 2));
    let distToBotLeft = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow((y2+otherObject.height) - y1, 2));
    if (distToTopRight <= this.radius ||
        distToTopLeft <= this.radius ||
        distToBotRight <= this.radius ||
        distToBotLeft <= this.radius) {
        return true;
      } else {
        return false;
      }
  }

  isCollidedWith(otherObject) {
    let x1 = this.pos[0];
    let y1 = this.pos[1];
    let x2 = otherObject.pos[0];
    let y2 = otherObject.pos[1];
    if(otherObject instanceof Basketball) {
      let dist = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
      if (dist <= (this.radius + otherObject.radius)) {
        return true;
      } else {
        return false;
      }
    } else { // all other objects are rectangles and have edges
      // If object hits the left or right sides
      if(this.collidedWithSides(otherObject)) {
        return true;
      } else if (this.collidedWithTopOrBot(otherObject)) {
        return true;
      } else if (this.collidedWithCorners(otherObject)) {
        return true;
      } else {
        return false;
      }
      // If object hits corner

    }
  }

  handleCollision(otherObject) {
    // let oldVelX = this.vel[0],

    //   if (otherObject instanceof Ship) {
    //     otherObject.relocate();
    //         return true;
    //   } else if (otherObject instanceof Bullet) {
    //         this.remove();
    //         otherObject.remove();
    //         return true;
    //     }
    // }
    let x1 = this.pos[0];
    let y1 = this.pos[1];
    let x2 = otherObject.pos[0];
    let y2 = otherObject.pos[1];
    if (otherObject instanceof Basketball) {
      // let vectorX = otherObject.pos[0] - this.pos[0];
      // let vectorY = otherObject.pos[1] - this.pos[1];
      // let vectorH = Math.sqrt((Math.pow(vectorX,2)) + (Math.pos(vectorY,2)));

    } else {
      if(this.collidedWithSides(otherObject)) {
        // debugger;
        this.vel[0] = -this.vel[0]*this.restitution*(otherObject.restitution) + otherObject.vel[0];
        this.vel[1] = this.vel[1]*this.restitution*(otherObject.restitution) + otherObject.vel[1];

        //if right
        if(this.pos[0] - this.radius <= otherObject.pos[0] + otherObject.width) {
          this.pos[0] = otherObject.pos[0] + otherObject.width + this.radius + 0.001;
        } else {
          this.pos[0] = otherObject.pos[0] - this.radius - 0.001;
        }
      } else if (this.collidedWithTopOrBot(otherObject)) {
        // debugger;
        this.vel[0] = this.vel[0]*this.restitution*(otherObject.restitution) + otherObject.vel[0];
        this.vel[1] = -this.vel[1]*this.restitution*(otherObject.restitution) + otherObject.vel[1];
        //if top
        if(this.pos[1] + this.radius >= otherObject.pos[1]) {
          this.pos[1] = otherObject.pos[1] - this.radius-0.001;
        } else {
          this.pos[1] = otherObject.pos[1] + otherObject.height + this.radius + 0.001;
        }
      } else if (this.collidedWithCorners(otherObject)) {
        // debugger;

        // let distToTopRight = Math.sqrt(Math.pow((x2+otherObject.width) - x1, 2) + Math.pow(y2 - y1, 2));
        // let distToTopLeft = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        // let distToBotRight = Math.sqrt(Math.pow((x2+otherObject.width) - x1, 2) +
        //                      Math.pow((y2+otherObject.height) - y1, 2));
        // let distToBotLeft = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow((y2+otherObject.height) - y1, 2));
        // let all4points = [distToTopRight, distToTopLeft, distToBotRight, distToBotLeft];
        // let vectorX = 0; //(x1 - x2) / this.radius;
        // let vectorY = 0; //(y1 - y2) / this.radius;
        // switch(Math.min(...all4points)) {
        //   case distToTopRight:
        //     vectorX = Math.abs((x1 - (x2 + otherObject.width)) / this.radius);
        //     vectorY = Math.abs((y1 - y2) / this.radius);
        //
        //   case distToTopLeft:
        //     vectorX = Math.abs((x1 - x2) / this.radius);
        //     vectorY = Math.abs((y2 - y1) / this.radius);
        //   case distToBotRight:
        //     vectorX = Math.abs((x1 - (x2 + otherObject.width)) / this.radius);
        //     vectorY = Math.abs(((y2 + otherObject.height) - y1) / this.radius);
        //   case distToBotLeft:
        //     vectorX = Math.abs((x1 - x2) / this.radius);
        //     vectorY = Math.abs(((y2 + otherObject.height) - y1) / this.radius);
        // }
        // // debugger;
        // this.vel[0] = this.vel[0]*this.restitution*(otherObject.restitution)*vectorX;
        // this.vel[1] = this.vel[1]*this.restitution*(otherObject.restitution)*vectorY;
        //
        // // this.vel[0] = this.vel[0]*this.restitution*(-otherObject.restitution) + otherObject.vel[0];
        // // this.vel[1] = this.vel[1]*this.restitution*(-otherObject.restitution) + otherObject.vel[1];
      }
    }
  }
}
const frameRate = 1/60;

module.exports = Basketball;
