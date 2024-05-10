// Function to draw a star
function drawStar(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle;
  
  // // Create a flashing effect by changing the stroke color over time
  // let flashingColor = color(255 * abs(sin(frameCount * 0.01)), 0 * abs(sin(frameCount * 0.05)), 255 * abs(sin(frameCount * 0.1)));
  // stroke(flashingColor);

  // Create a flashing effect by alternating between black and yellow
  let flashingColor;
  if (floor(frameCount / 30) % 2 == 0) {
    flashingColor = color(0, 0, 0); // Black 255, 0, 0
  } else {
    flashingColor = color(247, 202, 2); // Yellow
  }
  stroke(flashingColor);
  strokeWeight(5); // Make the border thicker

  
  // Add a class to the star
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
  
  // Reset the stroke weight after drawing the star
  strokeWeight(1);
}
