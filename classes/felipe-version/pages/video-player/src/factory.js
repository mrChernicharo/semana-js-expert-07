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
  console.log("importing libraries...");

  // prettier-ignore
  await import ("https://unpkg.com/@tensorflow/tfjs-core@2.4.0/dist/tf-core.js");
  // prettier-ignore
  await import ("https://unpkg.com/@tensorflow/tfjs-converter@2.4.0/dist/tf-converter.js");
  // prettier-ignore
  await import ("https://unpkg.com/@tensorflow/tfjs-backend-webgl@2.4.0/dist/tf-backend-webgl.js");
  // prettier-ignore
  await import ("https://unpkg.com/@tensorflow-models/face-landmarks-detection@0.0.1/dist/face-landmarks-detection.js");

  console.log("libraries loaded!");

  const service = new Service({
    faceLandmarksDetection: window.faceLandmarksDetection,
  });

  const mockWorker = {
    async postMessage(video) {
      const blinked = await service.hasBlinked(video);
      if (!blinked) return;
      workerMock.onmessage({ data: { blinked } });
    },
    onmessage(msg) {}, // will override in the controller
  };

  console.log("loading tf model");
  await service.loadModel();
  console.log("tf model loaded");

  setTimeout(() => {
    mockWorker.postMessage({ data: "READY" });
  }, 1000);

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
