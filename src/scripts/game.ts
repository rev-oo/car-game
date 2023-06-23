import Car from "./car/car";
import Goal from "./goal";
import InputHandler from "./inputHandler";
import Map from "./map/map";
import Particle from "./particle/particle";

export default class Game {
  private width: number;
  private height: number;
  private map: Map|null;
  private car: Car|null;
  private goal: Goal|null;
  private particles: Particle[] = [];
  private inputHandler: InputHandler;
  public win: boolean = false;
  public gameOver: boolean = false;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.map = null;
    this.car = null;
    this.goal = null;
    this.inputHandler = new InputHandler();
  }

  public setMap(map: Map): void {
    this.map = map;
  }

  public setCar(car: Car): void {
    this.car = car;
  }

  public setGoal(goal: Goal): void {
    this.goal = goal;
  }

  public addParticle (particle: Particle): void {
    this.particles.push(particle);
  }

  public update(deltaTime: number): void {
    this.checkCollision();
    this.checkWin()
    //
    if (this.map) {
      this.map.update(deltaTime);
    }
    if (this.car) {
      this.car.update(this.inputHandler.getKeys(), deltaTime);
    }
    this.particles.forEach((particle) => {
      particle.update();
    });

    this.particles = this.particles.filter(particle => !particle.markedForDeletion);
  }

  public draw(context: CanvasRenderingContext2D): void {
    if (this.map) {
      this.map.draw(context);
    }
    if (this.goal) {
      this.goal.draw(context);
    }
    if (this.car) {
      this.car.draw(context);
    }
    this.particles.forEach((particle) => {
      particle.draw(context);
    });
  }

  public checkCollision (): void {
    if (this.car) {
      if (this.map?.checkCollision(this.car.polygon)) {
        this.gameOver = true;
        alert("Colisão");
      }
    }
  }

  public checkWin (): void {
    if (this.car && this.goal && this.goal.checkWin(this.car)) {
      this.win = true;
      alert("Fim");
    }
  }
}