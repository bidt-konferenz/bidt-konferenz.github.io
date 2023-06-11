let video;
let asciiDiv;
const W = 128;
const H = 72;
const rectSize = 10;
const canvasWidth = 1280;
const canvasHeight = 720;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  video = createCapture(VIDEO);
  video.size(W, H);
  video.hide();
  asciiDiv = createDiv('');
}

function draw() {
  const colors = [
    [0, 41, 81], // blue darker
    [1, 71, 140], // blue dark
    [20, 121, 220], // blue basic
    [85, 175, 245], // blue light
    [167, 212, 247], // blue lighter
    [219, 239, 255], // blue lightest
  ];

  const numColors = colors.length;

  // Video-Pixel laden
  video.loadPixels();

  // Rechtecke zeichnen
  for (let j = 0; j < H; j++) {
    for (let i = 0; i < W; i++) {
      let index = (i + j * W) * 4;
      let r = video.pixels[index + 0];
      let g = video.pixels[index + 1];
      let b = video.pixels[index + 2];
      let bright = (r + g + b) / 3;
      let bindex = floor(map(bright, 0, 255, 0, numColors));

      if (bindex >= numColors) {
        bindex = numColors - 1;
      }

      let color = colors[bindex];

      let x = i * rectSize;
      let y = j * rectSize;

      fill(color[0], color[1], color[2]);
      noStroke();
      rect(x, y, rectSize, rectSize);
    }
  }
}