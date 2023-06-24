import { Box, Vector } from "sat";
import { MapComponent } from "./component";

export type HouseType = InstanceType<typeof House>;

type ColorSet = {c1: string, c2: string, c3: string};

const COLORS: ColorSet[] = [
  {c1: '#bf6040', c2: '#a25134', c3: '#8b452b'},
  {c1: '#b3bdbe', c2: '#94999d', c3: '#757a7d'},
  {c1: '#7499b6', c2: '#4d667c', c3: '#62809c'},
  // {c1: '#FFB841', c2: '#E78F10', c3: '#FF9608'},
  // {c1: '#FD8D5A', c2: '#E46E41', c3: '#F07A50'},
];

export default class House implements MapComponent {
  private x: number;
  private y: number;
  private width: number;
  private height: number;
  private entranceDir: number;
  public box: Box;
  private colorSet: ColorSet;

  constructor(x: number, y: number, width: number, height: number, entranceDir: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.entranceDir = entranceDir;
    this.box = new Box(new Vector(x, y), width, height);
    this.colorSet = COLORS[Math.floor(Math.random() * COLORS.length)];
  }

  draw(context: CanvasRenderingContext2D): void {
    switch (this.entranceDir) {
      case 0:
      case 2:
        context.fillStyle = this.colorSet.c2;
        context.fillRect(this.x, this.y, this.width, this.height / 2);
        context.fillStyle = this.colorSet.c3;
        context.fillRect(this.x, this.y + this.height / 2, this.width, this.height / 2);
        context.fillStyle = this.colorSet.c1;
        context.beginPath();
        context.moveTo(this.x, this.y);
        context.lineTo(this.x, this.y + this.height);
        context.lineTo(this.x + this.width / 4, this.y + this.height / 2);
        context.lineTo(this.x, this.y);
        context.moveTo(this.x + this.width, this.y);
        context.lineTo(this.x + this.width - this.width / 4, this.y + this.height / 2);
        context.lineTo(this.x + this.width, this.y + this.height);
        context.lineTo(this.x + this.width, this.y);
        context.fill();
        break;
      case 1:
      case 3:
        context.fillStyle = this.colorSet.c2;
        context.fillRect(this.x, this.y, this.width / 2, this.height);
        context.fillStyle = this.colorSet.c3;
        context.fillRect(this.x + this.width / 2, this.y, this.width / 2, this.height);
        context.fillStyle = this.colorSet.c1;
        context.beginPath();
        context.moveTo(this.x, this.y);
        context.lineTo(this.x + this.width, this.y);
        context.lineTo(this.x + this.width / 2, this.y + this.height / 4);
        context.lineTo(this.x, this.y);
        context.moveTo(this.x, this.y + this.height);
        context.lineTo(this.x + this.width / 2, this.y + this.height - this.height / 4);
        context.lineTo(this.x + this.width, this.y + this.height);
        context.lineTo(this.x, this.y + this.height);
        context.fill();
        break;
    }
  }

  update (deltaTime: number): void {}

  getBox(): Box {
    return this.box;
  }
}
