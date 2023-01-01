/**@type{HTMLCanvasElement} */

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const scoreboard = document.getElementById("score");
const highScoreboard = document.getElementById("highScore");
const gameStartBtn = document.getElementById("restartGame");
const resetHighScoreBtn = document.getElementById("hScoreResetBtn");
const playerHealth = document.getElementById("healthScore");
canvas.width = 1768;
canvas.height = 550;
const myFont = new FontFace("myFont","url('https://fonts.googleapis.com/css2?family=Bangers&display=swap');"
);
let enemiesArray = [];
let lasersArray = [];
let powerUpsArray = [];
let frameRate = 0;
let gameState = true;
let gameSpeed = 1;
let score = 0;
let health = 6;
let highestScore = localStorage.getItem("alienHighScore") || 0;
highScoreboard.innerHTML = highestScore;
const keys = {
  arrowUp: {
    pressed: false,
  },
  arrowDown: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
};
const bgLayer1 = new BackgroundScene({
  pos: {
    x: 0,
    y: 0,
  },
  imageSrc: "layer1.png",
  modifier: 0.2,
});

const bgLayer2 = new BackgroundScene({
  pos: {
    x: 0,
    y: 0,
  },
  imageSrc: "layer2.png",
  modifier: 0.4,
});

const bgLayer3 = new BackgroundScene({
  pos: {
    x: 0,
    y: 0,
  },
  imageSrc: "layer3.png",
  modifier: 1,
  modifier: 1,
});

const bgLayer4 = new BackgroundScene({
  pos: {
    x: 0,
    y: 0,
  },
  imageSrc: "layer4.png",
  modifier: 1.5,
});

const player = new Player({
  pos: {
    x: 200,
    y: canvas.height / 2 - 95,
  },
  vel: {
    x: 0,
    y: 0,
  },
  width: 120,
  height: 190,
  color: "red",
  imageSrc: 'player.png',
  maxFrame: 37
});

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  setHighestScore();
  bgLayer1.update();
  bgLayer2.update();
  bgLayer3.update();
  player.update();
  enemiesArray.forEach((enemy, index) => {
    enemy.update();
    if (enemy.pos.x <= -100) {
      enemiesArray.splice(index, 1);
    }
  });
  lasersArray.forEach((laser, index) => {
    laser.update();
    if (laser.pos.x >= canvas.width + 100) {
      lasersArray.splice(index, 1);
    }
  });
  powerUpsArray.forEach((powerUP, index) => {
    powerUP.update();
    if (powerUP.pos.x <= -100) {
      powerUpsArray.splice(index, 1);
    }
  });
  bgLayer4.update();
  handleEnemies();
  handlePowerUps();

  //player key inputs
  if (keys.arrowUp.pressed) {
    player.vel.y = -gameSpeed * 8;
  } else if (keys.arrowDown.pressed) {
    player.vel.y = gameSpeed * 8;
  } else {
    player.vel.y = 0;
  }
  playerEnemyCollision();
  laserEnemyCollision();
  laserPowerUpCollision();
  playerPowerUpCollision();

  frameRate++;
  if (gameState) {
    requestAnimationFrame(animate);
  }
}
animate();

resetHighScoreBtn.addEventListener("click", resetHighScore);

function resetHighScore() {
  localStorage.setItem("alienHighScore", 0);
  window.location.reload();
}

gameStartBtn.addEventListener("click", function () {
  window.location.reload();
});
