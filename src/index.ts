import "./styles.css";

import Game from "./scripts/game";
import MapBuilder from "./scripts/mapBuilder";
import Car from "./scripts/car/car";
import Goal from "./scripts/goal";

window.addEventListener("load", function () {
  const canvas = document.querySelector("canvas");
  if (!canvas) return;
  const context = canvas.getContext("2d");
  if (!context) return;
  canvas.width = 1000;
  canvas.height = 700;
  //
  const game = new Game(canvas.width, canvas.height);

  const map = new MapBuilder()
    .buildRoad({x: 0, y: 50}, {x: canvas.width, y: 50})
    .buildRoad({x: 300, y: 92}, {x: 300, y: canvas.height})
    .buildRoad({x: 342, y: 500}, {x: canvas.width, y: 500})
    .buildRoad({x: 850, y: 458}, {x: 850, y: 300})
    .buildHouse(670, 120, 300, 150, 0)
    .buildTerrain(370, 120, 250, 200, [
      {type: 'wall', props: {entranceDir: 3}},
      {type: 'house', props: {x: 100, y: 25, width: 120, height: 150, entranceDir: 3}},
    ])
    .buildTerrain(10, 120, 220, 270, [
      {type: 'house', props: {x: 10, y: 100, width: 200, height: 160, entranceDir: 1}},
      {type: 'house', props: {x: 10, y: 10, width: 100, height: 60, entranceDir: 2}},
    ])
    .buildTerrain(10, 400, 220, 270, [
      {type: 'house', props: {x: 10, y: 10, width: 200, height: 250, entranceDir: 1}},
    ])
    .buildTerrain(360, 560, 400, 400, [
      {type: 'wall', props: {entranceDir: 4}},
    ])
    .buildFloor(0, 0, canvas.width, canvas.height, '#136d15')
    .buildTrafficSignal(240, 56, 0)
    .buildTrafficSignal(262, 446, 1)
    .build();
  const car = new Car(game, {x: 25, y: 72, degree: 90});
  const goal = new Goal(860, 280);

  game.setMap(map);
  game.setCar(car);
  game.setGoal(goal);

  let lastTime = 0;
  const animate = (timestamp: number):void => {
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    context.clearRect(0, 0, canvas.width, canvas.height);
    game.update(deltaTime);
    game.draw(context);
    if (!game.win && !game.gameOver) window.requestAnimationFrame(animate);
  };
  animate(0);
});
