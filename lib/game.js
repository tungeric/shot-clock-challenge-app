const Basketball = require('./basketball');
const Backboard = require('./backboard');
const FrontRim = require('./rim');
const BackRim = require('./rim');
const Ground = require ('./ground');
const Player = require ('./player');
const GameHUD = require('./game_hud');
const Sound = require('./sound');

class Game {
  constructor(canvasEl) {
    this.score = 0;
    this.basketballs = [];
    this.backboard = [];
    this.rims = [];
    this.ground=[];
    this.player= [];
    this.gameHUD = [];
    this.playing = false;

    // this.addBallStartPoint();
    this.addBasketball();
    this.activeBall = this.basketballs[this.basketballs.length -1];
    this.addPlayer();
    this.addBackboard();
    this.addRims();
    this.addGround();
    this.addGameHUD();
    this.shotBalls = [];

    this.mute = false;
    this.bounceSound = new Sound('./assets/bball-bounce.wav');
    this.backboardSound = new Sound('./assets/backboard.wav');
    this.rimSound = new Sound('./assets/backboard.wav');
    this.netSound = new Sound('./assets/net.wav');
    this.buzzerSound = new Sound('./assets/buzzer.wav');
  }

  // setup and rendering objects
  backboardStartingPosition() {
    return [
      Game.START_X + Game.DIM_X * 0.15,
      Game.START_Y + Game.DIM_Y * 0.15
    ];
  }
  groundStartingPosition() {
    return [
      Game.START_X,
      Game.START_Y + Game.DIM_Y * 0.8
    ];
  }

  rimStartingPosition() {
    let backBoardPos = this.backboardStartingPosition();
    return [backBoardPos[0] + this.backboard[0].width + 10,
            backBoardPos[1] + this.backboard[0].height - 20];
  }

  bballStartingPosition() {
    return [
      Game.START_X + Game.DIM_X * 0.75,
      Game.START_Y + Game.DIM_Y * 0.5
    ];
  }

  playerStartingPosition() {
    let ballPos = this.bballStartingPosition();
    return [ballPos[0]+this.activeBall.radius-10,
            ballPos[1]];
  }

  addBackboard() {
    const backboard = new Backboard({
      pos: this.backboardStartingPosition(),
      vel: [0,0],
      game: this
    });
    this.add(backboard);
    return backboard;
  }

  addGround() {
    const ground = new Ground({
      pos: this.groundStartingPosition(),
      vel: [0,0],
      game: this
    });
    this.add(ground);
    return ground;
  }

  addBasketball() {
    const bball = new Basketball({
      pos: this.bballStartingPosition(),
      game: this
    });
    this.add(bball);
    return bball;
  }

  addPlayer() {
    const player = new Player({
      pos: this.playerStartingPosition(),
      game: this
    });
    this.add(player);
    return player;
  }

  addGameHUD() {
    const gameHUD = new GameHUD({
      pos: [60,60],
      game: this
    });
    this.add(gameHUD);
    return gameHUD;
  }

  addRims() {
    let backRimPos = this.rimStartingPosition();
    const rimWidth = 72;
    const frontRim = new FrontRim({
      pos: [backRimPos[0]+rimWidth, backRimPos[1]],
      vel: [0,0],
      game: this
    });
    this.add(frontRim);
    const backRim = new BackRim({
      pos: backRimPos,
      vel: [0,0],
      game: this
    });
    this.add(backRim);
  }

  add(object) {
    if (object instanceof Basketball) {
      this.basketballs.push(object);
    }
    if (object instanceof Backboard) {
      this.backboard.push(object);
    }
    if (object instanceof FrontRim ||
        object instanceof BackRim) {
      this.rims.push(object);
    }
    if (object instanceof Ground) {
      this.ground.push(object);
    }
    if (object instanceof Player) {
      this.player.push(object);
    }
    if (object instanceof GameHUD) {
      this.gameHUD.push(object);
    }
  }

  allNonBallObjects() {
    return [].concat(this.backboard, this.rims, this.ground);
  }

  allObjects() {
    let bballArray = [];
    if (this.basketballs.length > 5) {
      bballArray = this.basketballs.slice(this.basketballs.length-5);
    } else {
      bballArray = this.basketballs;
    }
    return [].concat(bballArray, this.backboard, this.rims, this.ground, this.player, this.gameHUD);
  }

  draw(ctx, time) {
    ctx.clearRect(0, 0,
                  Game.START_X + Game.DIM_X,
                  Game.START_Y + Game.DIM_Y);
    // ctx.fillStyle = Game.BG_COLOR;
    // ctx.fillRect(Game.START_X, Game.START_Y,
    //              Game.START_X + Game.DIM_X,
    //              Game.START_Y + Game.DIM_Y);

    // const image = new Image();
    // if(Math.floor(time) % 800 > 400 ) {
    //   image.src = './assets/bg-1gray.png';
    // } else {
    //   image.src = './assets/bg-2gray.png';
    // }
    // ctx.drawImage(image, Game.START_X, Game.START_Y, Game.START_X + Game.DIM_X, Game.START_Y + Game.DIM_Y);

    this.allObjects().forEach((object) => {
      if(object instanceof GameHUD) {
        object.draw(ctx, time);
      } else {
        object.draw(ctx);
      }
    });
  }

  step(delta) {
    this.checkCollisions();
    // this.checkScore();
    this.moveObjects(delta);
  }

  moveObjects(delta) {
    this.allObjects().forEach((object) => {
      object.move(delta);
    });
  }

  checkCollisions() {
    const allBalls = this.basketballs;
    const allOtherObj = this.allNonBallObjects();
    for (let i = 0; i < allBalls.length; i++) {
      const obj1 = allBalls[i];
      for (let j = 0; j < allBalls.length; j++) {
        const obj2 = allBalls[j];
        if (obj1 !== obj2 && obj1.isCollidedWith(obj2)) {
          const collision = obj1.handleCollision(obj2);
          if (collision) return;
        }
      }
      for (let j = 0; j < allOtherObj.length; j++) {
        const obj2 = allOtherObj[j];

        if (obj1.isCollidedWith(obj2)) {
          if(this.mute=== false) {
            if(obj2 instanceof Ground) {
              if (obj1.vel[1]>3) {
                this.bounceSound.play();
              }
            } else if (obj2 instanceof Backboard) {
              this.backboardSound.play();
            } else if (obj2 instanceof BackRim) {
              this.rimSound.play();
            }
          }

          const collision = obj1.handleCollision(obj2);
          if (collision) return;
        }
      }
    }
  }
  checkScore() {
    this.shotBalls.forEach((shotBall) => {
      // console.log(this.shotBall.prev_pos[1]);
      // console.log(this.shotBall.pos[1]);
      if(shotBall.pos[0] < this.rims[0].pos[0] &&
        shotBall.pos[0] > this.rims[1].pos[0] &&
        shotBall.pos[1] > this.rims[0].pos[1] &&
        shotBall.prev_pos[1] <= this.rims[0].pos[1]) {
          this.score +=1;
          this.netSound.play();
      }
    });
    return this.score;
  }

  // MOUSE INTERACTION
  // mouseInteraction() {
  //   const canvas = document.getElementById("canvas");
  //   const ctx = canvas.getContext("2d");
  //
  //   canvas.onmousemove = this.getMousePosition();
  //   canvas.onmousedown = this.mouseDown();
  //   canvas.onmouseup = this.mouseUp();
  //
  //   ctx.fillStyle = 'red';
  //   ctx.strokeStyle = '#000000';
  //   // let loopTimer = setInterval(loop, frameDelay);
  // }
}

Game.BG_COLOR = "#000000";
Game.START_X = 20;
Game.START_Y = 20;
Game.DIM_X = 1080;
Game.DIM_Y = 640;

module.exports = Game;
