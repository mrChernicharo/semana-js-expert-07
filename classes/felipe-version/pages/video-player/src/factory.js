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


const camera = Camera.init();
const [rootPath] = window.location.href.split("/pages/");
const factory = {
  async initialize() {
    return Controller.initialize({
      view: new View(),
      service: new Service({}),
      worker
    });
  },
};
console.log(worker)
worker.postMessage('hello from factory')
export default factory;
