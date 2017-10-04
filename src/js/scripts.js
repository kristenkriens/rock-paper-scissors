var score = {
  win: 0,
  lose: 0,
  tie: 0
}

$('input[type="radio"]').on('click', function() {
  var computerChoice = Math.random();
  var userChoice = $('input[type="radio"]:checked').val();
  var choices = '';
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

  if ((userChoice === 'Scissors' || computerChoice === 'Scissors') && (userChoice === 'Paper' || computerChoice === 'Paper')) {
    outcome = 'Scissors cuts Paper';
  } else if ((userChoice === 'Paper' || computerChoice === 'Paper') && (userChoice === 'Rock' || computerChoice === 'Rock')) {
    outcome = 'Paper covers Rock';
  } else if ((userChoice === 'Rock' || computerChoice === 'Rock') && (userChoice === 'Lizard' || computerChoice === 'Lizard')) {
    outcome = 'Rock crushes Lizard';
  } else if ((userChoice === 'Lizard' || computerChoice === 'Lizard') && (userChoice === 'Spock' || computerChoice === 'Spock')) {
    outcome = 'Lizard poisons Spock';
  } else if ((userChoice === 'Spock' || computerChoice === 'Spock') && (userChoice === 'Scissors' || computerChoice === 'Scissors')) {
    outcome = 'Spock smashes Scissors';
  } else if ((userChoice === 'Scissors' || computerChoice === 'Scissors') && (userChoice === 'Lizard' || computerChoice === 'Lizard')) {
    outcome = 'Scissors decapitates Lizard';
  } else if ((userChoice === 'Lizard' || computerChoice === 'Lizard') && (userChoice === 'Paper' || computerChoice === 'Paper')) {
    outcome = 'Lizard eats Paper';
  } else if ((userChoice === 'Paper' || computerChoice === 'Paper') && (userChoice === 'Spock' || computerChoice === 'Spock')) {
    outcome = 'Paper disproves Spock';
  } else if ((userChoice === 'Spock' || computerChoice === 'Spock') && (userChoice === 'Rock' || computerChoice === 'Rock')) {
    outcome = 'Spock vaporizes Rock';
  } else if ((userChoice === 'Rock' || computerChoice === 'Rock') && (userChoice === 'Scissors' || computerChoice === 'Scissors')) {
    outcome = 'Rock crushes Scissors';
  } else {
    outcome = 'You chose the same as the computer';
  }

  if (computerChoice === userChoice) {
    $('.rules-results__item--text h3').text(`${choices}. ${outcome}, so it's a tie!`);
    score.tie += 1;
    $('tr:last-of-type td:nth-of-type(3)').text(score.tie);
  } else if ((userChoice === 'Scissors' && computerChoice === 'Paper') || (userChoice === 'Paper' && computerChoice === 'Rock') || (userChoice === 'Rock' && computerChoice === 'Lizard') || (userChoice === 'Lizard' && computerChoice === 'Spock') || (userChoice === 'Spock' && computerChoice === 'Scissors') || (userChoice === 'Scissors' && computerChoice === 'Lizard') || (userChoice === 'Lizard' && computerChoice === 'Paper') || (userChoice === 'Paper' && computerChoice === 'Spock') || (userChoice === 'Spock' && computerChoice === 'Rock') || (userChoice === 'Rock' && computerChoice === 'Scissors')) {
    $('.rules-results__item--text h3').text(`${choices}. ${outcome}, so you win!`);
    score.win += 1;
    $('tr:last-of-type td:nth-of-type(1)').text(score.win);
  } else {
    $('.rules-results__item--text h3').text(`${choices}. ${outcome}, so you lose!`);
    score.lose += 1;
    $('tr:last-of-type td:nth-of-type(2)').text(score.lose);
  }
});
