export default class Camera {
  video;
  container;
  constructor() {
    this.video = document.createElement("video");
  }

  static async init() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error(`Browser Api navigator.mediaDevices.getUserMedia not available`);
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

    // render video
    camera.video.height = 440;
    camera.video.width = 720;
    document.body.append(camera.video);
    
    // wait for the camera!
    await new Promise((resolve) => {
      camera.video.onloadedmetadata = () => {
        resolve(camera.video);
      };
    });
    
    camera.video.play();
    this.container = document.querySelector("#video-container");
    this.container.append(camera.video);
    // console.log(document, this.container, );

    // console.log({ camera, stream, navigator })
    return camera;
  }
}
