export default class Controller {
  #view;
  #service;
  #worker;
  constructor({ view, service, worker }) {
    this.#view = view;
    this.#service = service;
    this.#worker = this.#configureWorker(worker);

    this.#view.configureOnBtnClick(this.onBtnStart.bind(this));
  }

  static async initialize(deps) {
    const controller = new Controller(deps);
    controller.log("Click to start");
    return controller.init();
  }

  #configureWorker(worker) {
    worker.onmessage = (msg) => {
      return console.log("recebi!", msg.data, { msg });
    };

    return worker;
  }

  async init() {
    console.log("controller init!!!");
  }

  log(text) {
    this.#view.log(`logger: ${text}`);
  }

  onBtnStart() {
    this.log("initializing eyes detection...");
  }
}
