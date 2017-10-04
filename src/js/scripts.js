var score = {
  win: 0,
  lose: 0,
  tie: 0
}

$('input[type="radio"]').on('click', function() {
  var computerChoice = Math.random();
  var userChoice = $('input[type="radio"]:checked').val();
  var choices = '';
  var bothChoices = [];
  var outcome = '';

  if (computerChoice < 0.2) {
    computerChoice = 'Rock';
  } else if (computerChoice >= 0.2 && computerChoice < 0.4) {
    computerChoice = 'Paper';
  } else if (computerChoice >= 0.4 && computerChoice < 0.6) {
    computerChoice = 'Scissors';
  } else if (computerChoice >= 0.6 && computerChoice < 0.8) {
    computerChoice = 'Lizard';
  } else {
    computerChoice = 'Spock';
  }

  choices = `The computer chose ${computerChoice} and you chose ${userChoice}`;

  bothChoices.push(computerChoice, userChoice);

  function showOutcome(choice1, action, choice2) {
    if(bothChoices.includes(choice1) && bothChoices.includes(choice2)) {
      outcome = `${choice1} ${action} ${choice2}`;
    }
  }

  showOutcome('Scissors', 'cuts', 'Paper');
  showOutcome('Paper', 'covers', 'Rock');
  showOutcome('Rock', 'crushes', 'Lizard');
  showOutcome('Lizard', 'poisons', 'Spock');
  showOutcome('Spock', 'smashes', 'Scissors');
  showOutcome('Scissors', 'decapitates', 'Lizard');
  showOutcome('Lizard', 'eats', 'Paper');
  showOutcome('Paper', 'disproves', 'Spock');
  showOutcome('Spock', 'vaporizes', 'Rock');
  showOutcome('Rock', 'crushes', 'Scissors');

  if (computerChoice === userChoice) {
    $('.rules-score__item--text h3').text(`${choices}. It's a tie!`);
    score.tie += 1;
    $('tr:last-of-type td:nth-of-type(3)').text(score.tie);
  } else if ((userChoice === 'Scissors' && computerChoice === 'Paper') || (userChoice === 'Paper' && computerChoice === 'Rock') || (userChoice === 'Rock' && computerChoice === 'Lizard') || (userChoice === 'Lizard' && computerChoice === 'Spock') || (userChoice === 'Spock' && computerChoice === 'Scissors') || (userChoice === 'Scissors' && computerChoice === 'Lizard') || (userChoice === 'Lizard' && computerChoice === 'Paper') || (userChoice === 'Paper' && computerChoice === 'Spock') || (userChoice === 'Spock' && computerChoice === 'Rock') || (userChoice === 'Rock' && computerChoice === 'Scissors')) {
    $('.rules-score__item--text h3').text(`${choices}. ${outcome}, so you win!`);
    score.win += 1;
    $('tr:last-of-type td:nth-of-type(1)').text(score.win);
  } else {
    $('.rules-score__item--text h3').text(`${choices}. ${outcome}, so you lose!`);
    score.lose += 1;
    $('tr:last-of-type td:nth-of-type(2)').text(score.lose);
  }
});
