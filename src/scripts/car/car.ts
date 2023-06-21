import { Polygon, Vector } from "sat";
import Game from "../game";
import { rotatePoint } from "../utils";
import { CarOffState, CarOnState, CarState, carStates } from "./carStates";

export default class Car {
  public game: Game;
  private image: HTMLImageElement;
  public x: number;
  public y: number;
  public width: number;
  public height: number;
  public degree: number;
  public speed: number;
  public maxSpeed: number;
  public maxReverseSpeed: number;
  public acceleration: number;
  public resistance: number;
  public rotateSpeed: number;

  private states: {[key: number]: CarState};
  public currentState: CarState;

  constructor (game: Game, {x, y, degree}: {x: number, y: number, degree: number}) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.degree = degree;
    //
    this.image = document.querySelector('#car') as HTMLImageElement;
    this.width = this.image.width;
    this.height = this.image.height;
    //
    this.speed = 0;
    this.maxSpeed = 3;
    this.maxReverseSpeed = -1;
    this.acceleration = 0.05;
    this.resistance = 0.02;
    this.rotateSpeed = 0.75;
    //
    this.states = {
      [carStates.ON]: new CarOnState(this),
      [carStates.OFF]: new CarOffState(this),
    };
    this.currentState = this.states[carStates.OFF];
  }

  update (input: string[], deltaTime: number) {
    this.currentState.update(input, deltaTime);
    //
    if (this.speed > 0) {
      this.speed -= this.resistance;
      this.speed = Math.max(0, this.speed);
    } else if (this.speed < 0) {
      this.speed += this.resistance;
      this.speed = Math.min(0, this.speed);
    }
    // Calcula a direção do movimento com base no grau
    const radian = (this.degree - 90) * (Math.PI / 180);
    const dx = Math.cos(radian) * this.speed;
    const dy = Math.sin(radian) * this.speed;
  
    // Atualiza as coordenadas x e y para mover o carro
    this.x += dx;
    this.y += dy;
  }

  draw (context: CanvasRenderingContext2D): void {
    context.save();
    context.translate(this.x, this.y);
    context.rotate((Math.PI / 180) * this.degree);

    context.drawImage(
      this.image,
      0,
      0,
      this.width,
      this.height,
      -this.width * 0.1,
      -this.height * 0.1,
      this.width * 0.2,
      this.height * 0.2
    );
    context.restore();
  }

  get radian (): number {
    return (this.degree - 90) * (Math.PI / 180);
  }
  
  setState (state: carStates) {
    this.currentState = this.states[state];
  }

  get polygon (): Polygon {
    const topLeft = rotatePoint(
      -this.width * 0.1,
      -this.height * 0.1,
      this.degree
    );
    const topRight = rotatePoint(
      this.width * 0.1,
      -this.height * 0.1,
      this.degree
    );
    const bottomRight = rotatePoint(
      this.width * 0.1,
      this.height * 0.1,
      this.degree
    );
    const bottomLeft = rotatePoint(
      -this.width * 0.1,
      this.height * 0.1,
      this.degree
    );

    const points = [
      new Vector(this.x + topLeft.x, this.y + topLeft.y),
      new Vector(this.x + topRight.x, this.y + topRight.y),
      new Vector(this.x + bottomRight.x, this.y + bottomRight.y),
      new Vector(this.x + bottomLeft.x, this.y + bottomLeft.y)
    ];

    return new Polygon(new Vector(), points);
  }
}