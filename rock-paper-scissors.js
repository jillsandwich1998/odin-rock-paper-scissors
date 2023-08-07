function getComputerChoice() {
  let computerSelection = Math.round(Math.random() * 1) + 1;
  console.log(
    `Random number created by getComputerSelection = ${computerSelection}`
  );
  return computerSelection;
}

function game() {
  let counter = 0;
  while (counter < 5) {
    //Defining main variables
    let playerSelection = prompt(
      "Choose between rock, paper or scissors",
      null
    );
    playerSelection = determinePlayerChoice(playerSelection); //Player's choice converted to a valid int (0,1 or 2)
    let computerSelection = getComputerChoice();
    //START ROUND
    console.log(playRound(playerSelection, computerSelection, counter));
    counter++;
  }
}

function playRound(playerSelection, computerSelection, counter) {
  //ROCK == 0
  //PAPER == 1
  //SCISSORS == 2

  if (playerSelection === 0 && computerSelection === 1) {
    console.log(
      `Round ${counter + 1}: COMPUTER WINS! - HE CHOSE PAPER AND YOU CHOSE ROCK`
    );
  } else if (playerSelection === 0 && computerSelection === 2) {
    console.log(
      `Round ${
        counter + 1
      }: YOU WIN! - YOU CHOSE ROCK AND COMPUTER CHOSE SCISSORS`
    );
  } else if (playerSelection === 1 && computerSelection === 0) {
    console.log(
      `Round ${counter + 1}: YOU WIN! - YOU CHOSE PAPER AND COMPUTER CHOSE ROCK`
    );
  } else if (playerSelection === 1 && computerSelection === 2) {
    console.log(
      `Round ${
        counter + 1
      }: COMPUTER WINS! - HE CHOSE SCISSORS AND YOU CHOSE PAPER`
    );
  } else if (playerSelection === 2 && computerSelection === 0) {
    console.log(
      `Round ${
        counter + 1
      }: COMPUTER WINS! - HE CHOSE ROCK AND YOU CHOSE SCISSORS`
    );
  } else if (playerSelection === 2 && computerSelection === 1) {
    console.log(
      `Round ${
        counter + 1
      }: YOU WIN! - YOU CHOSE SCISSORS AND COMPUTER CHOSE PAPER`
    );
  } else {
    console.log(`Round ${counter + 1}: IT'S A TIE! - BOTH CHOSE THE SAME`);
  }
}

function determinePlayerChoice(playerSelection) {
  let playerNum = null;
  playerSelection = playerSelection.toLowerCase(); // Converte para minúsculas

  while (playerNum === null) {
    if (playerSelection === "rock") {
      playerNum = 0;
    } else if (playerSelection === "paper") {
      playerNum = 1;
    } else if (playerSelection === "scissors") {
      playerNum = 2;
    } else {
      playerSelection = prompt(
        'Invalid choice! Choose between "rock", "paper" or "scissors"',
        null
      );
    }
  }

  return playerNum;
}

game();
