# Shot Clock Challenge JS

[Live page](www.shotclockchallenge.xyz)

## Background and Overview
Arcades all over the world feature the "Super Shot" basketball game where you try to make as many buckets as you can in 24 seconds. The Shot Clock Challenge JS recreates this game in 2D. Users will click, drag and release points on the screen to shoot the ball towards the basket (or at anywhere just to watch the basketballs bounce around). Featuring a left-handed Steph Curry, take aim at a basket and a self-created physics engine and beat your high score!

## Key features
* Self-created physics engine, complete with elastic collisions between basketball and rim, basketball and backboard, and basketball with the ground.
  * The physics engine also supports drag and can be modified to simulate different viscous materials such as water or molasses - though this feature is not yet highlighted in-game.
* Responsive sounds
  * Announcer will call out when you take shots and also when you score baskets
  * Sounds will play for each collision

The game starts immediately when the page is loaded but the user cannot interact with anything on screen other than the mute button and the play button. Controls for the game are shown on the bottom left - the shooting is done with click and drag mechanics. When you click, Steph Curry will elevate into his jumpshot. Protip: try to release at the top of his jump, as more elevation gives you a better chance of making shots in basketball!

![start_game](https://thumbs.gfycat.com/PointedAssuredCottontail-size_restricted.gif)

When there is 16 seconds left on the shot clock, the basket will begin to move, adding a layer of difficulty to the game. There can be a maximum of 10 balls rendered at a time, so take care not to shoot too quickly, lest your shot disappears on its way to the rim.

![moving_hoop](https://thumbs.gfycat.com/TightWanLark-size_restricted.gif)

When the shot clock expires and the buzzer sounds, the game displays how many baskets you made and gives you the option to replay the game.

![end_game](http://res.cloudinary.com/dfafbqoxx/image/upload/v1507309293/end_game_ciydhl.png)

## To Dos

Note that there are things in this game that are not fully developed, and I have a list of things I would like to add to the project:

1. The background gif size means that the game mechanics are slowed down by framerate issues and the game can sometimes feel a bit laggy. I want to be able to shrink the gif file somehow so that the game can run quicker.

2. The net physics has not been implemented. I would like to add in the cloth response to the basket movement as well as contact with basketballs.

3. The crowd noise and announcer voice can be obnoxious and abrupt. I would like to smooth out the transitions and change the frequency of "Curry for three!" calls.

## Credits

This game was developed entirely using HTML5, JavaScript, and Canvas. Some guidance from Google as well as Physics wikipedia was needed, but otherwise my intention was for this game to be made entirely from vanilla JavaScript.
