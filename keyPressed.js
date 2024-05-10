function keyPressed() {
  if (millis() - lastKeyPressTime < coolDownDuration) {
    return;
  }
  lastKeyPressTime = millis();
  
  if (win != 0) {
    return;
  }

  if (keyCode === 32 && gameState === "start") { // 32 is the key code for space bar
    gameSound.loop();
    gameState = "play";
  }


  if (keyCode === LEFT_ARROW) {
    playerPos = 0;
    moveSound.play();
  } else if (keyCode === UP_ARROW) {
    playerPos = 1;
    moveSound.play();
  } else if (keyCode === DOWN_ARROW) {
    playerPos = 2;
    moveSound.play();
  } else if (keyCode === RIGHT_ARROW) {
    playerPos = 3;
    moveSound.play();
  } else if (keyCode === 68) {
    // 'D' key
    playerPos = 4;
    moveSound.play();
  } else if (keyCode === 87) {
    // 'W' key
    playerPos = 6;
    moveSound.play();
  } else if (keyCode == 65) {
    // 'A' key
    playerPos = 5;
    moveSound.play();
  } else {
    return;
  }

  if (board[0][playerPos] != 0) {
    win = 4;
  }

  board[0][playerPos] = player;
  let i = 0;
  while (true) {
    if (i >= rows - 1) {
      break;
    }
    if (board[i + 1][playerPos] != 0) {
      //editor.p5js.org/Tien9702/sketches
      https: break;
    }
    [board[i + 1][playerPos], board[i][playerPos]] = [
      board[i][playerPos],
      board[i + 1][playerPos],
    ];
    i++;
  }

  if (hasWon()) {
    win = player;
  } else {
    let drop = true;
    for (let i = 0; i < cols; i++) {
      if (board[rows - 1][i] == 0) {
        drop = false;
      }
    }
    //This is the part that make the rectangles cleared when the row is filled
    // if (drop) {
    //   for (let j = rows-2; j >= 0; j--) {
    //     for (let i = 0; i < cols; i++) {
    //       board[j+1][i] = board[j][i];
    //     }
    //   }
    //   for (let i = 0; i < cols; i++) {
    //     board[0][i] = 0;
    //   }
    // }
  }
  player = 3 - player;
}