# Shot Clock Challenge JS

## Background and Overview
Arcades all over the world feature the "Super Shot" basketball game where you try to make as many buckets as you can in 24 seconds. The Shot Clock Challenge JS recreates this game in 2D. Users will click, drag and release points on the screen to shoot the ball towards the basket (or at anywhere just to watch the basketballs bounce around).

The basket will eventually start moving to add a layer of difficulty to the game.

## Functionality & MVP
In Shot Clock Challenge JS, major features include:
* Users can shoot basketballs at a vector they choose by clicking and dragging with the mouse
* Crowd noise responding to makes or misses and announcers calling the game.
* An in-house physics engine enables gravity to work on all objects, as well as collisions between:
  * the basketballs and the rim
  * the basketballs and the backboard
  * the basketballs and the net
  * the basketballs with each other
* Sounds will play for each collisions, and will vary depending on the type of collision interaction. For example, swishes will play a different sound than shots that go in but hit back iron.

## Wireframes
This app will consist of a single screen with the simulation canvas. Within the canvas will be a hoop and a start location for the basketball. These should be built to enable variable locations and perhaps time permitting in "practice mode" the user can choose different locations. Otherwise, the app features an intuitive UI with the shot clock counting down in large font at the top. Other options in the future may include sliders to increase dampening effects of the backboard or rim.

Not shown in the wireframe is an option to mute sounds and perhaps background music if that functionality is included.
![Alt text](/shot-clock-main.png "wireframe")


## Architecture and Technologies
This project will be implemented with the following technologies:
* Vanilla JavaScript for overall structure and logic.
* Easel.js to use HTML5 canvas for actual rendering of elements via DOM manipulation.
* Web Audio API for sound generation and control.

The app will feature:
* `basketball.js` - handles logic and how basketballs collide
* `rim.js` - handles logic and provides basketball.js data for rim/basketball collisions
* `backboard.js` - handles logic and provides basketball.js data for backboard/basketball collisions
* `net.js` - complexity of this file is not yet determined
* `game.js` - holds collection of basketballs, rim, backboard, and net objects.
* `gameview.js` - stores a game and stores the canvas for the game to draw into as well as key listeners.
* `audio.js` - handles audio logic for collisions and others.

## Implementation Timeline

**Day 1:** Set up Node modules and get Webpack up and running with `webpack.config.js` and `package.json`. Install Easel.js and figure out how it works. Be able to render an object to canvas via Easel. Be able to initialize a vector with the user drawing two points on the canvas.

**Day 2:** Learn the Web Audio API. Eventually the project will need to include crowd noise and volume gain will be an important part of that but for day 2 I just want to be able to play sounds during collisions. Create sound library and be able to play them on command.

**Day 3:** Create the rim and backboard and connect it with the basketball logic. Be able to hit balls on the backboard and the rim.

**Day 4:** Add the remaining game logic. Add sound effects and background sounds.

**Day 5:** Complete any MVPs that were not completed in the last 4 days, Day 5 is essentially a catchall day for the inevitable delays that happen. If not, perhaps build net logic and physics engine.

## Bonus features
These were somewhat touched on earlier, but some additional features include:
* saving high scores
* net physics engine
* practice game mode
