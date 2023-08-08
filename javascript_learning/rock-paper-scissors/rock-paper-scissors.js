let computerChoice;
let score = JSON.parse(localStorage.getItem("score"));
if (!score) {
score = {
    wins: 0,
    losses: 0,
    ties: 0,
};
}

updateScoreElement();

function pickComputerMove() {
let randomNumber = Math.random(); // 0 <= ret < 1
if (randomNumber <= 1 / 3) computerChoice = "rock";
else if (randomNumber <= 2 / 3) computerChoice = "paper";
else computerChoice = "scissors";
}
function playGame(playerMove) {
let result;
if (playerMove === "rock") {
    if (computerChoice === "rock") result = "Tie";
    else if (computerChoice === "paper") result = "You lose";
    else result = "You win";
} else if (playerMove === "paper") {
    if (computerChoice === "rock") result = "You win";
    else if (computerChoice === "paper") result = "Tie";
    else result = "You lose";
} else if (playerMove === "scissors") {
    if (computerChoice === "rock") result = "You lose";
    else if (computerChoice === "paper") result = "You win";
    else result = "Tie";
}
if (result === "You win") score.wins += 1;
else if (result === "You lose") score.losses += 1;
else score.ties += 1;

// 重新整理時分數不會被清掉
localStorage.setItem("score", JSON.stringify(score));
document.querySelector(".js-result").innerHTML = result;
document.querySelector(".js-move").innerHTML = `YOU
<img
src="rock-paper-scissors-image/${playerMove}-emoji.png"
alt="Player move"
class="move-icon"
/>
<img
src="rock-paper-scissors-image/${computerChoice}-emoji.png"
alt="Computer move"
class="move-icon"
/>
Computer`;
updateScoreElement();

/*
// 用`...`時, 直接換行就有\n的效果, 但前面的空白不能留
alert(
    `You picked ${playerMove}. Computer picked ${computerChoice}. ${result}
Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`
);
*/
}

function updateScoreElement() {
document.querySelector(
    ".js-score"
).innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}