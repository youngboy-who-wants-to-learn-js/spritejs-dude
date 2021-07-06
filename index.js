const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const width = (canvas.width = 320);
const height = (canvas.height = 480);

const frameWidth = 64;
const frameHeight = 100;
const xPos = 130;
const yPos = 160;
const scale = 1;


let frameIndex = 0;
let count = 0;

canvas.style.marginTop = window.innerHeight / 2 - height / 2 + "px";

const spriteImage = new Image();
spriteImage.src = "./assets/hero_spritesheet.png";

const State = {
  states: {},
  generateState: function (name, startIdx, finishIdx) {
    if (!this.states[name]) {
      this.states[name] = {
        frameIndex: startIdx,
        startIdx,
        finishIdx,
      };
    }
  },
  getState: function name(name) {
    if (this.states[name]) {
      return this.states[name];
    }
  },
};

State.generateState("breath", 0, 4);
State.generateState("angry", 4, 8);
State.generateState("jump", 8, 14);

function animate(state) {
  context.drawImage(
    spriteImage,
    frameWidth * state.frameIndex,
    0,
    frameWidth,
    frameHeight,
    xPos,
    yPos,
    frameWidth * scale,
    frameHeight * scale
  );

  count++;
  if (count > 6) {
    state.frameIndex++;
    count = 0;
  }

  if (state.frameIndex > state.finishIdx) {
    state.frameIndex = 0;
  }
}

function frame() {
  context.clearRect(0, 0, width, height);
  animate(State.getState("breath"));
  requestAnimationFrame(frame);
}

frame();
