const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

// Game constants
const PADDLE_WIDTH = 12;
const PADDLE_HEIGHT = 90;
const BALL_SIZE = 16;
const PADDLE_MARGIN = 15;
const CANVAS_W = canvas.width;
const CANVAS_H = canvas.height;
const PADDLE_SPEED = 7;
const AI_SPEED = 5;

// Paddle positions
let leftPaddleY = CANVAS_H / 2 - PADDLE_HEIGHT / 2;
let rightPaddleY = CANVAS_H / 2 - PADDLE_HEIGHT / 2;

// Ball position and velocity
let ballX = CANVAS_W / 2 - BALL_SIZE / 2;
let ballY = CANVAS_H / 2 - BALL_SIZE / 2;
let ballVX = 6 * (Math.random() > 0.5 ? 1 : -1);
let ballVY = 4 * (Math.random() > 0.5 ? 1 : -1);

// Scores
let scoreLeft = 0;
let scoreRight = 0;

// Handle mouse movement for left paddle
canvas.addEventListener('mousemove', function(e) {
  const rect = canvas.getBoundingClientRect();
  const mouseY = e.clientY - rect.top;
  leftPaddleY = mouseY - PADDLE_HEIGHT / 2;
  leftPaddleY = Math.max(0, Math.min(CANVAS_H - PADDLE_HEIGHT, leftPaddleY));
});

// Draw everything
function draw() {
  // Clear
  ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

  // Middle dashed line
  ctx.setLineDash([8, 16]);
  ctx.strokeStyle = "#fff";
  ctx.beginPath();
  ctx.moveTo(CANVAS_W / 2, 0);
  ctx.lineTo(CANVAS_W / 2, CANVAS_H);
  ctx.stroke();
  ctx.setLineDash([]);

  // Left paddle
  ctx.fillStyle = "#00eaff";
  ctx.fillRect(PADDLE_MARGIN, leftPaddleY, PADDLE_WIDTH, PADDLE_HEIGHT);

  // Right paddle
  ctx.fillStyle = "#ff006a";
  ctx.fillRect(CANVAS_W - PADDLE_MARGIN - PADDLE_WIDTH, rightPaddleY, PADDLE_WIDTH, PADDLE_HEIGHT);

  // Ball
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.arc(ballX + BALL_SIZE / 2, ballY + BALL_SIZE / 2, BALL_SIZE / 2, 0, Math.PI * 2);
  ctx.fill();
}

// Ball + paddle collision detection
function checkCollision() {
  // Left paddle
  if (
    ballX <= PADDLE_MARGIN + PADDLE_WIDTH &&
    ballY + BALL_SIZE >= leftPaddleY &&
    ballY <= leftPaddleY + PADDLE_HEIGHT
  ) {
    ballVX = Math.abs(ballVX);
    // Add some variation based on where the ball hits the paddle
    let hitPos = (ballY + BALL_SIZE / 2) - (leftPaddleY + PADDLE_HEIGHT / 2);
    ballVY += hitPos * 0.15;
  }
  // Right paddle
  if (
    ballX + BALL_SIZE >= CANVAS_W - PADDLE_MARGIN - PADDLE_WIDTH &&
    ballY + BALL_SIZE >= rightPaddleY &&
    ballY <= rightPaddleY + PADDLE_HEIGHT
  ) {
    ballVX = -Math.abs(ballVX);
    let hitPos = (ballY + BALL_SIZE / 2) - (rightPaddleY + PADDLE_HEIGHT / 2);
    ballVY += hitPos * 0.15;
  }
}

// Ball + wall collision
function checkWall() {
  // Top
  if (ballY <= 0) {
    ballY = 0;
    ballVY = Math.abs(ballVY);
  }
  // Bottom
  if (ballY + BALL_SIZE >= CANVAS_H) {
    ballY = CANVAS_H - BALL_SIZE;
    ballVY = -Math.abs(ballVY);
  }
}

// AI paddle movement
function moveAIPaddle() {
  // Simple: move towards ball center
  let paddleCenter = rightPaddleY + PADDLE_HEIGHT / 2;
  let ballCenter = ballY + BALL_SIZE / 2;
  if (ballVX > 0) { // Only move if ball is coming towards AI
    if (ballCenter < paddleCenter - 8) {
      rightPaddleY -= AI_SPEED;
    } else if (ballCenter > paddleCenter + 8) {
      rightPaddleY += AI_SPEED;
    }
    rightPaddleY = Math.max(0, Math.min(CANVAS_H - PADDLE_HEIGHT, rightPaddleY));
  }
}

// Update ball position and check collisions
function updateBall() {
  ballX += ballVX;
  ballY += ballVY;

  checkCollision();
  checkWall();

  // Score: left missed
  if (ballX + BALL_SIZE < 0) {
    scoreRight++;
    resetBall(-1);
    updateScore();
  }
  // Score: right missed
  if (ballX > CANVAS_W) {
    scoreLeft++;
    resetBall(1);
    updateScore();
  }
}

// Reset ball after score
function resetBall(dir) {
  ballX = CANVAS_W / 2 - BALL_SIZE / 2;
  ballY = CANVAS_H / 2 - BALL_SIZE / 2;
  ballVX = 6 * dir;
  ballVY = (Math.random() * 5 + 2) * (Math.random() > 0.5 ? 1 : -1);
}

// Update scoreboard
function updateScore() {
  document.getElementById('scoreLeft').textContent = scoreLeft;
  document.getElementById('scoreRight').textContent = scoreRight;
}

// Main game loop
function gameLoop() {
  moveAIPaddle();
  updateBall();
  draw();
  requestAnimationFrame(gameLoop);
}

// Start
updateScore();
gameLoop();