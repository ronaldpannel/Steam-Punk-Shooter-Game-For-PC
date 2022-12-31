function playerEnemyCollision() {
  for (let i = 0; i < enemiesArray.length; i++) {
    if (
      enemiesArray[i].pos.x <= player.pos.x + player.width &&
      enemiesArray[i].pos.x >= player.pos.x + player.width - 5 &&
      enemiesArray[i].pos.y + enemiesArray[i].height >= player.pos.y &&
      enemiesArray[i].pos.y <= player.pos.y + player.height
    ) {
      enemiesArray.splice(i, 1);
      health--;
      playerHealth.innerHTML = health;

      if (health === 0) {
        ctx.font = "30px Aerial";
        ctx.fillStyle = "white";
        ctx.fillText("Game Over  ", canvas.width / 2, canvas.height / 2);
        ctx.fillText(
          "Move Player Press Up & Down Arrows and S to shoot Fire Bombs",
          canvas.width / 2 - 380,
          canvas.height / 2 + 40
        );
        gameStartBtn.classList.add("btnActive");
        resetHighScoreBtn.classList.add("btnActive");
        gameState = false;
      }
    }
  }
}

function playerPowerUpCollision() {
  for (let i = 0; i < powerUpsArray.length; i++) {
    if (
      powerUpsArray[i].pos.x <= player.pos.x + player.width &&
      powerUpsArray[i].pos.x >= player.pos.x + player.width - 5 &&
      powerUpsArray[i].pos.y + powerUpsArray[i].height >= player.pos.y &&
      powerUpsArray[i].pos.y <= player.pos.y + player.height
    ) {
      powerUpsArray.splice(i, 1);
      ctx.font = "30px Aerial";
      ctx.fillStyle = "white";
      ctx.fillText("Game Over  ", canvas.width / 2, canvas.height / 2);
      ctx.fillText(
        "Move Player Press Up & Down Arrows and S to shoot Fire Bombs",
        canvas.width / 2 - 380,
        canvas.height / 2 + 40
      );
      gameStartBtn.classList.add("btnActive");
      resetHighScoreBtn.classList.add("btnActive");
      gameState = false;
    }
  }
}
function laserEnemyCollision() {
  for (let i = enemiesArray.length - 1; i >= 0; i--) {
    for (let j = lasersArray.length - 1; j >= 0; j--) {
      if (
        enemiesArray[i].pos.x <= lasersArray[j].pos.x + lasersArray[j].width &&
        enemiesArray[i].pos.x >= lasersArray[j].pos.x &&
        enemiesArray[i].pos.y + enemiesArray[i].height >=
          lasersArray[j].pos.y &&
        enemiesArray[i].pos.y <= lasersArray[j].pos.y + lasersArray[j].height
      ) {
        enemiesArray.splice(i, 1);
        lasersArray.splice(j, 1);
        score += 10;
        scoreboard.innerHTML = score;
      }
    }
  }
}
function laserPowerUpCollision() {
  for (let i = powerUpsArray.length - 1; i >= 0; i--) {
    for (let j = lasersArray.length - 1; j >= 0; j--) {
      if (
        powerUpsArray[i].pos.x <= lasersArray[j].pos.x + lasersArray[j].width &&
        powerUpsArray[i].pos.x >= lasersArray[j].pos.x &&
        powerUpsArray[i].pos.y + powerUpsArray[i].height >=
          lasersArray[j].pos.y &&
        powerUpsArray[i].pos.y <= lasersArray[j].pos.y + lasersArray[j].height
      ) {
        powerUpsArray.splice(i, 1);
        lasersArray.splice(j, 1);
        score += 100;
        scoreboard.innerHTML = score;
        health = 6;
        playerHealth.innerHTML = health;
      }
    }
  }
}

//set highest score
function setHighestScore() {
  if (score > localStorage.getItem("alienHighScore")) {
    localStorage.setItem("alienHighScore", score);
    let hsScore = localStorage.getItem("alienHighScore");
    highestScore = hsScore;
  }
}