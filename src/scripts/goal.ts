import { Box, Vector, testPolygonPolygon } from "sat";
import Car from "./car/car";
import { CarOffState } from "./car/carStates";

export default class Goal {
  private x: number;
  private y: number;
  public width: number;
  public height: number;
  private image: HTMLImageElement;
  private box: Box;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.image = document.querySelector('img#flag') as HTMLImageElement;
    this.width = this.image.width;
    this.height = this.image.height;
    this.box = new Box(new Vector(x, y), this.width, this.height);
  }

  draw (context: CanvasRenderingContext2D): void {
    context.drawImage(
      this.image,
      this.x,
      this.y,
      this.width,
      this.height,
    );
  }

  checkWin (car: Car): boolean {
    return car.currentState instanceof CarOffState
      && testPolygonPolygon(car.polygon, this.box.toPolygon());
  }
}