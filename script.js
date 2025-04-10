document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector(".Kontakts form");

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        alert("Thank you for contacting us! We will get back to you shortly.");
    });
});

const mansZimejums = document.getElementById("mansZimejums");
const ctx = mansZimejums.getContext("2d");

const humanWidth = 50;
const humanHeight = 50;
const itemWidth = 50;
const itemHeight = 20;

let human_x = 0;
let human_y = mansZimejums.height - humanHeight;

let item_x = Math.random() * (mansZimejums.width - itemWidth);
let item_y = 0;

let score = 0;
let gameOver = false;


let timer = 30; 
let timerInterval = setInterval(updateTimer, 1000); 

let humanIcon = new Image();
humanIcon.src = "https://cdn-icons-png.flaticon.com/128/2353/2353678.png";

let fallingItem = new Image();
fallingItem.src = "https://cdn-icons-png.flaticon.com/128/2400/2400629.png";

function MyKeyDownHandler(MyEvent) {
    if (gameOver) return;

    if (MyEvent.keyCode == 37 && human_x > 0) {
        human_x -= 10;
    }
    if (MyEvent.keyCode == 39 && human_x + humanWidth < mansZimejums.width) {
        human_x += 10;
    }
}

addEventListener("keydown", MyKeyDownHandler);

function updateTimer() {
    if (timer > 0 && !gameOver) {
        timer--;
    } else if (timer === 0) {
        gameOver = true;
        clearInterval(timerInterval); 
    }
}

function Laukums() {
    if (gameOver) {
        ctx.fillStyle = "#8B5C42";
        ctx.font = "40px 'Arial', sans-serif";
        ctx.fillText("Game Over", mansZimejums.width / 2 - 120, mansZimejums.height / 2);
        return;
    }

    ctx.clearRect(0, 0, mansZimejums.width, mansZimejums.height);

    ctx.drawImage(humanIcon, human_x, human_y, humanWidth, humanHeight);

    item_y += 3;
    if (item_y + itemHeight >= mansZimejums.height) {
        item_y = 0;
        item_x = Math.random() * (mansZimejums.width - itemWidth);
    }
    ctx.drawImage(fallingItem, item_x, item_y, itemWidth, itemHeight);

    if (
        item_y + itemHeight >= human_y &&
        item_x < human_x + humanWidth &&
        item_x + itemWidth > human_x
    ) {
        score++;
        item_y = 0;
        item_x = Math.random() * (mansZimejums.width - itemWidth);

        if (score >= 10) {
            gameOver = true;
        }
    }

    ctx.fillStyle = "#5A3D2D";
    ctx.font = "20px 'Arial', sans-serif";
    ctx.fillText("Punkti: " + score, 10, 30);

    
    ctx.fillStyle = "black";  
    ctx.font = "20px 'Arial', sans-serif";  
    ctx.fillText("Time: " + timer + "s", mansZimejums.width - 100, 30); 
}

setInterval(Laukums, 25);
