export default class HandGestureController {
  #view;
  #service;
  #camera
  constructor({ view, service, camera }) {
    this.#service = service;
    this.#view = view;
    this.#camera = camera;
  }

  async init() {
    await this.#service.initializeDetector()
  }

  static async initialize(deps) {
    const controller = new HandGestureController(deps);
    return controller.init();
  }
}
