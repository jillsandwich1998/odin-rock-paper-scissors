function getComputerChoice() {
  let computerSelection = Math.round(Math.random() * 1) + 1;
  console.log(
    `Random number created by getComputerSelection = ${computerSelection}`
  );
  return computerSelection;
}

function game() {
  let roundNumber = 1; //Contador para as partidas;
  //Getting Buttons
  let buttons = document.getElementsByClassName("btn");

  //Criando os parágrafos que irão exibir as informações sobre o jogo
  let playerText = document.createElement("p");
  let computerText = document.createElement("p");
  let resultText = document.createElement("p");
  let winText = document.createElement("p");

  let restartButton = document.createElement("button");
  restartButton.textContent = "RESTART GAME";
  restartButton.className = "restartButton";
  restartButton.style.padding = "40px";

  winText.classList.add("win-text");

  // Adicione uma classe aos parágrafos criados
  let playerWins = 0; // Variável para contagem de vitórias do jogador
  let computerWins = 0; // Variável para contagem de vitórias do computador

  // Criando um fragmento de documento para os parágrafos
  let paragraphFragment = document.createDocumentFragment();

  // Adicionando os elementos de texto ao fragmento
  paragraphFragment.appendChild(playerText);
  paragraphFragment.appendChild(computerText);
  paragraphFragment.appendChild(resultText);
  paragraphFragment.appendChild(winText);

  // Criando div que armazenrá os textos
  let divBotoes = document.createElement("div");
  divBotoes.classList.add("game-info");

  //Adiciona toda a info de texto à div criada de uma vez só
  divBotoes.appendChild(paragraphFragment);

  // Adicionando o fragmento com os parágrafos ao body da página
  let divPrincipal = document.getElementsByClassName("main-content");
  divPrincipal[0].appendChild(divBotoes);

  function playRound(playerSelection, computerSelection) {
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

    // Atualize o texto das vitórias do jogador e do computador
    playerText.textContent = `Player Score: ${playerWins}`;
    computerText.textContent = `Computer Score: ${computerWins}`;

    //Checa para ver se alguém já ganhou o jogo
    if (computerWins === 5 || playerWins === 5) {
      if (computerWins === 5) {
        winText.textContent = "COMPUTER WON THE GAME! - THANKS FOR PLAYING!";
      } else if (playerWins === 5) {
        winText.textContent = "PLAYER WON THE GAME! - THANKS FOR PLAYING!";
      }

      divPrincipal[0].appendChild(restartButton);
      //Evento que acontecerá quando o botão "Restart Game" for clicado
      restartButton.addEventListener("click", function (event) {
        let textos = document.querySelectorAll(".main-content p");
        textos.forEach((texto) => {
          divBotoes.removeChild(texto);
        });
        //Zera as variáveis que armazenam os resultados do jogo
        playerWins = 0;
        computerWins = 0;
        roundNumber=1;
        resultText.textContent = "";
        winText.textContent = "";
        restartButton.remove();
      });
    }
  }

  //START ROUND
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function (event) {
      //AÇÃO EXECUTADA QUANDO O BOTÃO É CLICADO
      let clickedButton = event.target;
      let computerSelection = getComputerChoice();

      //Obtendo as classes do botão que foi clicado pelo usuário
      let buttonClass = clickedButton.classList;

      if (buttonClass.contains("rock")) {
        playerSelection = 0;
      } else if (buttonClass.contains("paper")) {
        playerSelection = 1;
      } else if (buttonClass.contains("scissors")) {
        playerSelection = 2;
      }

      if (roundNumber === 1) {
        paragraphFragment.appendChild(playerText);
        paragraphFragment.appendChild(computerText);
        paragraphFragment.appendChild(resultText);
        paragraphFragment.appendChild(winText);
        divBotoes.appendChild(paragraphFragment);
      }
      console.log(`Player selected: ${playerSelection}`);
      playRound(playerSelection, computerSelection, roundNumber);
      roundNumber++;
    });
  }
}

game();
