const colors = ["green", "red", "yellow", "blue"];
let gameInProgress = false;
let randomlyGeneratedColors = [];
let position = 0;
let debug = true;

function startGame() {
    restartFlags();
    gameInProgress = true;
    nextLevel();
}

function nextLevel() {
    // Randomly chosen color.
    let color = colors[randomNumberGenerator()];
    randomlyGeneratedColors.push(color);

    updateProgress();
    setTimeout(function () {
        animateButton(color);
    }, 500);

    if (debug) {
        console.log(randomlyGeneratedColors);
    }
}

function checkAnswer(color) {
    if (color === randomlyGeneratedColors[position]) {
        // Adds new level when player has reached the end of array.
        if (!updatePosition()) {
            nextLevel();
        }
        return true;

    } else {
        return false;
    }
}

function gameOver() {
    const body = $("body");
    const gameOver = "game-over";

    body.addClass(gameOver);
    setTimeout(function () {
        body.removeClass(gameOver);
    }, 100);

    new Audio("sounds/wrong.mp3").play();

    updateTitle("Game Over, Press Any Key To Restart");
    restartFlags();
}

// Returns true if the position has been updated or false if there needs to be a new level.
function updatePosition() {
    if (++position === randomlyGeneratedColors.length) {
        position = 0;
        return false;
    }

    return true;
}

function restartFlags() {
    gameInProgress = false;
    randomlyGeneratedColors = [];
    position = 0;
}

$(document).keypress(function () {
    if (!gameInProgress) {
        startGame();
    }
});

// Add click event.
$("button").click(function (event) {
    if (!gameInProgress) {
        $("#level-title").effect("shake");
        return;
    }

    let color = event.target.id;
    if (colors.includes(color)) {
        // If the user clicks the right button.
        if (checkAnswer(color)) {
            updateProgress();
            animateButton(color);
        } else {
            gameOver();
        }
    }
});

function updateTitle(text) {
    $("#level-title").text(text);
}

function updateProgress() {
    let length = randomlyGeneratedColors.length;
    let text = "Level " + length + " Progress: " + position + "/" + length;
    updateTitle(text);
}

function animateButton(color) {
    const pressed = "pressed";
    const element = $("#" + color);

    element.addClass(pressed);
    setTimeout(function () {
        element.removeClass(pressed)
    }, 100);

    new Audio("sounds/" + color + ".mp3").play();
}

// Generates a random number between 0 and 3.
function randomNumberGenerator(limit = 4) {
    return Math.floor(Math.random() * limit);
}