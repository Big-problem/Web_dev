let score = JSON.parse(localStorage.getItem("score"));
if (!score) {
    score = {
        wins: 0,
        losses: 0,
        ties: 0,
    };
}

updateScoreElement();

let isAutoPlay = false;
let intervalId;

// document.querySelector('js-rock-button').addEventListener('click', playGame()); // This is WRONG
document.querySelector('.js-rock-button').addEventListener('click', () => {
    playGame('rock');
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
    playGame('paper');
});

document.querySelector('.js-scissors-button').addEventListener('click', () => {
    playGame('scissors');
});

document.querySelector('.js-reset-button').addEventListener('click', () => {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    document.querySelector('.js-result').innerHTML = '';
    document.querySelector('.js-move').innerHTML = '';
    updateScoreElement();
});

document.querySelector('.js-auto-play').addEventListener('click', () => {
    autoPlay();
});

document.body.addEventListener('keydown', (event) => { // 按鍵盤會觸發
    if(event.key === 'r'){
        playGame('rock');
    }
    else if(event.key === 'p'){
        playGame('paper');
    }
    else if(event.key === 's'){
        playGame('scissors');
    }
});

document.body.addEventListener('keydown', (event) => {
    if(event.key === 'a'){
        autoPlay();
    }
});
// ############################################################################
function pickComputerMove() {
    let computerChoice = '';
    let randomNumber = Math.random(); // 0 <= ret < 1
    if (randomNumber <= 1 / 3) computerChoice = "rock";
    else if (randomNumber <= 2 / 3) computerChoice = "paper";
    else computerChoice = "scissors";
    return computerChoice;
}

function playGame(playerMove) {
    const computerChoice = pickComputerMove();
    let result;
    if (playerMove === "rock") { // Get the result (win, lose, tie) 
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

function autoPlay() {
    if(!isAutoPlay){
        intervalId = setInterval(() => { // setInterval returns a number, we can use it to stop it
            const autoMove = pickComputerMove();
            playGame(autoMove);
        }, 1500);
        isAutoPlay = true;
        document.querySelector('.js-auto-play').innerHTML = 'Stop Auto Play';
    }
    else{
        clearInterval(intervalId);
        isAutoPlay = false;
        document.querySelector('.js-auto-play').innerHTML = 'Auto Play';
    }
}