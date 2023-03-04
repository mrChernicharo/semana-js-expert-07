export default class HandGestureController {
  #view;
  #service;
  #camera;
  constructor({ view, service, camera }) {
    this.#service = service;
    this.#view = view;
    this.#camera = camera;
  }

  async init() {
    await this.#loop();
  }

  async #estimateHands() {
    try {
      const hands = await this.#service.estimateHands(this.#camera.video);
      console.log({ hands });
    } catch (err) {
      console.log(err);
    }
  }

  async #loop() {
    await this.#service.initializeDetector();
    await this.#estimateHands();
    this.#view.loop(this.#loop.bind(this))
  }

  static async initialize(deps) {
    const controller = new HandGestureController(deps);
    return controller.init();
  }
}
