import Smoke from "../particle/smoke";
import Car from "./car";

export enum carStates { ON, OFF };

export abstract class CarState {
  protected car: Car;
  constructor (car: Car) {
    this.car = car;
  }

  abstract update(input: string[], deltaTime: number): void;
}

export class CarOnState extends CarState {
  update(input: string[], deltaTime: number) {
    this.car.game.addParticle(
      new Smoke(
        this.car.x - Math.cos((this.car.degree - 90) * (Math.PI / 180)) * (this.car.width * 0.2), // Posição X atrás do carro
        this.car.y - Math.sin((this.car.degree - 90) * (Math.PI / 180)) * (this.car.width * 0.2), // Posição Y atrás do carro
      )
    );
    //
    if (input.includes('Backspace')) {
      this.car.setState(carStates.OFF);
    } 
    if (input.includes('ArrowUp')) {
      if (this.car.speed < this.car.maxSpeed) {
        this.car.speed += this.car.acceleration;
      }
    } else if (input.includes('ArrowDown')) {
      if (this.car.speed > this.car.maxReverseSpeed) {
        this.car.speed -= this.car.acceleration;
      }
    }

    if (this.car.speed != 0) {
      if (input.includes('ArrowRight')) {
        this.car.degree += this.car.rotateSpeed * this.car.speed;
      }

      if (input.includes('ArrowLeft')) {
        this.car.degree -= this.car.rotateSpeed * this.car.speed;
      }
    }
  }
}

export class CarOffState extends CarState {
  update(input: string[], deltaTime: number) {
    if (input.includes('Enter')) {
      this.car.setState(carStates.ON);
    } 
  }
}
