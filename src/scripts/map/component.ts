import { Box } from "sat";

export abstract class MapComponent {
  abstract draw (context: CanvasRenderingContext2D): void;
  abstract update (deltaTime: number): void;
  getBox (): Box|void {}
}
