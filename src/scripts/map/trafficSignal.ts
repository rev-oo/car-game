import { Box, Vector } from "sat";
import { MapComponent } from "./component";
import { TrafficSignalGreen, TrafficSignalRed, TrafficSignalState, TrafficSignalYellow, trafficSignalStates } from "./trafficSinalStates";

export default class TrafficSignal extends MapComponent {
  private x: number;
  private y: number;
  private width: number;
  private height: number;
  private dir: number;
  public time: number;
  public maxTime: number;
  private box: Box;

  private states: {[key: number]: TrafficSignalState};
  private currentState: TrafficSignalState;

  constructor (x: number, y: number, dir: number) {
    super()
    this.x = x;
    this.y = y;
    this.dir = dir;
    if (dir == 0) {
      this.width = 10;
      this.height = 30;
    } else {
      this.width = 30;
      this.height = 10;
    }
    this.box = new Box(new Vector(this.x, this.y), this.width, this.height);

    this.time = 0;
    this.maxTime = 0;
    this.states = {
      [trafficSignalStates.GREEN]: new TrafficSignalGreen(this),
      [trafficSignalStates.RED]: new TrafficSignalRed(this),
      [trafficSignalStates.YELLOW]: new TrafficSignalYellow(this),
    };
    this.currentState = this.states[trafficSignalStates.GREEN];
    this.setState(trafficSignalStates.GREEN);
  }

  draw (context: CanvasRenderingContext2D) {
    context.fillStyle = '#1C1F1E';
    context.fillRect(this.x, this.y, this.width, this.height);
    if (this.dir == 0) {
      const middle = this.height / 3 / 2;
      const section = this.height / 3;
      context.beginPath();
      context.fillStyle = '#FE5E5A' + (this.currentState !instanceof TrafficSignalRed ? '' : '40');
      context.arc(this.x + this.width / 2, this.y + (section * 0 + middle), 3, 0, 2 * Math.PI);
      context.fill();
      context.beginPath();
      context.fillStyle = '#FEC957' + (this.currentState !instanceof TrafficSignalYellow ? '' : '40');
      context.arc(this.x + this.width / 2, this.y + (section * 1 + middle), 3, 0, 2 * Math.PI);
      context.fill();
      context.beginPath();
      context.fillStyle = '#2DCA5E' + (this.currentState !instanceof TrafficSignalGreen ? '' : '40');
      context.arc(this.x + this.width / 2, this.y + (section * 2 + middle), 3, 0, 2 * Math.PI);
      context.fill();
    } else {
      const middle = this.width / 3 / 2;
      const section = this.width / 3;
      context.beginPath();
      context.fillStyle = '#FE5E5A' + (this.currentState !instanceof TrafficSignalRed ? '' : '40');
      context.arc(this.x + (section * 0 + middle), this.y + this.height / 2, 3, 0, 2 * Math.PI);
      context.fill();
      context.beginPath();
      context.fillStyle = '#FEC957' + (this.currentState !instanceof TrafficSignalYellow ? '' : '40');
      context.arc(this.x + (section * 1 + middle), this.y + this.height / 2, 3, 0, 2 * Math.PI);
      context.fill();
      context.beginPath();
      context.fillStyle = '#2DCA5E' + (this.currentState !instanceof TrafficSignalGreen ? '' : '40');
      context.arc(this.x + (section * 2 + middle), this.y + this.height / 2, 3, 0, 2 * Math.PI);
      context.fill();
    }
  }

  update (deltaTime: number): void {
    this.time += deltaTime;
    if (this.time >= this.maxTime) {
      this.currentState.next();
    }
  }

  getBox (): Box|void {
    return this.currentState instanceof TrafficSignalRed ? this.box : undefined;
  }

  setState (state: trafficSignalStates): void {
    this.currentState = this.states[state];
    this.currentState.enter();
  }
}