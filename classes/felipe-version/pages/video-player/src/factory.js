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

  await import("https://unpkg.com/@tensorflow/tfjs-core@2.4.0/dist/tf-core.js");
  await import("https://unpkg.com/@tensorflow/tfjs-converter@2.4.0/dist/tf-converter.js");
  await import("https://unpkg.com/@tensorflow/tfjs-backend-webgl@2.4.0/dist/tf-backend-webgl.js");
  await import("https://unpkg.com/@tensorflow-models/face-landmarks-detection@0.0.1/dist/face-landmarks-detection.js");

  console.log("libraries loaded!");

  const service = new Service({
    faceLandmarksDetection: window.faceLandmarksDetection,
  });

  const mockWorker = {
    async postMessage(video) {
      const { left, right } = await service.hasBlinked(video);
      // const blinked = left || right
      // if (!blinked) return;
      workerMock.onmessage({ data: { left, right } });
    },
    onmessage(msg) {}, // will override in the controller
  };

  console.log("loading tf model");
  await service.loadModel();
  console.log("tf model loaded");

  setTimeout(() => {
    mockWorker.postMessage({ data: "READY" });
  }, 500);

  return mockWorker;
}

const view = new View();
const [rootPath] = window.location.href.split("/pages/");
view.setVideoSrc(`${rootPath}/assets/video.mp4`);

const worker = await getWorker();
const camera = await Camera.init();

const factory = {
  async initialize() {
    return Controller.initialize({
      view,
      worker,
      camera,
    });
  },
};

export default factory;
