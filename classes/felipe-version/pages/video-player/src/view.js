export default class View {
  #btnInit = document.querySelector("button#init");
  #statusElement = document.querySelector("#status");
  #videoFrameCanvas = document.createElement("canvas");
  #canvasContext = this.#videoFrameCanvas.getContext("2d", {
    willReadFrequently: true,
  });
  #videoElement = document.querySelector("#video");

  getVideoFrame(video) {
    const canvas = this.#videoFrameCanvas;

    // const [width, height] = [window.screen.width, window.screen.height];
    const [width, height] = [video.videoWidth, video.videoHeight];

    canvas.width = width;
    canvas.height = height;

    this.#canvasContext.drawImage(video, 0, 0, width, height);
    return this.#canvasContext.getImageData(0, 0, width, height);
  }

  togglePlayVideo() {
    if (this.#videoElement.paused) {
      return this.#videoElement.play();
    }
    this.#videoElement.pause();
  }

  enableButton() {
    this.#btnInit.disabled = false;
  }

  configureOnBtnClick(cb) {
    this.#btnInit.addEventListener("click", cb);
  }

  log(text) {
    this.#statusElement.textContent = text;
  }

  setVideoSrc(url) {
    this.#videoElement.setAttribute('src', url)
  }
}
