/*Game Constants and variables*/
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('sounds/chew.wav');
const gameOverSound = new Audio('sounds/game-over.wav');
const movementSound = new Audio('sounds/turn.wav');
const bgmusic = new Audio('sounds/bg.mp3');
bgmusic.volume = 0.18;
movementSound.volume = 0.3;
gameOverSound.volume = 0.35;
foodSound.volume = 0.5;
let speed = 5;
let score = 0;
let counter = 0;
let lastPaintTime = 0;
let snakearr = [{ x: 10, y: 11 }]; // x - 0-23 y - 16
food = { x: 22, y: 6 };


// Game Functions
function main(curr_time) {
	window.requestAnimationFrame(main);
	//console.log(curr_time);
	if ((curr_time - lastPaintTime) / 1000 < 1 / speed) {
		return;
	}
	lastPaintTime = curr_time;
	gameEngine();
}

function isColloide(sarr) {
	//self-collision
	for (let i = 1; i < sarr.length; i++) {
		if (sarr[i].x === sarr[0].x && sarr[i].y === sarr[0].y) {
			gameOverSound.play();
			return true;
		}
	}
	//wall collison
	if (sarr[0].x >= 23 || sarr[0].x <= 0) {
		gameOverSound.play();
		return true;
	}
	else if (sarr[0].y >= 15 || sarr[0].y <= 0) {
		gameOverSound.play();
		return true;
	}
	else
		return false;
}

function gameEngine() {
	// phase 1 - updating snake co-ordinates.
	if (isColloide(snakearr)) {
		bgmusic.pause();
		inputDir = { x: 0, y: 0 };
		alert("Game Over!!. Press any key to restart! ");
		snakearr = [{ x: 10, y: 11 }];
		bgmusic.play();
		score = 0;
		speed = 5;

	}
	//if snake eats food incrementing body and regeration of food
	if (snakearr[0].y === food.y && snakearr[0].x === food.x) {
		foodSound.play();
		score += 1;
		counter += 1;
		if (counter === 7) {
			speed += 2;
			counter = 0;
		}
		if (score > hiscoreval) {
			hiscoreval = score;
			localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
			highscore.innerHTML = "High Score :" + hiscoreval;
		}
		scorebox.innerHTML = "Score : " + score;
		snakearr.unshift({ x: snakearr[0].x + inputDir.x, y: snakearr[0].y + inputDir.y });
		let a = 2;
		let b = 22;
		let c = 2;
		let d = 14;
		food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(c + (d - c) * Math.random()) };
	}
	//moving snake
	for (let i = snakearr.length - 2; i >= 0; i--) {
		snakearr[i + 1] = { ...snakearr[i] };
	}
	snakearr[0].x += inputDir.x;
	snakearr[0].y += inputDir.y;
	//phase 2 displaying snake and food
	//displaying snake 
	board.innerHTML = "";
	snakearr.forEach((e, index) => {
		snakeElement = document.createElement('div');
		snakeElement.style.gridRowStart = e.y;
		snakeElement.style.gridColumnStart = e.x;
		if (index === 0) {
			snakeElement.classList.add('head');
		}
		else {
			snakeElement.classList.add('snake');
		}
		board.appendChild(snakeElement);
	});
	//displaying the food
	foodElement = document.createElement('div');
	foodElement.style.gridRowStart = food.y;
	foodElement.style.gridColumnStart = food.x;
	foodElement.classList.add('food');
	board.appendChild(foodElement);
}





//main logic

let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
	hiscoreval = 0;
	localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else {
	hiscoreval = JSON.parse(hiscore);
	highscore.innerHTML = "High Score : " + hiscore;
}
window.requestAnimationFrame(main);
bgmusic.play();
window.addEventListener('keydown', e => {
	inputDir = { x: 0, y: 1 } //game starts
	movementSound.play();
	switch (e.key) {
		case "ArrowUp":
			console.log("ArrowUp")
			inputDir.x = 0;
			inputDir.y = -1;
			break;
		case "ArrowDown":
			console.log("ArrowDown")
			inputDir.x = 0;
			inputDir.y = 1;
			break;
		case "ArrowLeft":
			console.log("ArrowLeft")
			inputDir.x = -1;
			inputDir.y = 0;
			break;
		case "ArrowRight":
			console.log("ArrowRight")
			inputDir.x = 1;
			inputDir.y = 0;
			break;
		default:
			break;
	}
})