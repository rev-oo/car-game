import { MapComponent } from "./component";

export default class Wall implements MapComponent {
  private x: number;
  private y: number;
  private width: number;
  private height: number;
  private entranceDir: number;

  constructor(x: number, y: number, width: number, height: number, entranceDir: number = 0) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.entranceDir = entranceDir;
  }

  getBox(): void {}

  draw(context: CanvasRenderingContext2D): void {
    context.strokeStyle = '#BC4A3C';
    context.setLineDash([]);
    context.lineWidth = 2;
    context.strokeRect(this.x, this.y, this.width, this.height);
    context.setLineDash([5, 2]);
    context.lineWidth = 4;
    context.strokeRect(this.x, this.y, this.width, this.height);
    context.setLineDash([]);
    context.fillStyle = '#BC4A3C';
    context.lineWidth = 1;
    context.fillRect(this.x - 4, this.y - 4, 8, 8);
    context.fillRect(this.x - 4 + this.width, this.y - 4, 8, 8);
    context.fillRect(this.x - 4, this.y - 4 + this.height, 8, 8);
    context.fillRect(this.x - 4 + this.width, this.y - 4 + this.height, 8, 8);

    const entranceLength = 30;
    context.fillStyle = '#9b7653';
    switch (this.entranceDir) {
      case 0:
        context.fillRect(
          this.x + this.width / 2 - entranceLength / 2,
          this.y - 2,
          entranceLength,
          4
        );
        break;
      case 1:
        context.fillRect(
          this.x + this.width - 2,
          this.y + this.height / 2 - entranceLength / 2,
          4,
          entranceLength
        );
        break;
      case 2:
        context.fillRect(
          this.x + this.width / 2 - entranceLength / 2,
          this.y + this.height - 2,
          entranceLength,
          4
        );
        break;
      case 3:
        context.fillRect(
          this.x - 2,
          this.y + this.height / 2 - entranceLength / 2,
          4,
          entranceLength
        );
        break;
    }
  }

  update (deltaTime: number): void {}
}
