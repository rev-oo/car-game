import { MapComponent } from "./component";

export default class Obstacle extends MapComponent {
  private x: number;
  private y: number;
  private width: number;
  private height: number;

  constructor(x: number, y: number, width: number, height: number) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw(context: CanvasRenderingContext2D): void {
    // Lógica para desenhar um obstáculo no contexto do canvas
  }
}
