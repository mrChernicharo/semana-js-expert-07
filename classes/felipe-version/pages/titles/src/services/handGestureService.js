export default class HandGestureService {
  #fingerpose;
  #handPoseDetection;
  #handsVersion;
  #detector = null;
  constructor({ fingerpose, handPoseDetection, handsVersion }) {
    this.#fingerpose = fingerpose;
    this.#handPoseDetection = handPoseDetection;
    this.#handsVersion = handsVersion;
  }

  async initializeDetector() {
    if (this.#detector) return this.#detector;

    const model = handPoseDetection.SupportedModels.MediaPipeHands;
    const detectorConfig = {
      runtime: "mediapipe", // or 'tfjs',
      solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/hands@${
        this.#handsVersion
      }`, // freeze version
      modelType: "lite", // or 'full'
      maxHands: 2,
    };
    this.#detector = await this.#handPoseDetection.createDetector(
      model,
      detectorConfig
    );
  }

  async estimateHands(video) {
    console.log('estimateHands', { detector: this.#detector, video })
    return this.#detector.estimateHands(video, {
      flipHorizontal: true,
    });
  }
}
