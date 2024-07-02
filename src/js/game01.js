  // Configuración
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");
  const gravity = 0.5;
  const jumpStrength = 10;
  const obstacleSpeed = 5;
  const obstacleWidth = 20;
  const obstacleHeight = 20;
  const playerWidth = 30;
  const playerHeight = 30;
  const playerColor = "#232323";
  const obstacleColor = "red";

  let playerX = canvas.width / 2 - playerWidth / 2;
  let playerY = canvas.height - playerHeight;
  let jumping = false;
  let jumpVelocity = 0;
  let obstacles = [];
  let score = 0;
  let gameRunning = true;
  let obstaclePassed = false;

  // Función para dibujar el jugador
  function drawPlayer() {
      ctx.fillStyle = playerColor;
      ctx.fillRect(playerX, playerY, playerWidth, playerHeight);
  }

  // Función para dibujar un obstáculo
  function drawObstacle(obstacle) {
      ctx.fillStyle = obstacleColor;
      ctx.fillRect(obstacle.x, canvas.height - obstacleHeight, obstacleWidth, obstacleHeight);
  }

  // Función para generar un nuevo obstáculo
  function generateObstacle() {
      const obstacle = {
          x: canvas.width,
      };
      obstacles.push(obstacle);
  }

  // Función para actualizar la posición del jugador
  function updatePlayer() {
      if (jumping) {
          jumpVelocity -= gravity;
          playerY -= jumpVelocity;
          if (playerY >= canvas.height - playerHeight) {
              playerY = canvas.height - playerHeight;
              jumping = false;
          }
      } else {
          if (playerY < canvas.height - playerHeight) {
              jumpVelocity += gravity;
              playerY += jumpVelocity;
          }
      }
  }

  // Función para actualizar la posición de los obstáculos
  function updateObstacles() {
      for (let i = 0; i < obstacles.length; i++) {
          obstacles[i].x -= obstacleSpeed;
          if (obstacles[i].x + obstacleWidth < 0) {
              obstacles.splice(i, 1);
              obstaclePassed = false;
          }
      }
  }

  // Función para comprobar colisiones
  function checkCollisions() {
      for (let obstacle of obstacles) {
          if (playerX < obstacle.x + obstacleWidth &&
              playerX + playerWidth > obstacle.x &&
              playerY < canvas.height &&
              playerY + playerHeight > canvas.height - obstacleHeight) {
              gameOver();
              return;
          }
      }
  }

  // Función para dibujar el contador de puntos
  function drawScore() {
      ctx.fillStyle = "#000";
      ctx.font = "24px Arial";
      ctx.fillText("Puntuación: " + score, 10, 30);
  }

  // Función para reiniciar el juego
  function resetGame() {
      score = 0;
      playerX = canvas.width / 2 - playerWidth / 2;
      playerY = canvas.height - playerHeight;
      obstacles = [];
      jumping = false;
      jumpVelocity = 0;
      gameRunning = true;
      hideGameOverScreen();
  }

  // Función para mostrar la pantalla de juego terminado
  function showGameOverScreen() {
      document.getElementById("scoreDisplay").textContent = score;
      document.getElementById("gameOverScreen").style.display = "block";
  }

  // Función para ocultar la pantalla de juego terminado
  function hideGameOverScreen() {
      document.getElementById("gameOverScreen").style.display = "none";
  }

  // Función para terminar el juego
  function gameOver() {
      gameRunning = false;
      showGameOverScreen();
  }

  // Escuchar eventos de teclado
  document.addEventListener("keydown", function (event) {
      if (event.code === "Space" && playerY === canvas.height - playerHeight && gameRunning) {
          jumping = true;
          jumpVelocity = jumpStrength;
      }
  });

  // Bucle principal del juego
  function gameLoop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (gameRunning) {
          updatePlayer();
          drawPlayer();

          updateObstacles();
          for (let obstacle of obstacles) {
              drawObstacle(obstacle);
              if (playerX > obstacle.x + obstacleWidth && !obstaclePassed) {
                  score++;
                  obstaclePassed = true;
              }
          }

          checkCollisions();
          drawScore();
      }

      requestAnimationFrame(gameLoop);
  }

  // Generar obstáculos cada cierto intervalo de tiempo
  setInterval(generateObstacle, 1500);

  // Comenzar el bucle del juego
  gameLoop();

  // Evento para reiniciar el juego cuando se presiona el botón "Jugar de nuevo"
  document.getElementById("playAgainButton").addEventListener("click", function() {
      resetGame();
  });