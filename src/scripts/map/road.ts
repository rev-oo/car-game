import { MapComponent } from "./component";

export type Point = {
  x: number;
  y: number;
};

export default class Road extends MapComponent {
  private points: Point[];
  private path: Path2D;

  constructor(points: Point[]) {
    super();
    this.points = points;
    this.path = new Path2D();
    this.path.moveTo(this.points[0].x, this.points[0].y);
    for (const point of this.points) {
      this.path.lineTo(point.x, point.y);
    }
  }

  draw(context: CanvasRenderingContext2D): void {
    // Lógica para desenhar uma estrada no contexto do canvas
    context.setLineDash([]);
    context.lineWidth = 92;
    context.strokeStyle = '#D2D1CD';
    context.stroke(this.path);
    //
    context.lineWidth = 84;
    context.strokeStyle = '#2A2922';
    context.stroke(this.path);
    //
    context.setLineDash([5, 15]);
    context.lineWidth = 2;
    context.strokeStyle = '#FFFFFF';
    context.stroke(this.path);
  }
}
