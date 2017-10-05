const Game = require ('./game');
const GameView = require ('./game_view');
const Matter = require ('./matter');

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
    if(game.playing === false) {
      if(e.pageX >=460 && e.pageX <= 660 &&
         e.pageY >=240 && e.pageY <= 440) {
           game.playing = true;
           game.buzzerSound.play();
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
  };

  canvas.onmousemove = function(e) {
    mouse.x = e.pageX;
    mouse.y = e.pageY;
  };

  canvas.onmouseup = function(e) {
    if(game.playing === false) {
    } else {
      mouseEndPos = [e.pageX, e.pageY];
      game.player[0].released = true;
      game.activeBall.pos = [game.activeBall.pos[0]-1, game.activeBall.pos[1]-1];
      game.activeBall.vel = [(mouseStartPos[0]-mouseEndPos[0]) * scaleFactor,
                             (mouseStartPos[1]-mouseEndPos[1]) * scaleFactor];
      game.shotBalls.push(game.activeBall);
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
