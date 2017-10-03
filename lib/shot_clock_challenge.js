const Game = require ('./game');
const GameView = require ('./game_view');
const Matter = require ('./matter');

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("game-canvas");
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;

  const ctx = canvasEl.getContext("2d");
  // ctx.fillStyle="purple";
  // ctx.fillRect(0, 0, 500, 500);
  //
  // ctx.beginPath();
  // ctx.arc(100, 100, 20, 0, 2*Math.PI, true);
  // ctx.strokeStyle = "green";
  // ctx.lineWidth = 5;
  // ctx.stroke();
  // ctx.fillStyle = "blue";
  // ctx.fill();

  const game = new Game(canvasEl);
  new GameView(game, ctx).start();




  // //  module aliases
  // var Engine = Matter.Engine,
  //     Render = Matter.Render,
  //     World = Matter.World,
  //     Bodies = Matter.Bodies;
  //
  // // create an engine
  // var engine = Engine.create();
  //
  // // create a renderer
  // var render = Render.create({
  //     element: document.body,
  //     engine: engine
  // });
  //
  // // create two boxes and a ground
  // var boxA = Bodies.rectangle(400, 200, 80, 80);
  // var boxB = Bodies.rectangle(450, 50, 80, 80);
  // var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
  //
  // // add all of the bodies to the world
  // World.add(engine.world, [boxA, boxB, ground]);
  //
  // // run the engine
  // Engine.run(engine);
  //
  // // run the renderer
  // Render.run(render);
});
