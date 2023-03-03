export default class Controller {
  #view;
  #worker;
  #camera;
  #eyeStateString = "";
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

      const { left, right } = msg.data;
      let eyes = "";
      left && (eyes += "Left eye ");
      right && (eyes += "Right eye ");
      if (!eyes) eyes += "idle";
      this.#eyeStateString = eyes;
      this.log(this.#eyeStateString);
      eyes !== 'idle' && this.#view.togglePlayVideo()
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

    setTimeout(() => this.loop(), 100);
  }

  log(text) {
    this.#view.log(`${text}`);
  }

  onBtnStart() {
    this.loop();
  }
}
