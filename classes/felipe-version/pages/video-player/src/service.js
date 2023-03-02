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
}
