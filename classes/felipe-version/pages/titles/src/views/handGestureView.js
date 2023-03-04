export default class HandGestureView {
  #handsCanvas = document.querySelector("canvas#hands");
  #canvasContext = this.#handsCanvas.getContext("2d");
  #fingerLookupIndices;

  constructor({ fingerLookupIndices }) {
    this.#handsCanvas.width = globalThis.screen.availWidth;
    this.#handsCanvas.height = globalThis.screen.availHeight;
    this.#fingerLookupIndices = fingerLookupIndices;
  }

  clearCanvas() {
    this.#canvasContext.clearRect(0, 0, this.#handsCanvas.width, this.#handsCanvas.height);
  }

  drawResults(hands) {
    for (const { keypoints, handedness } of hands) {
      if (!keypoints) continue;

      this.#canvasContext.fillStyle = handedness === "Left" ? "crimson" : "dodgerblue";
      this.#canvasContext.strokeStyle = "white";
      this.#canvasContext.lineWidth = 8;
      this.#canvasContext.lineJoin = "round";

      this.#drawJoints(keypoints);
      this.#drawFingerAndHoverElements(keypoints);
    }
  }

  #drawFingerAndHoverElements(keypoints) {
    const fingers = Object.keys(this.#fingerLookupIndices);

    for (const finger of fingers) {
      const points = this.#fingerLookupIndices[finger].map((index) => keypoints[index]);
      const [{ x, y }] = points;

      const path = new Path2D();

      path.moveTo(x, y);

      for (const point of points) {
        path.lineTo(point.x, point.y);
      }

      this.#canvasContext.stroke(path);
      // console.log({ finger, points, keypoints });
    }
  }

  #drawJoints(keypoints) {
    for (let { x, y } of keypoints) {
      this.#canvasContext.beginPath();

      x -= 2;
      y -= 2;
      const radius = 3;
      // const radius = 6;
      const startAngle = 0;
      const endAngle = Math.PI * 2;

      this.#canvasContext.arc(x, y, radius, startAngle, endAngle);
      // this.#canvasContext.arc(newX, newY, radius, startAngle, endAngle);
      this.#canvasContext.fill();
    }
  }

  loop(fn) {
    requestAnimationFrame(fn);
  }

  scrollPage(top) {
    scroll({
      top,
      behavior: "smooth",
    });
  }
}
