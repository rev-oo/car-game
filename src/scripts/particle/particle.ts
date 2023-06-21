export default abstract class Particle {
  protected x: number;
  protected y: number;
  protected size: number;
  private speedX: number;
  private speedY: number;
  public markedForDeletion: boolean;

  constructor (x: number, y: number) {
    this.markedForDeletion = false;
    this.x = x;
    this.y = y;
    this.size = Math.random() + 1;
    this.speedX = Math.random();
    this.speedY = Math.random();
  }

  update () {
    this.x -= this.speedX;
    this.y -= this.speedY;
    this.size *= 1.025;
    if (this.size > 5) this.markedForDeletion = true;
  }

  abstract draw (context: CanvasRenderingContext2D): void;
}
