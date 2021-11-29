let xspacing = 10; // How far apart should each horizontal position be spaced
let w; // Width of entire wave
let maxwaves = 12; // total # of waves to add together

let theta = 0.0;
let amplitude = []; // Height of wave
let dx = []; // Value for incrementing X, to be calculated as a function of period and xspacing
let yvalues; // Using an array to store height values for the wave (not entirely necessary)

//CCapture
// var capture = false; // default is to not capture frames, can be changed with button in browser
var capturer = new CCapture({
  format:'webm', 
  workersPath: 'js/',
  framerate: 20
});
var btn1;

const NUM_FRAMES = 275;

function setup() {
  // createCanvas(windowWidth, windowHeight, WEBGL);
  createCanvas(1920, 1080, WEBGL);
  colorMode(HSB, 360, 100, 100, 100);
  background(0, 100,10);
  frameRate(20)
  w = width + 16;

for (let i = 0; i < maxwaves; i++) {
    amplitude[i] = random(10, 30);
    let period = random(100, 300); // How many pixels before the wave repeats
    dx[i] = (TWO_PI / period) * xspacing;
  }
  yvalues = [];

    //CCapture
    btn1 = document.createElement('button');
    btn1.textContent = "save recording";
    document.body.appendChild(btn1);
    btn1.onclick = save_record;
}

function draw() {
  if (frameCount==1) capturer.start(); // start the animation capture
  background(0, 100, random(10));
  push();
  translate(-width/2, -height/2)
  calcWave();
  renderWave();
  pop();
  
  // scale(map(mouseX, 0, width, 10, 5))
  scale(5);
  rotateX(millis()/ 1000);
  rotateY(millis() / 2000);
  rotateZ(millis()/ 1500)
  fill(0, random(100), random(100), 50);
  strokeWeight(random(5));
  stroke(175, random(100), random(100));
  sphere(width*.05, 1, int(random(2, 4)));
  push();
  rotateY(180);
  sphere(width*.05, 1, int(random(2, 4)));
  pop();

    //capture details
    // if (capture){
    //   capturer.capture( canvas ); // if capture is 'true', save the frame
    //   if (frameCount-1 == NUM_FRAMES){ //stop and save after NUM_FRAMES
    //       capturer.stop(); 
    //       capturer.save(); 
    //       noLoop(); 
    //     }
    //   }
    capturer.capture(document.getElementById('defaultCanvas0'));  
    if (frameCount==1800){
      save_record();
    }
    print(frameCount);
  }

function calcWave() {
  // Increment theta (try different values for 'angular velocity' here
  theta += random(0.01,0.05);

  // Set all height values to zero
  for (let i = 0; i < w / xspacing; i++) {
    yvalues[i] = 0;
  }

  // Accumulate wave height values
  for (let j = 0; j < maxwaves; j++) {
    let x = theta;
    for (let i = 0; i < yvalues.length; i++) {
      // Every other wave is cosine instead of sine
      if (j % 2 === 0) yvalues[i] += sin(x) * amplitude[j];
      else yvalues[i] += tan(x) * amplitude[j];
      x += dx[j];
    }
  }
}

function renderWave() {
  // A simple way to draw the wave with an ellipse at each position
  noStroke();
  fill(random(340, 360), random(100), random(100), random(100));
  ellipseMode(CENTER);
  for (let x = 0; x < yvalues.length; x++) {
   circle(x * xspacing, height / 2 + yvalues[x], random(10));
  }
}

function save_record() {
  capturer.save();
}