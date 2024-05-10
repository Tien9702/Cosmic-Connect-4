let lastKeyPressTime = 0;
const coolDownDuration = 1000;

const cols = 7;
const rows = 6;
const w = 100;
const dw = 80;
const board = Array(6)
  .fill()
  .map(() => Array(7).fill(0));
const Y_AXIS = 1;
const X_AXIS = 2;
let c1, c2;

let player = 1;
let playerPos;
let win = 0;

let starSize;

let star = [];
let meteors = [];

let bgMusic,
    moveSound,
    winSound,
    failSound,
    gameSound;

let titleFont,
    paraFont,
    paraFontB;

let gameState = "start";

let flashing;

function preload() {
  moveSound = loadSound(src = "moveSound.wav");
  gameSound =loadSound(src = "gameSound.mp3");
  titleFont = loadFont(src = "CevicheOne-Regular.ttf");
  paraFontB = loadFont(src = "Alegreya-Black.ttf");
  paraFont = loadFont(src = "Arvo-Bold.ttf");
}

function setup() {
  
  var canvas = createCanvas(cols * w + 400, rows * w + w + 100);
  canvas.parent("portrait");
  
  lastSwitchTime = millis();

  c1 = color(242, 57, 0);
  c2 = color(30, 0, 51);

  for (let i = 0; i < 800; i++) {
    star[i] = new Star();
  }

  for (let i = 0; i < 800; i++) {
    meteors[i] = new Meteor();
  }

  flashing = 0;
}

function draw() {

  background(43, 34, 22);
  setGradient(0, 0, width, height, c1, c2, X_AXIS);

  if (gameState === "start") {
    for (let i = 0; i < star.length; i++) {
      star[i].display();
      star[i].twinkle();
    }
  
    for (let i = 0; i < meteors.length; i++) {
      meteors[i].update();
      meteors[i].show();
    }

    textAlign(CENTER, CENTER);
    textSize(156);
    fill(251,255,0);
    stroke(0);
    strokeWeight(15);
    textFont(titleFont);
    text('Cosmic Connect 4', width / 2, height / 2 - 200);
    strokeWeight(0);

    textSize(40)
    fill(254, 153, 51);
    stroke(0);
    strokeWeight(8);
    textFont(paraFont);
    text('Bridging Stars, Building Strategies ', width / 2, height / 2 - 60);

    textSize(20)
    fill(255, 255, 255);
    textFont(paraFont);
    stroke(0);
    strokeWeight(2);
    text('Elijah Evangelist, Felipe Dominguez, Dang Tien Ho ', width / 2, height / 2 + 20);

    // Increase flashing value
    flashing += 0.05;

    // Create a pulsating effect using sin()
    let flashingText = abs(sin(flashing)) * 255;

    textSize(34);
    fill(flashingText); // Use the flashing value for the fill color
    textFont(paraFont);
    stroke(0);
    strokeWeight(2);
    text('Press Space Bar to Start', width / 2, height / 2 + 220);
    
  } else if (gameState === "play") {

      for (let i = 0; i < star.length; i++) {
        star[i].display();
        star[i].twinkle();
      }

      for (let i = 0; i < meteors.length; i++) {
        meteors[i].update();
        meteors[i].show();
      }

      playerPos = floor(mouseX / w);

      stroke(0);
      fill(0);
      rect(-1, -1, width + 2, w);

      for (let i = 0; i < star.length; i++) {
        star[i].display();
        star[i].twinkle();
      }
    
      // for (let i = 0; i < meteors.length; i++) {
      //   meteors[i].update();
      //   meteors[i].show();
      // }

      // Calculate the center of the rectangle
      let centerX = width / 2;
      let centerY = height / 2;

      // Calculate the total width and height of the grid
      let gridWidth = cols * w;
      let gridHeight = rows * w;

      // Calculate the start position of the grid
      let startX = centerX - gridWidth / 2;
      let startY = centerY - gridHeight / 2;

      // Draw the grid
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          // Adjust the position of each cell by the start position
          let x = startX + i * w;
          let y = startY + j * w;

          //star's color
          fill(255);
          if (board[j][i] == 1) {
            fill(0, 0, 255);
          } else if (board[j][i] == 2) {
            fill(255, 0, 0);
          }
          drawStar(
            x + w / 2,
            y + 50 + w / 2,
            (dw / 1.5) * 0.82,
            (dw / 3) * 0.82,
            5
          );
        }
      }

      if (win != 0) {
        noStroke();
        fill(0);
        if (win == 1) {
          fill(0, 0, 255);
        } else if (win == 2) {
          fill(255, 0, 0);
        }
        textAlign(CENTER, CENTER);
        textSize(54);
        fill(255);

        if (win == 4) {
          stroke(255);
          strokeWeight(2);
          fill(64, 21, 99);
          rect(width / 2 - 180, height / 2 - 28, 350, 80, 50);
          fill(245, 136, 34);
          stroke(0);
          strokeWeight(8);
          text("Game Over!", width / 2, height / 2 + 6);
        } else if (win == 3) {
          text("It is a tie.", width / 2, height / 2);
        } else if (win == 2) {
          stroke(255);
          strokeWeight(2);
          fill(204, 55, 112);
          rect(width / 2 - 180, height / 2 - 28, 350, 80, 50);
          fill(255);
          stroke(0);
          strokeWeight(8);
          text("Red Won!", width / 2, height / 2 + 6);
        } else if (win == 1) {
          stroke(255);
          strokeWeight(2);
          fill(24, 195, 242);
          rect(width / 2 - 180, height / 2 - 28, 350, 80, 50);
          fill(255);
          stroke(0);
          strokeWeight(8);
          text("Blue Won!", width / 2, height / 2 + 6);
        }
      }
      setTurn();
  }
}

class Star {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = random(0.25, 3);
    this.t = random(TAU);
  }

  display() {
    noStroke();
    fill(238, 245, 34); // White star color
    ellipse(this.x, this.y, this.size);
  }

  twinkle() {
    this.t += 0.1;
    this.size = sin(this.t) * 4;
  }
}

class Meteor {
  constructor() {
    this.x = random(width);
    this.y = 0;
    this.speed = random(1, 3);
    this.size = random(3, 5);
  }

  update() {
    this.y += this.speed;
    if (this.y > 800) {
      this.y = 0;
      this.x = random(width);
    }
  }

  show() {
    noStroke();
    fill(238, 255, 34); // White color for meteors
    ellipse(this.x, this.y, this.size);
  }
}

// function keyPressed() {
//   if (keyCode === 32 && gameState === "start") { // 32 is the key code for space bar
//     gameState = "play";
//   }
// }