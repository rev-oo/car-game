import { Polygon, testPolygonPolygon } from "sat";
import { MapComponent } from "./component";
import Floor from "./floor";

export default class Map {
  private components: MapComponent[] = [];
  private floor?: Floor;

  public add (component: MapComponent): void {
    this.components.push(component);
  }

  public setFloor (floor: Floor): void {
    this.floor = floor;
  }

  public update (deltaTime: number):void {
    for (const c of this.components) {
      c.update(deltaTime);
    }
  }

  public draw(context: CanvasRenderingContext2D): void {
    if (this.floor) {
      this.floor.draw(context);
    }

    for (const c of this.components) {
      c.draw(context);
    }
  }
  
  public checkCollision (polygon: Polygon): boolean {
    for (const c of this.components) {
      const box = c.getBox();
      if (box && testPolygonPolygon(polygon, box.toPolygon())) {
        return true;
      };
    }
    return false;
  }
}
