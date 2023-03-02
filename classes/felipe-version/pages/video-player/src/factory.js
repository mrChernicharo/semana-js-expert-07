import Controller from "./controller.js";
import Service from "./service.js";
import View from "./view.js";
import Camera from "../../../lib/shared/camera.js";
import { supportsWorkerType } from "../../../lib/shared/util.js";

async function getWorker() {
  if (supportsWorkerType()) {
    console.log("webWorkers supported! 🎸");

    const worker = new Worker("./src/worker.js", { type: "module" });
    return worker;
  }
  console.warn("webWorkers NOT supported");
  const mockWorker = {
    message(msg) {},
    async postMessage() {},
  };
  return mockWorker;
}

const worker = await getWorker();
const camera = await Camera.init();

const [rootPath] = window.location.href.split("/pages/");
const factory = {
  async initialize() {
    return Controller.initialize({
      view: new View(),
      worker,
      camera,
    });
  },
};

export default factory;
