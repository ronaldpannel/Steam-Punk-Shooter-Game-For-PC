class BackgroundScene {
  constructor({ pos, imageSrc, modifier }) {
    (this.pos = pos), (this.modifier = modifier);
    this.image = new Image();
    this.image.onload = () => {
      this.loaded = true;
    };
    this.image.src = imageSrc;
    this.loaded = false;
    this.width = 1768;
    this.height = 500;
  }
  draw() {
    if (!this.loaded) return;
    ctx.drawImage(this.image, this.pos.x, this.pos.y);
    ctx.drawImage(this.image, this.pos.x + this.width, this.pos.y);
  }
  update() {
    this.draw();
    if (this.pos.x <= -this.width) {
      this.pos.x = 0;
    }
    this.pos.x -= gameSpeed * this.modifier;
  }
}

class Player {
  constructor({ pos, vel, width, height, color, imageSrc, maxFrame }) {
    this.pos = pos;
    this.vel = vel;
    this.width = width;
    this.height = height;
    this.color = color;
    this.lastKey;
    this.image = new Image();
    this.image.onload = () => {
      this.loaded = true;
    };
    this.image.src = imageSrc;
    this.loaded = false;
    this.frameX = 0;
    this.frameY = 0;
    this.maxFrame = maxFrame;
  }
  draw() {
    // ctx.fillStyle = this.color;
    // ctx.fillRect(this.pos.x, this.pos.y +10, this.width, this.height - 15);
    if (!this.loaded) return;
    ctx.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.pos.x,
      this.pos.y,
      this.width,
      this.height
    );
  }
  playerEdges() {
    if (this.pos.y >= 0) {
      this.pos.y += this.vel.y;
    } else {
      this.pos.y = 0;
    }
    if (this.pos.y + this.height <= canvas.height) {
      this.pos.y += this.vel.x;
    } else {
      this.pos.y = canvas.height - this.height;
    }
  }
  animateSprite() {
    if (this.frameX < this.maxFrame) {
      this.frameX++;
    } else {
      this.frameX = 0;
    }
    if (health > 4) {
      this.frameY = 1;
    } else {
      this.frameY = 0;
    }
  }
  update() {
    this.draw();
    this.playerEdges();
    this.animateSprite();
  }
}
class Enemy {
  constructor({ pos, vel = 0, width, height, color, imageSrc, maxFrame }) {
    this.pos = pos;
    this.vel = vel;
    this.width = width;
    this.height = height;
    this.color = color;
    this.image = new Image();
    this.image.onload = () => {
      this.loaded = true;
    };
    this.image.src = imageSrc;
    this.loaded = false;
    this.frameX = 0;
    if (Math.random() > 0.5) {
      this.frameY = 0;
    } else {
      this.frameY = 1;
    }
    this.maxFrame = maxFrame;
  }
  draw() {
    // ctx.fillStyle = this.color;
    // ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    ctx.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.pos.x,
      this.pos.y,
      this.width,
      this.height
    );
  }
  animateSprite() {
    if (this.frameX < this.maxFrame) {
      this.frameX++;
    } else {
      this.frameX = 0;
    }
  }
  enemyEdges() {
    this.pos.x += this.vel.x;
  }
  update() {
    this.draw();
    this.enemyEdges();
    this.animateSprite();
  }
}
class PowerUp {
  constructor({ pos, vel = 0, width, height, color, imageSrc, maxFrame }) {
    this.pos = pos;
    this.vel = vel;
    this.width = width;
    this.height = height;
    this.color = color;
    this.image = new Image();
    this.image.onload = () => {
      this.loaded = true;
    };
    this.image.src = imageSrc;
    this.loaded = false;
    this.frameX = 0;
    if (Math.random() > 0.5) {
      this.frameY = 0;
    } else {
      this.frameY = 1;
    }
    this.maxFrame = maxFrame;
  }
  draw() {
    // ctx.fillStyle = this.color;
    // ctx.fillRect(this.pos.x, this.pos.y +12, this.width, this.height - 20);
    if (!this.loaded) return;
    ctx.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.pos.x,
      this.pos.y,
      this.width,
      this.height
    );
  }
  animateSprite() {
    if (this.frameX < this.maxFrame) {
      this.frameX++;
    } else {
      this.frameX = 0;
    }
  }
  powerUpEdges() {
    this.pos.x += this.vel.x;
  }
  update() {
    this.draw();
    this.animateSprite();
    this.powerUpEdges();
  }
}
class Laser {
  constructor({ pos, vel = 0, width, height, color, imageSrc }) {
    this.pos = pos;
    this.vel = vel;
    this.width = width;
    this.height = height;
    this.acc = 0.5;
    this.color = color;
    this.lastKey;
    this.image = new Image();
    this.image.onload = () => {
      this.loaded = true;
    };
    this.image.src = imageSrc;
    this.loaded = false;
  }
  draw() {
    if (!this.loaded) return;
    ctx.fillStyle = this.color;
    //ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    ctx.drawImage(this.image, this.pos.x, this.pos.y, this.height, this.width);
  }

  laserEdges() {
    this.vel.x += this.acc;
    this.pos.x += this.vel.x;
  }
  update() {
    if (health > 4) {
      this.width = 100;
      this.height = 100;
    }
    this.draw();
    this.laserEdges();
  }
}
class PlayerParticle {
  constructor({ pos, vel, imageSrc, frameX, frameY, MaxFrames }) {
    this.pos = pos;
    this.vel = vel;
    this.width = 50;
    this.height = 50;
    this.gravity = 0.5;
    this.frameX = frameX;
    this.frameY = frameY;
    this.angle = 0;
    this.aVel = Math.random() * 0.2 - 0.1;

    this.image = new Image();
    this.image.onload = () => {
      this.loaded = true;
    };
    this.image.src = imageSrc;
    this.loaded = false;
    this.szeModifier = (Math.random() * 0.5 + 0.5).toFixed(1);
    this.bounced = 0;
    this.bottomBounceBoundary = Math.random() * 100 + 60;
  }
  draw() {
    ctx.save();
    if (!this.loaded) return;
    ctx.translate(this.pos.x, this.pos.y);
    ctx.rotate(this.angle);
    // ctx.fillStyle = 'yellow'
    // ctx.fillRect(0 - this.width * 0.5, 0 - this.height * 0.5, this.width, this.height)
    ctx.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      0 - this.width * 0.5,
      0 - this.height * 0.5,
      this.width * this.szeModifier,
      this.height * this.szeModifier
    );
    ctx.restore();
  }
  update() {
    this.draw();
    this.angle += this.aVel;
    this.vel.y += this.gravity;
    this.pos.x += this.vel.x - gameSpeed;
    this.pos.y += this.vel.y;

    if (
      this.pos.y > canvas.height - this.bottomBounceBoundary &&
      this.bounced < 2
    ) {
      this.bounced++;
      this.vel.y *= -0.5;
    }
  }
}
class KillerFish {
  constructor({ pos, vel = 0, width, height, color, imageSrc, maxFrame }) {
    this.pos = pos;
    this.vel = vel;
    this.width = width;
    this.height = height;
    this.color = color;
    this.image = new Image();
    this.image.onload = () => {
      this.loaded = true;
    };
    this.image.src = imageSrc;
    this.loaded = false;
    this.frameX = 0;
    if (Math.random() > 0.5) {
      this.frameY = 0;
    } else {
      this.frameY = 1;
    }
    this.maxFrame = maxFrame;
  }
  draw() {
    // ctx.fillStyle = this.color;
    // ctx.fillRect(this.pos.x, this.pos.y + 12, this.width, this.height - 20);
    if (!this.loaded) return;
    ctx.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.pos.x,
      this.pos.y,
      this.width,
      this.height
    );
  }
  animateSprite() {
    if (this.frameX < this.maxFrame) {
      this.frameX++;
    } else {
      this.frameX = 0;
    }
  }
  powerUpEdges() {
    this.pos.x += this.vel.x;
  }
  update() {
    this.draw();
    this.animateSprite();
    this.powerUpEdges();
  }
}
function handleEnemies() {
  let enemyNumber = 60;
  if (timerValue < 20) {
    enemyNumber = 30;
  } else {
    enemyNumber = 60;
  }
  if (frameRate % enemyNumber === 0) {
    enemiesArray.push(
      new Enemy({
        pos: {
          x: canvas.width,
          //canvas.width = 1768;
          // canvas.height = 550;
          y: 10 + Math.random() * (350 - 10),
        },
        vel: {
          x: Math.floor(
            Math.random() * (-gameSpeed * 2 - gameSpeed * 1) + -gameSpeed * 2
          ),
          y: 0,
        },
        width: 213,
        height: 165,
        color: "yellow",
        imageSrc: "angler2.png",
        maxFrame: 38,
      })
    );
  }
}
function handlePowerUps() {
  let powerUpNumber = 600;
  if (timerValue < 30) {
    powerUpNumber = 300;
  } else powerUpNumber = 600;

  if (frameRate % powerUpNumber === 0) {
    powerUpsArray.push(
      new PowerUp({
        pos: {
          x: canvas.width,
          y: Math.random() * (canvas.height - 130 - 50) + 50,
        },
        vel: {
          x: -gameSpeed * 4,
          y: 0,
        },
        width: 99,
        height: 95,
        color: "green",
        imageSrc: "lucky.png",
        maxFrame: 37,
      })
    );
  }
}
function handleLasers() {
  if (keys.s.pressed) {
    if (gameState) {
      laserSound.play();
      laserSound.volume = 0.05;
    }
    lasersArray.push(
      new Laser({
        pos: {
          x: player.pos.x + player.width - 10,
          y: player.pos.y + player.height / 2 - 10,
        },
        vel: {
          x: 0,
          y: 0,
        },
        width: 30,
        height: 30,
        color: "rgba(0, 255, 0, 0.5)",
        imageSrc: "ballLightning.png",
      })
    );
  }
}
function handlePlayerExpParticle() {
  particlesPlayerArray.push(
    new PlayerParticle({
      pos: {
        x: player.pos.x + player.width * 0.5,
        y: player.pos.y + player.height * 0.5,
      },
      vel: {
        x: Math.random() * 6 - 3,
        y: Math.random() * -15,
      },
      imageSrc: "gears.png",
      frameX: Math.floor(Math.random() * 3),
      frameY: Math.floor(Math.random() * 3),
    })
  );
}

function handleEnemyExpParticle() {
  for (let i = 0; i <= 10; i++) {
    particlesEnemyArray.push(
      new PlayerParticle({
        pos: {
          x: player.pos.x + player.width * 0.5,
          y: player.pos.y + player.height * 0.5,
        },
        vel: {
          x: Math.random() * -0.5 * 1,
          y: Math.random() * -5 + 1,
        },
        imageSrc: "gears.png",
        frameX: Math.floor(Math.random() * 3),
        frameY: Math.floor(Math.random() * 3),
      })
    );
  }
}
function handleKillerFish() {
  let killerNumber = 600;
  if (timerValue < 30) {
    killerNumber = 300;
  } else killerNumber = 600;

  if (frameRate % killerNumber === 0) {
    killerFishArray.push(
      new KillerFish({
        pos: {
          x: canvas.width,
          y: Math.random() * (canvas.height - 130 - 50) + 50,
        },
        vel: {
          x: -gameSpeed * 4,
          y: 0,
        },
        width: 115,
        height: 95,
        color: "red",
        imageSrc: "drone.png",
        maxFrame: 38,
      })
    );
  }
}
