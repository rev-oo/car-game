import TrafficSignal from "./trafficSignal";

export enum trafficSignalStates {
  RED, YELLOW, GREEN
};

export abstract class TrafficSignalState {
  protected ts: TrafficSignal;
  constructor (ts: TrafficSignal) {
    this.ts = ts;
  }

  abstract enter (): void;
  abstract next (): void;
}

export class TrafficSignalRed extends TrafficSignalState {
  enter () {
    this.ts.maxTime = 5000;
    this.ts.time = 0;
  }

  next (): void {
    this.ts.setState(trafficSignalStates.GREEN);
  }
}

export class TrafficSignalGreen extends TrafficSignalState {
  enter () {
    this.ts.maxTime = 3000;
    this.ts.time = 0;
  }

  next (): void {
    this.ts.setState(trafficSignalStates.YELLOW);
  }
}

export class TrafficSignalYellow extends TrafficSignalState {
  enter () {
    this.ts.maxTime = 2000;
    this.ts.time = 0;
  }

  next (): void {
    this.ts.setState(trafficSignalStates.RED);
  }
}
