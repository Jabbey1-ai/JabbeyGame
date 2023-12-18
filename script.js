// script.js
// JavaScript code for the Box Moving Game

const player = document.getElementById("player");
let playerLeft = 0;
let playerTop = 0;

document.addEventListener("keydown", movePlayer);

function movePlayer(event) {
    const speed = 10;

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
