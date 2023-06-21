import Floor from "./map/floor";
import House from "./map/house";
import Map from "./map/map";
import Obstacle from "./map/obstacle";
import Road, { Point } from "./map/road";
import Terrain from "./map/terrain";

type TerrainAction = {type: "wall", props: {entranceDir: number}}
  | {type: "house", props: {x: number, y: number, width: number, height: number, entranceDir: number}};

export default class MapBuilder {
  private map: Map;

  constructor () {
    this.map = new Map();
  }

  public buildRoad (...points: Point[]): MapBuilder {
    const road = new Road(points);
    this.map.add(road);
    return this;
  }

  public buildObstacle (x: number, y: number, width: number, height: number): MapBuilder {
    const obstacle = new Obstacle(x, y, width, height);
    this.map.add(obstacle);
    return this;
  }

  public buildFloor (x: number, y: number, width: number, height: number, color: string): MapBuilder {
    const floor = new Floor(x, y, width, height, color);
    this.map.setFloor(floor);
    return this;
  }

  public buildTerrain (x: number, y: number, width: number, height: number, actions: TerrainAction[] = []): MapBuilder {
    const terrain = new Terrain(x, y, width, height);
    actions.forEach(({type, props}) => {
      switch (type) {
        case "wall":
          terrain.addWall(props);
          break;
        case "house":
          terrain.addHouse(props);
          break;
      }
    });
    this.map.add(terrain);
    return this;
  }

  public buildHouse (x: number, y: number, width: number, height: number, entranceDir: number): MapBuilder {
    const house = new House(x, y, width, height, entranceDir);
    this.map.add(house);
    return this;
  }

  public build (): Map {
    return this.map;
  }
}
