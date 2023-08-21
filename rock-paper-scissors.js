//Variáveis Globais
let paragraphFragment = document.createDocumentFragment();
let roundNumber = 0; //Contador para as partidas;
let playerWins = 0; // Variável para contagem de vitórias do jogador
let computerWins = 0; // Variável para contagem de vitórias do computador
let restartButton; //Botão de reset do jogo
let playerText;
let computerText;
let winText;
let resultText;
const divPrincipal = document.getElementsByClassName("main-content");
let divBotoes = document.createElement("div");
let buttons = document.getElementsByClassName("btn");

function getComputerChoice() {
  let computerSelection = Math.round(Math.random() * 1) + 1;
  console.log(
    `Random number created by getComputerSelection = ${computerSelection}`
  );
  return computerSelection;
}

function playerSelectionChooser(event) {
  const clickedButton = event.target;
  const computerSelection = getComputerChoice();
  const buttonClass = clickedButton.classList;

  let playerSelection;
  if (buttonClass.contains("rock")) {
    playerSelection = 0;
  } else if (buttonClass.contains("paper")) {
    playerSelection = 1;
  } else if (buttonClass.contains("scissors")) {
    playerSelection = 2;
  }

  playRound(playerSelection, computerSelection);
}

function addPlayEvents() {
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", playerSelectionChooser);
  }
}

function createGameElements() {
  //Criando os parágrafos que irão exibir as informações sobre o jogo
  playerText = document.createElement("p");
  computerText = document.createElement("p");
  resultText = document.createElement("p");
  winText = document.createElement("p");

  restartButton = document.createElement("button");
  restartButton.textContent = "RESTART GAME";
  restartButton.className = "restartButton";
  restartButton.style.padding = "40px";

  winText.classList.add("win-text");

  // Adicionando os elementos de texto ao fragmento
  paragraphFragment.appendChild(playerText);
  paragraphFragment.appendChild(computerText);
  paragraphFragment.appendChild(resultText);
  paragraphFragment.appendChild(winText);

  // Criando div que armazenrá os textos

  divBotoes.classList.add("game-info");

  //Adiciona toda a info de texto à div criada de uma vez só
  divBotoes.appendChild(paragraphFragment);

  // Adicionando o fragmento com os parágrafos ao body da página
  divPrincipal[0].appendChild(divBotoes);
}

// MOSTRA OS RESULTADOS NA TELA
function displayRoundResults(playerSelection, computerSelection) {
  //ROCK == 0
  //PAPER == 1
  //SCISSORS == 2

  if (playerSelection === 0 && computerSelection === 1) {
    resultText.textContent = `Round ${roundNumber}: COMPUTER WINS! - HE CHOSE PAPER AND YOU CHOSE ROCK`;
    computerWins++;
  } else if (playerSelection === 0 && computerSelection === 2) {
    resultText.textContent = `Round ${roundNumber}: YOU WIN! - YOU CHOSE ROCK AND COMPUTER CHOSE SCISSORS`;
    playerWins++;
  } else if (playerSelection === 1 && computerSelection === 0) {
    resultText.textContent = `Round ${roundNumber}: YOU WIN! - YOU CHOSE PAPER AND COMPUTER CHOSE ROCK`;
    playerWins++;
  } else if (playerSelection === 1 && computerSelection === 2) {
    resultText.textContent = `Round ${roundNumber}: COMPUTER WINS! - HE CHOSE SCISSORS AND YOU CHOSE PAPER`;
    computerWins++;
  } else if (playerSelection === 2 && computerSelection === 0) {
    resultText.textContent = `Round ${roundNumber}: COMPUTER WINS! - HE CHOSE ROCK AND YOU CHOSE SCISSORS`;
    computerWins++;
  } else if (playerSelection === 2 && computerSelection === 1) {
    resultText.textContent = `Round ${roundNumber}: YOU WIN! - YOU CHOSE SCISSORS AND COMPUTER CHOSE PAPER`;
    playerWins++;
  } else {
    resultText.textContent = `Round ${roundNumber}: IT'S A TIE! - BOTH CHOSE THE SAME`;
  }
}

function displayNewScore(playerWins, computerWins) {
  // Atualize o texto das vitórias do jogador e do computador
  playerText.textContent = `Player Score: ${playerWins}`;
  computerText.textContent = `Computer Score: ${computerWins}`;
}

function initializeGame() {
  createGameElements();

  let computerSelection;
  let playerSelection;
  let buttonClass;
  let clickedButton;

  //Adiciona eventos aos botões de escolhas
  addPlayEvents();
}

function playRound(playerSelection, computerSelection) {
  roundNumber++;
  console.log("Round Number = " + roundNumber);
  //Irá exibir os resultados do round atual na tela e incrementará o número de vitórias do jogador
  displayRoundResults(playerSelection, computerSelection);

  //Atualiza as informações da tela sobre o score de cada um dos jogadores
  displayNewScore(playerWins, computerWins);

  //Checa se um dos jogadores já atingiu 5 vitórias, se sim, finaliza o game, se não o jogo continua.
  if (computerWins === 5 || playerWins === 5) {
    endGame(playerWins, computerWins);
  }
}

function restartGame() {
  // Remove o botão de reinício, se existir
  if (restartButton) {
    restartButton.remove();
  }

  // Remove os elementos de texto do jogo
  let textos = divBotoes.querySelectorAll("p");
  textos.forEach((texto) => {
    divBotoes.removeChild(texto);
  });

  // Zera as variáveis do jogo
  playerWins = 0;
  computerWins = 0;
  roundNumber = 0;

  //Adiciona os eventos ao jogo novamente
  addPlayEvents();

  // Recria os elementos de texto e adiciona ao fragmento
  createGameElements();
}

//FUNÇÃO FINALIZA O JOGO
function endGame(playerWins, computerWins) {
  // Checa para ver se alguém já ganhou o jogo
  if (computerWins === 5 || playerWins === 5) {
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].removeEventListener("click", playerSelectionChooser);
    }

    if (computerWins === 5) {
      winText.textContent = "COMPUTER WON THE GAME! - THANKS FOR PLAYING!";
    } else if (playerWins === 5) {
      winText.textContent = "PLAYER WON THE GAME! - THANKS FOR PLAYING!";
    }

    // Adiciona o botão de reinício
    divPrincipal[0].appendChild(restartButton);

    // Define o evento de clique no botão de reinício
    restartButton.addEventListener("click", restartGame);
  }
}

//INICIALIZAÇÃO DO GAME
initializeGame();
