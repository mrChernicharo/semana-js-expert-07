export default class HandGestureService {
  #handPoseDetection;
  #handsVersion;
  #detector = null;
  #gestureEstimator;
  #knownGestures;
  #gestureStrings;
  constructor({ fingerpose, handPoseDetection, handsVersion, knownGestures, gestureStrings }) {
    this.#handPoseDetection = handPoseDetection;
    this.#handsVersion = handsVersion;
    this.#gestureEstimator = new fingerpose.GestureEstimator(knownGestures);
    this.#knownGestures = knownGestures;
    this.#gestureStrings = gestureStrings;
  }

  async initializeDetector() {
    if (this.#detector) return this.#detector;

    const model = handPoseDetection.SupportedModels.MediaPipeHands;
    const detectorConfig = {
      runtime: "mediapipe", // or 'tfjs',
      solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/hands@${this.#handsVersion}`, // freeze version
      modelType: "lite", // or 'full'
      maxHands: 2,
    };
    this.#detector = await this.#handPoseDetection.createDetector(model, detectorConfig);

    // console.log('initializeDetector', { detector: this.#detector, model })
  }

  async estimateHands(video) {
    // console.log('estimateHands', { detector: this.#detector, video })
    return this.#detector.estimateHands(video, {
      flipHorizontal: true,
    });
  }

  async *detectGestures(predictions) {
    for (const hand of predictions) {
      if (!hand.keypoints3D) continue;

      const { gestures, poseData } = await this.getPredictions(hand.keypoints3D);

      if (!gestures.length) continue;

      const result = gestures.reduce((acc, next) => (acc.score > next.score ? acc : next));

      const { x, y } = hand.keypoints.find((keypoint) => keypoint.name === "index_finger_tip");

      // console.log({ ...result, emoji: this.#gestureStrings[result.name], hand, gestures, poseData, x, y  }); 

      yield { event: result.name, x, y };
    }
  }

  async getPredictions(keypoints3D) {
    const trustLevel = 9;
    const predictions = await this.#gestureEstimator.estimate(this.#getLandmarksFromKeypoints(keypoints3D), trustLevel);
    return predictions;
  }

  #getLandmarksFromKeypoints(keypoints3D) {
    return keypoints3D.map((point) => [point.x, point.y, point.z]);
  }
}
