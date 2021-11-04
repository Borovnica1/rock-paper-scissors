const scoreNumber = document.querySelector('.score-number');
const playOptionButtons = document.querySelectorAll('.game-board-1 .play-option-back');
const gameBoardOne = document.querySelector('.game-board-1');
const gameBoardTwo = document.querySelector('.game-board-2');
const result = document.querySelector('.result');
const resultText = document.querySelector('.result-text');
const playerOptions = document.querySelectorAll('.my-pick .play-option-back');
const computerOptions = document.querySelectorAll('.opponent-pick .play-option-back');
const opponentTextOver = document.querySelector('.opponent-pick .pick-text');
const playAgain = document.querySelector('.play-again');
const rules = document.querySelector('.rules');
const overlay = document.querySelector('.overlay');
const closeIcon = document.querySelector('.modal-header svg');
let score = 0;
let computerInterval;

function computerChoosingSign() {
  let random = Math.floor(Math.random() * 3) + 0;
  for (let option of computerOptions) {
    option.classList.remove('play-option-back--active');
  };
  computerOptions[random].classList.add('play-option-back--active');
};

function showWinner() {
  clearInterval(computerInterval);
  result.classList.add('result--active');
  opponentTextOver.textContent = 'THE HOUSE PICKED';
  let computerChose;
  let playerChose;
  for (let option of computerOptions) {
    if (option.classList.contains('play-option-back--active')) computerChose = option.dataset.sign;
  };
  for (let option of playerOptions) {
    if (option.classList.contains('play-option-back--active')) playerChose = option.dataset.sign;
  };

  const winner = decideWinner(playerChose, computerChose);
  if (winner == 2) {
    resultText.textContent = 'DRAW';
  } else if (winner == 1) {
    resultText.textContent = 'YOU LOSE';
    for (let option of computerOptions) {
      if (option.classList.contains('play-option-back--active')) option.querySelector('.winner').classList.add('winner--active');
    };
    scoreNumber.textContent = `${--score}`;
  } else {
    resultText.textContent = 'YOU WIN';
    for (let option of playerOptions) {
      if (option.classList.contains('play-option-back--active')) option.querySelector('.winner').classList.add('winner--active');
    };
    scoreNumber.textContent = `${++score}`;
  }
};

function decideWinner(player, comp) {
  if (player === comp) return 2
  else if (player === 'paper' && comp === 'rock') return 0;
  else if (player === 'paper' && comp === 'scissors') return 1;
  else if (player === 'rock' && comp === 'paper') return 1;
  else if (player === 'rock' && comp === 'scissors') return 0;
  else if (player === 'scissors' && comp === 'paper') return 0;
  else if (player === 'scissors' && comp === 'rock') return 1;
};

function playOneRound() {
  for (let option of playerOptions) {
    if (option.dataset.sign === this.dataset.sign) option.classList.add('play-option-back--active');
  };
  gameBoardOne.classList.remove('game-board--active');
  gameBoardTwo.classList.add('game-board--active');
  computerInterval = setInterval(computerChoosingSign, 100);
  setTimeout(showWinner, 1000);
};

function setToPlayAgain() {
  gameBoardOne.classList.add('game-board--active');
  gameBoardTwo.classList.remove('game-board--active');
  result.classList.remove('result--active');
  opponentTextOver.textContent = 'THE HOUSE PICKING';
  const winnerEl = document.querySelector('.winner--active');
  if (winnerEl) winnerEl.classList.remove('winner--active');
  for (let option of computerOptions) {
    option.classList.remove('play-option-back--active');
  };
  for (let option of playerOptions) {
    option.classList.remove('play-option-back--active');
  };
};

function toggleModal() {
  overlay.classList.toggle('overlay--active');
}

for (let btn of playOptionButtons) {
  btn.addEventListener('click', playOneRound);
};

rules.addEventListener('click', toggleModal);
closeIcon.addEventListener('click', toggleModal);
playAgain.addEventListener('click', setToPlayAgain);