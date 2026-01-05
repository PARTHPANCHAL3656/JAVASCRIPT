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

document.querySelector(".js-resetButton").addEventListener("click", () => {
  score.wins = 0;
  score.losses = 0;
  score.tie = 0;
  localStorage.removeItem("score");
  updateScoreElement();
});

document.querySelector(".js-autoPlayButton").addEventListener("click", () => {
  autoPlay();
});

let isAutoPlay = false;
let intervalId;

function autoPlay() {
  if (!isAutoPlay) {
    intervalId = setInterval(function () {
      const userChoice = computerChoice();
      Play_game(userChoice);
    }, 1000);
    isAutoPlay = true;
    document.querySelector(".js-autoPlayButton").innerHTML = `Stop play`;
  } else {
    clearInterval(intervalId);
    isAutoPlay = false;
    document.querySelector(".js-autoPlayButton").innerHTML = `Auto play`;
  }
}

function computerChoice() {
  let randomNumber = Math.random();
  let computerChoice;
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerChoice = "Rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerChoice = "Paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerChoice = "Scissors";
  }
  return computerChoice;
}

document.querySelector(".js-rock-button").addEventListener("click", () => {
  Play_game("Rock");
}); //same as "onclick=Play_game('Rock');"
document.querySelector(".js-paper-button").addEventListener("click", () => {
  Play_game("Paper");
}); //same as "onclick=Play_game('Paper');"
document.querySelector(".js-scissors-button").addEventListener("click", () => {
  Play_game("Scissors");
}); //same as "onclick=Play_game('Scissors');"

document.body.addEventListener("keydown", (event) => {
  if (event.key === "r") {
    //same as "onclick=Play_game('Rock');" for r
    Play_game("Rock");
  } else if (event.key === "p") {
    //same as "onclick=Play_game('Paper');" for p
    Play_game("Paper");
  } else if (event.key === "s") {
    //same as "onclick=Play_game('Scissors');" for s
    Play_game("Scissors");
  } else if (event.key === "a") {
    autoPlay();
  } else {
    console.log(event.key);
  }
}); //tells the key pressed on keyboard

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
