export default class Controller {
  #view;
  #worker;
  #camera;
  #blinkCounter = 0;
  constructor({ view, worker, camera }) {
    this.#view = view;
    this.#camera = camera;
    this.#worker = this.#configureWorker(worker);

    this.#view.configureOnBtnClick(this.onBtnStart.bind(this));
  }

  static async initialize(deps) {
    const controller = new Controller(deps);
    controller.log("loading...");
    return controller.init();
  }

  #configureWorker(worker) {
    let ready = false;
    worker.onmessage = (msg) => {
      if (msg.data === "READY") {
        this.log("Click to initialize eyes detection");
        this.#view.enableButton();
        ready = true;
        return;
      }

      const blinked = msg.data.blinked;
      this.#blinkCounter += 1;
      console.log("blinked", { blinked });
    };

    return {
      send(msg) {
        if (!ready) return;

        worker.postMessage(msg);
      },
    };
  }

  async init() {
    console.log("controller init!!!");
  }

  loop() {
    const video = this.#camera.video;
    const img = this.#view.getVideoFrame(video);

    this.#worker.send(img);
    this.log("...detecting eye blink");

    setTimeout(() => this.loop(), 200);
  }

  log(text) {
    const times = `   - blinked ${this.#blinkCounter} times`;
    this.#view.log(`${text} ${times}`);
  }

  onBtnStart() {
    this.loop();
    this.#blinkCounter = 0;
  }
}
