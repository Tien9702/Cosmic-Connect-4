function setTurn() {
  // Add this at the end of your draw function
  textSize(40);
  textFont(paraFont);
  textAlign(CENTER, CENTER);
  stroke(8);
  strokeWeight(5);

  // Always show "Blue" box
  // stroke(255);
  strokeWeight(2);
  if (player == 1) {
    fill(0, 0, 255); // Blue for Player 1's turn 24, 195, 242
  } else {
    fill(200); // Grey for waiting
  }
  rect(width / 2 - 350, 20, 200, 60, 50);
  fill(255); // White text color
  text("Blue", width / 2 - 245, 46);

  // Always show "Red" box
  if (player == 2) {
    fill(255, 0, 0); // Red for Player 2's turn 204, 55, 112
  } else {
    fill(200); // Grey for waiting
  }
  rect(width / 2 + 150, 20, 200, 60, 50);
  fill(255); // White text color
  text("Red", width / 2 + 255, 46);
}
