// Recovery of HTMLElements
const paper = document.getElementById('paper');
const rock = document.getElementById('rock');
const scissors = document.getElementById('scissors');
const play = document.getElementById('play');
const result = document.getElementById('result');
const score = document.getElementById('score');
const reset = document.getElementById('reset');

//  Retrieving score from localStorage or initializing to 0 and updating the score displayed
let userScore = localStorage.getItem('UserScore');
if (userScore === null) {
  userScore = 0;
}
let computeurScore = localStorage.getItem('ComputerScore');
if (computeurScore === null) {
    computeurScore = 0;
}
let draw = localStorage.getItem('Draw');
if (draw === null) {
    draw = 0;
}
score.textContent = `Victoires: Vous: ${userScore} | Ordinateur: ${computeurScore} | Egalités: ${draw}`;

function computerPlay() {
    const choices = ['Pierre', 'Feuille','Ciseaux'];
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    return randomChoice;
}

function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return 'Égalité!';
    } else if (
        (playerChoice === 'Pierre' && computerChoice ==='Ciseaux') ||
        (playerChoice === 'Feuille' && computerChoice === 'Pierre') ||
        (playerChoice ==='Ciseaux' && computerChoice === 'Feuille')
    ) {
        return 'Vous avez gagné!';
    } else {
        return 'Vous avez perdu!';
    }
}
function playRound(playerChoice) {
    const computerChoice = computerPlay();
    play.textContent = `Vous avez choisi ${playerChoice} et l'ordinateur a choisi ${computerChoice}.`;
    const resultMessage = determineWinner(playerChoice, computerChoice);
    result.textContent = resultMessage;
    switch (resultMessage) {
        case 'Vous avez gagné!':
            localStorage.setItem('UserScore', ++userScore);
        break;
        case 'Vous avez perdu!':
            localStorage.setItem('ComputerScore', ++computeurScore);
        break;
        default:
            localStorage.setItem('Draw', ++draw); 
        break;
    }
    score.textContent = `Victoires: Vous: ${userScore} | Ordinateur: ${computeurScore} | Egalités: ${draw}`;
}

paper.addEventListener('click', () => playRound('Feuille'));
rock.addEventListener('click', () => playRound('Pierre'));
scissors.addEventListener('click', () => playRound('Ciseaux'));

reset.addEventListener('click', () => {
    localStorage.setItem('UserScore', 0);
    localStorage.setItem('ComputerScore', 0);
    localStorage.setItem('Draw', 0);
    userScore = 0;
    computeurScore = 0;
    draw = 0;
    score.textContent = `Victoires: Vous: ${userScore} | Ordinateur: ${computeurScore} | Egalités: ${draw}`;
});