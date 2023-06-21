import Particle from "./particle";

export default class Smoke extends Particle {
  private color: string = '#FFFFFF40';

  draw (context: CanvasRenderingContext2D) {
    context.beginPath();
    context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    context.fillStyle = this.color;
    context.fill();
  }
}