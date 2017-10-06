const Game = require ('./game');
const GameView = require ('./game_view');
const Matter = require ('./matter');
const Sound = require('./sound');

const scaleFactor = 0.1;

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("game-canvas");
  canvas.width = Game.DIM_X;
  canvas.height = Game.DIM_Y;

  const ctx = canvas.getContext("2d");

  const game = new Game(canvas);
  new GameView(game, ctx).start();

  // mouse INTERACTION
  let mouseStartPos = [0,0];
  let mouseEndPos = [0,0];

  let mouse = {x: 0, y: 0, isDown: false};

  canvas.onmousedown = function(e) {
    mouseStartPos = [e.pageX, e.pageY];
    if(game.playing === "not started" || game.playing === "over") {
      if(e.pageX >=480 && e.pageX <= 680 &&
         e.pageY >=260 && e.pageY <= 460) {
           game.resetObjects();
           game.playing = "playing";
           if (game.mute === false) {
             game.buzzerSound.play();
           }
       }
    } else {
      game.player[0].released = false;
      game.activeBall.pos[0] = game.activeBall.pos[0]+15;
      game.activeBall.pos[1] = game.activeBall.pos[1]-2;
      game.player[0].pos[1] = game.player[0].starting_pos[1]-2;

      game.activeBall.vel = [0,-5];
      game.player[0].vel = [0,-5];
      mouse.isDown = true;
    }
    if (e.pageX >=1020 && e.pageX <= 1050 &&
        e.pageY >=620 & e.pageY <= 650) {
          if(game.mute === false) {
            console.log(game.mute);
            game.mute = true;
          } else {
            console.log(game.mute);
            game.mute = false;
          }
    }
  };

  canvas.onmousemove = function(e) {
    mouse.x = e.pageX;
    mouse.y = e.pageY;
  };

  const shotArray = ['./assets/curry-shoot1.wav','./assets/curry-shoot2.wav'];
  canvas.onmouseup = function(e) {
    if(game.playing === "not started" || game.playing === "over") {
    } else {
      mouseEndPos = [e.pageX, e.pageY];
      game.player[0].released = true;
      game.activeBall.pos = [game.activeBall.pos[0]-1, game.activeBall.pos[1]-1];
      game.activeBall.vel = [(mouseStartPos[0]-mouseEndPos[0]) * scaleFactor,
                             (mouseStartPos[1]-mouseEndPos[1]) * scaleFactor];
      game.shotBalls.push(game.activeBall);
      if(game.mute === false) {
        let shotSound = new Sound('', game.mute);
        shotSound.sound.src = shotArray[Math.floor(Math.random() * shotArray.length)];
        shotSound.play();
      }
      game.activeBall = null;
      mouse.isDown = false;
      setTimeout(() => {
        game.addBasketball();
        game.activeBall = game.basketballs[game.basketballs.length-1];
      }, 500);
    }
  };

});

// function getMousePosition(e) {
//   mousePos[0] = e.pageX - canvas.offsetLeft;
//     mouse.y = e.pageY - canvas.offsetTop;
// }
