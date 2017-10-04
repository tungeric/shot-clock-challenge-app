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
  // canvas.onmousemove = getMousePosition;
  let mouseStartPos = [0,0];
  let mouseEndPos = [0,0];
  canvas.onmousedown = function(e) {
    mouseStartPos = [e.pageX, e.pageY];
    game.activeBall.vel = [0,-20];
    game.activeBall.pos[1] -= 1;
  };
  canvas.onmouseup = function(e) {
    mouseEndPos = [e.pageX, e.pageY];
    game.activeBall.pos = [game.activeBall.pos[0]-1, game.activeBall.pos[1]-1];
    game.activeBall.vel = [(mouseStartPos[0]-mouseEndPos[0]) * scaleFactor,
                           (mouseStartPos[1]-mouseEndPos[1]) * scaleFactor];
    game.addBasketball();
    game.activeBall = game.basketballs[game.basketballs.length-1];
  };

});

// function getMousePosition(e) {
//   mousePos[0] = e.pageX - canvas.offsetLeft;
//     mouse.y = e.pageY - canvas.offsetTop;
// }
