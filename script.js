
const choices = ["rock", "paper", "scissors"];

const emojis = {
    rock: "✊",
    paper: "✋",
    scissors: "✌️"
};

let playerScore = 0;
let computerScore = 0;

const playerScoreElement =
    document.getElementById("player-score");

const computerScoreElement =
    document.getElementById("computer-score");

const playerChoiceElement =
    document.getElementById("player-choice");

const computerChoiceElement =
    document.getElementById("computer-choice");

const resultElement =
    document.getElementById("result");

const messageElement =
    document.getElementById("message");

const choiceButtons =
    document.querySelectorAll(".choice");

choiceButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        playGame(button.dataset.choice);
    });
});

function playGame(playerChoice) {
    const randomIndex = Math.floor(
        Math.random() * choices.length
    );

    const computerChoice = choices[randomIndex];

    playerChoiceElement.textContent = emojis[playerChoice];
    computerChoiceElement.textContent = emojis[computerChoice];

    if (playerChoice === computerChoice) {
        resultElement.textContent = "🤝 It's a Draw!";
        messageElement.textContent =
            "You both chose " + playerChoice + ". Try again!";
    } else if (
        (playerChoice === "rock" &&
         computerChoice === "scissors") ||

        (playerChoice === "paper" &&
         computerChoice === "rock") ||

        (playerChoice === "scissors" &&
         computerChoice === "paper")
    ) {
        playerScore++;
        resultElement.textContent = "🎉 You Win!";
        messageElement.textContent =
            playerChoice + " beats " + computerChoice + "!";
    } else {
        computerScore++;
        resultElement.textContent = "😢 Computer Wins!";
        messageElement.textContent =
            computerChoice + " beats " + playerChoice + "!";
    }

    playerScoreElement.textContent = playerScore;
    computerScoreElement.textContent = computerScore;
}

document.getElementById("reset-button")
    .addEventListener("click", function() {
        playerScore = 0;
        computerScore = 0;

        playerScoreElement.textContent = 0;
        computerScoreElement.textContent = 0;

        playerChoiceElement.textContent = "❔";
        computerChoiceElement.textContent = "❔";

        resultElement.textContent = "Make your move!";
        messageElement.textContent =
            "Choose rock, paper or scissors below.";
    });
