// Gradient
function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();

 if (axis === X_AXIS) {
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x, x + w, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y + h);
    }
  }
}


// // Gradient
// function setGradient(x, y, w, h, c1, c2, axis) {
//   noFill();

//   // Create a vibrant effect by changing the colors over time
//   let vibrantColor1 = color(245 + 10 * abs(sin(frameCount * 0.01)), 136 + 10 * abs(sin(frameCount * 0.02)), 34 + 10 * abs(sin(frameCount * 0.03)));
//   let vibrantColor2 = color(64 - 10 * abs(sin(frameCount * 0.04)), 21 + 10 * abs(sin(frameCount * 0.05)), 99 + 10 * abs(sin(frameCount * 0.06)));

//   if (axis === X_AXIS) {
//     for (let i = x; i <= x + w; i++) {
//       let inter = map(i, x, x + w, 0, 1);
//       let c = lerpColor(vibrantColor1, vibrantColor2, inter);
//       stroke(c);
//       line(i, y, i, y + h);
//     }
//   }
// }
