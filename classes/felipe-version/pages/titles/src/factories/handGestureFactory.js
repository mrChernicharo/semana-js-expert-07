import "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-core@4.2.0/dist/tf-core.min.js";                              // tensorflow-core
import "https://unpkg.com/@tensorflow/tfjs-backend-webgl@3.7.0/dist/tf-backend-webgl.min.js";                       // tensorflow-backend
import "https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1646424915/hands.min.js";                                 // hands
import "https://cdn.jsdelivr.net/npm/@tensorflow-models/hand-pose-detection@2.0.0/dist/hand-pose-detection.min.js"; // hand-pose-detection
import "https://cdn.jsdelivr.net/npm/fingerpose@0.1.0/dist/fingerpose.min.js";                                      // fingerPose

// window.fp, handPoseDetection

import HandGestureController from "../controllers/handGestureController.js";
import HandGestureService from "../services/handGestureService.js";
import HandGestureView from "../views/handGestureView.js";
import Camera from '../../../../lib/shared/camera.js'


const [rootPath] = window.location.href.split("/pages/");

const camera = await Camera.init();

const handGestureFactory = {
  async initialize() {
    return HandGestureController.initialize({
      camera,
      view: new HandGestureView(),
      service: new HandGestureService({
        fingerpose: window.fp,
        handPoseDetection: window.handPoseDetection,
        handsVersion: window.VERSION
      }),
    });
  },
};

export default handGestureFactory;
