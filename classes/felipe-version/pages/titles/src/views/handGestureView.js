export default class HandGestureView {
  #handsCanvas = document.querySelector("canvas#hands");
  #canvasContext = this.#handsCanvas.getContext("2d");
  #fingerLookupIndices;
  #styler;
  constructor({ fingerLookupIndices, styler }) {
    this.#handsCanvas.width = globalThis.screen.availWidth;
    this.#handsCanvas.height = globalThis.screen.availHeight;
    this.#fingerLookupIndices = fingerLookupIndices;
    this.#styler = styler;
    setTimeout(() => styler.loadDocumentStyles(), 500);
  }

  clearCanvas() {
    this.#canvasContext.clearRect(0, 0, this.#handsCanvas.width, this.#handsCanvas.height);
  }

  drawResults(hands) {
    for (const { keypoints, handedness } of hands) {
      if (!keypoints) continue;

      this.#canvasContext.fillStyle = handedness === "Left" ? "crimson" : "dodgerblue";
      this.#canvasContext.strokeStyle = handedness === "Left" ? "crimson" : "dodgerblue";
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
      this.#hoverElements(finger, points);
      // console.log({ finger, points, keypoints });
    }
  }

  #hoverElements(finger, points) {
    if (finger != "indexFinger") return;

    const tip = points.find((item) => item.name === "index_finger_tip");
    const element = document.elementFromPoint(tip.x, tip.y);
    if (!element) return;
    const cb = () => this.#styler.toggleStyle(element, ":hover");
    cb();
    setTimeout(() => cb(), 500);
    // console.log({ element, tip });
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

  clickOnElement(x, y) {
    const element = document.elementFromPoint(x, y);
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const eventOpts = {
      view: window,
      bubbles: true,
      cancelable: true,
      clientX: rect.left + x,
      clientY: rect.top + y,
    };

    const clickEvent = new MouseEvent("click", eventOpts);
    element?.focus && element.focus();
    element.dispatchEvent(clickEvent);

    console.log({ clickEvent, element, x, y, rect });
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
