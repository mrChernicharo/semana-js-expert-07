import { prepareRunChecker } from "../../../../lib/shared/util.js";

const { shouldRun: scrollShouldRun } = prepareRunChecker({ timeDelay: 300 });

const pixelsPerScroll = 250;
export default class HandGestureController {
  #view;
  #service;
  #camera;
  #lastDirection = {
    direction: "",
    y: 0,
  };
  constructor({ view, service, camera }) {
    this.#service = service;
    this.#view = view;
    this.#camera = camera;
    this.#lastDirection.y = document.scrollingElement.scrollTop
  }

  async init() {
    await this.#loop();
  }

  #scrollPage(direction) {
    if (this.#lastDirection.direction === direction) {
      let nextPos =
        direction === "scroll-down" ? this.#lastDirection.y + pixelsPerScroll : this.#lastDirection.y - pixelsPerScroll;

      if (nextPos < 0) nextPos = 0;
      if (nextPos > document.scrollingElement.scrollHeight) nextPos = document.scrollingElement.scrollHeight;

      this.#lastDirection.y = nextPos;
    } else {
      this.#lastDirection.direction = direction;
    }

    this.#view.scrollPage(this.#lastDirection.y);
  }

  async #estimateHands() {
    try {
      const hands = await this.#service.estimateHands(this.#camera.video);

      this.#view.clearCanvas();

      if (hands?.length) {
        this.#view.drawResults(hands);
      }

      for await (const { event, x, y } of this.#service.detectGestures(hands)) {
        // console.log({ event, x, y });
        if (event.includes("scroll")) {
          if (!scrollShouldRun()) continue;
          this.#scrollPage(event);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  async #loop() {
    await this.#service.initializeDetector();
    await this.#estimateHands();

    this.#view.loop(this.#loop.bind(this));
  }

  static async initialize(deps) {
    const controller = new HandGestureController(deps);
    return controller.init();
  }
}
