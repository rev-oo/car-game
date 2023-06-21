import Game from "./game";

export default class InputHandler {
  private keys: string[];

  constructor () {
    this.keys = [];

    const keys = ["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight", "Enter", "Backspace"];
    window.addEventListener("keydown", (e) => {
      if (keys.includes(e.key) && !this.keys.includes(e.key)) {
        this.keys.push(e.key);
      }
    });
    window.addEventListener("keyup", (e) => {
      if (this.keys.includes(e.key)) {
        this.keys.splice(this.keys.indexOf(e.key), 1);
      }
    });
  }

  public getKeys ():string[] {
    return this.keys
  }
}