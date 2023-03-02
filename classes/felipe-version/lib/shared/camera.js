export default class Camera {
  video;
  constructor() {
    this.video = document.createElement("video");
  }

  static async init() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error(
        `Browser Api navigator.mediaDevices.getUserMedia not available`
      );
    }

    const videoConfig = {
      audio: false,
      video: {
        width: globalThis.screen.availWidth,
        height: globalThis.screen.availHeight,
        frameRate: {
          ideal: 60,
        },
      },
    };

    // will ask for camera access
    const stream = await navigator.mediaDevices.getUserMedia(videoConfig);
    const camera = new Camera();

    camera.video.srcObject = stream;

    camera.video.height = 440;
    camera.video.width = 720;

    document.body.prepend(camera.video);

    // wait for the camera!
    await new Promise((resolve) => {
      camera.video.onloadedmetadata = () => {
        resolve(camera.video);
      };
    });

    camera.video.play();

    console.log({camera, stream, navigator })
    return camera;
  }
}
