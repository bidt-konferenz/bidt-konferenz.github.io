let video;
let asciiDiv;
const W = 110;
const H = 60;
// function preload() {
//   kitten = loadImage('kitten36.jpeg');
// }

function setup() {
  noCanvas();
  video = createCapture(VIDEO);
  video.size(W,H);
  video.hide();
  asciiDiv = createDiv('');
}
function draw() {
  const txt = '       .:-i|=+%O#@→'
  // const dim = 16;
  // createCanvas(W * dim, H * dim);
  background(0);
  video.loadPixels();
  textFont('courier');
  let output = '';
  for (let j = 0; j < H; j++) {
    for (let i = 0; i < W; i++) {
      let index = (i + j * W) * 4;
      let r = video.pixels[index + 0];
      let g = video.pixels[index + 1];
      let b = video.pixels[index + 2];
      let bright = (r + g + b) / 3;
      let bindex = map(bright, 0, 255, 0, txt.length);
      let ch = txt.charAt(floor(bindex));
      if (ch == ' ') {
        output += '&nbsp;';
      } else {
        output += ch;
      }
      // let x = i * dim;
      // let y = j * dim;
      // fill(255);
      // textSize(dim);
      // text(ch, x, y);
    }
    output += '<br/>';
  }
  asciiDiv.html(output);

}