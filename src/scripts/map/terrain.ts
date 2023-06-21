import { Box, Vector } from "sat";
import { MapComponent } from "./component";
import House from "./house";
import Wall from "./wall";

export default class Terrain extends MapComponent {
  private x: number;
  private y: number;
  private width: number;
  private height: number;
  private components: MapComponent[] = [];
  private box: Box;

  constructor(x: number, y: number, width: number, height: number) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.box = new Box(new Vector(x, y), width, height);
  }

  draw(context: CanvasRenderingContext2D): void {
    context.fillStyle = '#9b7653';
    context.fillRect(this.x, this.y, this.width, this.height);
    for (const c of this.components) {
      c.draw(context);
    }
  }

  addWall ({entranceDir}: {entranceDir: number}): void {
    const wall = new Wall(this.x, this.y, this.width, this.height, entranceDir);
    this.components.push(wall);
  }

  addHouse ({x, y, width, height, entranceDir}: {x: number, y: number, width: number, height: number, entranceDir: number}): void {
    const house = new House(this.x + x, this.y + y, width, height, entranceDir);
    this.components.push(house);
  }

  getBox(): Box {
    return this.box;
  }
}
