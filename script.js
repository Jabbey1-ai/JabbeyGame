// script.js
// JavaScript code for the Space Shooter Game

const gameContainer = document.getElementById("game-container");
const player = document.getElementById("player");
let playerLeft = gameContainer.clientWidth / 2;
let playerTop = gameContainer.clientHeight / 2;
let bullets = [];

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
