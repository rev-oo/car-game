import { Box } from "sat";

export abstract class MapComponent {
  abstract draw (context: CanvasRenderingContext2D): void;
  getBox (): Box|void {}
}
