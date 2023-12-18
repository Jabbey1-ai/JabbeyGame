// script.js
// JavaScript code for the Space Shooter Game with Enemies

const gameContainer = document.getElementById("game-container");
const player = document.getElementById("player");
let playerLeft = gameContainer.clientWidth / 2;
let playerTop = gameContainer.clientHeight / 2;
let bullets = [];
let enemies = [];

document.addEventListener("keydown", movePlayer);
document.addEventListener("keyup", shoot);

function movePlayer(event) {
    const speed = 5;

    switch (event.key) {
        case "ArrowUp":
            playerTop -= speed;
            break;
        case "ArrowDown":
            playerTop += speed;
            break;
        case "ArrowLeft":
            playerLeft -= speed;
            break;
        case "ArrowRight":
            playerLeft += speed;
            break;
    }

    updatePlayerPosition();
}

function updatePlayerPosition() {
    player.style.left = playerLeft + "px";
    player.style.top = playerTop + "px";

    // Check for collisions with enemies
    checkCollisions();
}

function shoot(event) {
    if (event.key === " ") {
        const bullet = document.createElement("div");
        bullet.className = "bullet";
        bullet.style.left = playerLeft + "px";
        bullet.style.top = playerTop + "px";
        gameContainer.appendChild(bullet);

        bullets.push(bullet);

        // Move the bullet in the direction the player is facing
        const bulletSpeed = 8;
        const direction = getDirection();
        const interval = setInterval(() => {
            moveBullet(bullet, direction);
        }, 20);

        // Remove the bullet after it goes off-screen
        setTimeout(() => {
            clearInterval(interval);
            gameContainer.removeChild(bullet);
            bullets = bullets.filter(b => b !== bullet);
        }, 2000);
    }
}

function moveBullet(bullet, direction) {
    switch (direction) {
        case "up":
            bullet.style.top = parseInt(bullet.style.top) - 5 + "px";
            break;
        case "down":
            bullet.style.top = parseInt(bullet.style.top) + 5 + "px";
            break;
        case "left":
            bullet.style.left = parseInt(bullet.style.left) - 5 + "px";
            break;
        case "right":
            bullet.style.left = parseInt(bullet.style.left) + 5 + "px";
            break;
    }

    // Check for collisions with enemies
    checkCollisions();
}

function getDirection() {
    const vertical = playerTop - gameContainer.clientHeight / 2;
    const horizontal = playerLeft - gameContainer.clientWidth / 2;

    if (Math.abs(vertical) > Math.abs(horizontal)) {
        return vertical > 0 ? "up" : "down";
    } else {
        return horizontal > 0 ? "left" : "right";
    }
}

function spawnEnemy() {
    const enemy = document.createElement("div");
    enemy.className = "enemy";
    enemy.style.left = Math.random() > 0.5 ? "-50px" : (gameContainer.clientWidth + "px");
    enemy.style.top = Math.random() * gameContainer.clientHeight + "px";
    gameContainer.appendChild(enemy);

    enemies.push(enemy);

    const interval = setInterval(() => {
        moveEnemy(enemy);
    }, 50);
}

function moveEnemy(enemy) {
    const playerCenterX = playerLeft + player.clientWidth / 2;
    const playerCenterY = playerTop + player.clientHeight / 2;

    const enemyCenterX = parseInt(enemy.style.left) + enemy.clientWidth / 2;
    const enemyCenterY = parseInt(enemy.style.top) + enemy.clientHeight / 2;

    const angle = Math.atan2(playerCenterY - enemyCenterY, playerCenterX - enemyCenterX);
    const speed = 2;

    const deltaX = Math.cos(angle) * speed;
    const deltaY = Math.sin(angle) * speed;

    enemy.style.left = parseInt(enemy.style.left) + deltaX + "px";
    enemy.style.top = parseInt(enemy.style.top) + deltaY + "px";

    // Check for collisions with the player
    checkCollisions();
}

function checkCollisions() {
    // Check for collisions between bullets and enemies
    bullets.forEach(bullet => {
        enemies.forEach(enemy => {
            if (isColliding(bullet, enemy)) {
                gameContainer.removeChild(bullet);
                gameContainer.removeChild(enemy);

                bullets = bullets.filter(b => b !== bullet);
                enemies = enemies.filter(e => e !== enemy);
            }
        });
    });

    // Check for collisions between player and enemies
    enemies.forEach(enemy => {
        if (isColliding(player, enemy)) {
            gameOver();
        }
    });
}

function isColliding(element1, element2) {
    const rect1 = element1.getBoundingClientRect();
    const rect2 = element2.getBoundingClientRect();

    return !(rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom);
}

function gameOver() {
    alert("Game Over!");
    resetGame();
}

function resetGame() {
    // Clear bullets and enemies from the screen
    bullets.forEach(bullet => gameContainer.removeChild(bullet));
    enemies.forEach(enemy => gameContainer.removeChild(enemy));

    bullets = [];
    enemies = [];

    // Reset player position
    playerLeft = gameContainer.clientWidth / 2;
    playerTop = gameContainer.clientHeight / 2;
    updatePlayerPosition();
}

// Spawn enemies at regular intervals
setInterval(spawnEnemy, 3000);
