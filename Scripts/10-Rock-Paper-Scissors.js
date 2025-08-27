let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  tie: 0,
};
console.log("Local Storage Message: " + localStorage.getItem("score"));

function updateScoreElement() {
  document.querySelector(
    ".js-score"
  ).innerText = `Wins: ${score.wins} Losses: ${score.losses} Ties: ${score.tie}`;
}

function Play_game(userChoice) {
  let randomNumber = Math.random();
  let computerChoice;
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerChoice = "Rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerChoice = "Paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerChoice = "Scissors";
  }

  let Result;

  if (userChoice === computerChoice) {
    Result = "It's a tie!";
  } else if (
    (userChoice === "Rock" && computerChoice === "Scissors") ||
    (userChoice === "Paper" && computerChoice === "Rock") ||
    (userChoice === "Scissors" && computerChoice === "Paper")
  ) {
    Result = "You win!";
  } else {
    Result = "You lose!";
  }

  if (Result === "You win!") {
    score.wins++;
  } else if (Result === "You lose!") {
    score.losses++;
  } else {
    score.tie++;
  }

  localStorage.setItem("score", JSON.stringify(score));

  document.querySelector(".js-result").innerText = `Result :${Result}`;

  // Map choices to image sources
  const imgMap = {
    Rock: "./Rock image.jpeg",
    Paper: "./Paper image.png",
    Scissors: "./Scissors image.jpeg",
  };

  // Create image HTML for user and computer choices
  const userImg = `<img class='mini-img' src='${imgMap[userChoice]}' alt='${userChoice}' />`;
  const computerImg = `<img class='mini-img' src='${imgMap[computerChoice]}' alt='${computerChoice}' />`;

  document.querySelector(
    ".js-moves"
  ).innerHTML = `YOU: ${userImg} --- ${computerImg} :COMP`;

  updateScoreElement();
}
