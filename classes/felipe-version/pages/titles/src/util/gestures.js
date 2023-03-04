const { GestureDescription, Finger, FingerCurl, FingerDirection } = window.fp;

const RockGesture = new GestureDescription("rock"); // ✊️
const PaperGesture = new GestureDescription("paper"); // 🖐
const ScissorsGesture = new GestureDescription("scissors"); // ✌️
const ScrollUpGesture = new GestureDescription("scroll-up"); // 👍
const ScrollDownGesture = new GestureDescription("scroll-down"); // 👎
const HeavyMetalGesture = new GestureDescription('heavy-metal') // 🤘
const ClickGesture = new GestureDescription('click') // 👌🏽

// Rock
// -----------------------------------------------------------------------------

// all fingers: curled
for (let finger of Finger.all) {
  RockGesture.addCurl(finger, FingerCurl.FullCurl, 1.0);
  RockGesture.addCurl(finger, FingerCurl.HalfCurl, 0.9);
}

// Paper
// -----------------------------------------------------------------------------

// no finger should be curled
for (let finger of Finger.all) {
  PaperGesture.addCurl(finger, FingerCurl.NoCurl, 1.0);
}

// Scissors
//------------------------------------------------------------------------------

// index and middle finger: stretched out
ScissorsGesture.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
ScissorsGesture.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);

// ring: curled
ScissorsGesture.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
ScissorsGesture.addCurl(Finger.Ring, FingerCurl.HalfCurl, 0.9);

// pinky: curled
ScissorsGesture.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);
ScissorsGesture.addCurl(Finger.Pinky, FingerCurl.HalfCurl, 0.9);

// Scroll up
//------------------------------------------------------------------------------

// stretched thumb 
ScrollUpGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);

// all other fingers: curled
for (let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  ScrollUpGesture.addCurl(finger, FingerCurl.FullCurl, 1.0);
  ScrollUpGesture.addCurl(finger, FingerCurl.HalfCurl, 0.9);
}

ScrollUpGesture.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1);
ScrollUpGesture.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 0.9);
ScrollUpGesture.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 0.9);

// Scroll down
//------------------------------------------------------------------------------

// stretched thumb 
ScrollDownGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);

// all other fingers: curled
for (let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  ScrollDownGesture.addCurl(finger, FingerCurl.FullCurl, 1.0);
  ScrollDownGesture.addCurl(finger, FingerCurl.HalfCurl, 0.9);
}

ScrollDownGesture.addDirection(Finger.Thumb, FingerDirection.VerticalDown, 1);
ScrollDownGesture.addDirection(Finger.Thumb, FingerDirection.DiagonalDownLeft, 0.9);
ScrollDownGesture.addDirection(Finger.Thumb, FingerDirection.DiagonalDownRight, 0.9);



// HeavyMetal
//------------------------------------------------------------------------------

// index and middle finger: stretched out
HeavyMetalGesture.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
HeavyMetalGesture.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0);

// ring: curled
HeavyMetalGesture.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
HeavyMetalGesture.addCurl(Finger.Ring, FingerCurl.HalfCurl, 0.9);

// pinky: curled
HeavyMetalGesture.addCurl(Finger.Middle, FingerCurl.FullCurl, 1.0);
HeavyMetalGesture.addCurl(Finger.Middle, FingerCurl.HalfCurl, 0.9);



// ClickGesture
//------------------------------------------------------------------------------

// thumb and index finger: stretched out
ClickGesture.addCurl(Finger.Index, FingerCurl.HalfCurl, 0.8);
ClickGesture.addCurl(Finger.Index, FingerCurl.FullCurl, 0.5);

ClickGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
ClickGesture.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 0.4);

ClickGesture.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);

ClickGesture.addCurl(Finger.Ring, FingerCurl.NoCurl, 1.0);

ClickGesture.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0);



const knownGestures = [
  // PaperGesture,
  // ScissorsGesture,
  // RockGesture,
  ScrollUpGesture,
  ScrollDownGesture,
  HeavyMetalGesture,
  ClickGesture
];

const gestureStrings = {
  paper: "✋",
  rock: "✊",
  scissors: "✌️",
  "scroll-up": "👍",
  "scroll-down": "👎",
  "heavy-metal": "🤘",
  "click": "👌🏽"
};

export { knownGestures, gestureStrings };
