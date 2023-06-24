import { Box } from "sat";

export interface MapComponent {
  draw (context: CanvasRenderingContext2D): void;
  update (deltaTime: number): void;
  getBox (): Box|void;
}
