export default class Service {
  #model;
  #faceLandmarksDetection;
  constructor({ faceLandmarksDetection }) {
    this.#faceLandmarksDetection = faceLandmarksDetection;
  }

  async loadModel() {
    // this.#faceLandmarksDetection;
    this.#model = await this.#faceLandmarksDetection.load(
      this.#faceLandmarksDetection.SupportedPackages.mediapipeFacemesh,
      { maxFaces: 1 }
    );
  }

  async hasBlinked(video) {
    const preditions = await this.#estimateFaces(video);
    console.log({ preditions });
  }

  #estimateFaces(video) {
    return this.#model.estimateFaces({
      input: video,
      flipHorizontal: true,
      returnTensors: false,
      predictIrises: true,
    });
  }
}
