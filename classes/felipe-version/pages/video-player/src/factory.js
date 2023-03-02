import Controller from "./controller.js";
import Service from "./service.js";
import View from "./view.js";
import Camera from "../../../lib/shared/camera.js";

const camera = Camera.init();

const [rootPath] = window.location.href.split("/pages/");
const factory = {
  async initialize() {
    return Controller.initialize({
      view: new View({}),
      service: new Service({})
    });
  },
};

export default factory;
