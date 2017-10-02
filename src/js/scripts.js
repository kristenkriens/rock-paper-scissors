var score = {
  win: 0,
  loss: 0,
  tie: 0
}

while (score.win < 5) {
  var computerChoice = Math.random();
  var userChoice = prompt('Rock, paper, or scissors?').toLowerCase();

  if (computerChoice < 0.33) {
    computerChoice = 'rock';
  } else if (computerChoice >= 0.33 && computerChoice <= 0.66) {
    computerChoice = 'paper';
  } else {
    computerChoice = 'scissors';
  }

  var choices = `The computer chose ${computerChoice} and you chose ${userChoice}`;

  if (computerChoice === userChoice) {
    alert(`${choices}. It's a tie!`);
    score.tie += 1;
  } else if ((userChoice === 'paper' && computerChoice === 'rock') || (userChoice === 'rock' && computerChoice === 'scissors') || (userChoice === 'scissors' && computerChoice === 'paper')) {
    alert(`${choices}. You win!`);
    score.win += 1;
  } else if ((userChoice === 'paper' && computerChoice === 'scissors') || (userChoice === 'rock' && computerChoice === 'paper') || (userChoice === 'scissors' && computerChoice === 'rock')) {
    alert(`${choices}. You lose!`);
    score.loss += 1;
  } else {
    alert('Try again!');
  }

  alert(`Score: ${score.tie} ties, ${score.win} wins, ${score.loss} losses.`);
}

alert('Congratulations, you have won 5 games!');
