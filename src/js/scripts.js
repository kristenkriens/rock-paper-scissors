var score = {
  wins: 0,
  losses: 0,
  plays: 0
}

var numGamesChoice = 0;

$('#games input[type="radio"]').on('click', function() {
  numGamesChoice = $('#games input[type="radio"]:checked').val();

  $('#games input[type="radio"]').parent().removeClass('games-count__box-option--active');
  $('#games input[type="radio"]:checked').parent().addClass('games-count__box-option--active');

  $('.options').addClass('options--open');
  $('.options').removeClass('options--disabled');
  $('.options__item').removeClass('options__item--active');

  $('.outcome').removeClass('outcome--open');

  score.wins = 0;
  score.losses = 0;
  score.plays = 0;

  $('.outcome__sides-item--you .outcome__sides-score p').text(score.wins);
  $('.outcome__sides-item--computer .outcome__sides-score p').text(score.losses);
});

$('#options input[type="radio"]').on('click', function() {
  score.plays += 1;

  if (score.plays <= numGamesChoice) {
    var computerChoice = Math.random();
    var userChoice = $('#options input[type="radio"]:checked').val();
    var bothChoices = [];
    var outcome = '';

    $('.outcome').addClass('outcome--open');

    $('#options input[type="radio"]').parent().parent().removeClass('options__item--active');
    $('#options input[type="radio"]:checked').parent().parent().addClass('options__item--active');

    if (computerChoice < 0.2) {
      computerChoice = 'rock';
    } else if (computerChoice >= 0.2 && computerChoice < 0.4) {
      computerChoice = 'paper';
    } else if (computerChoice >= 0.4 && computerChoice < 0.6) {
      computerChoice = 'scissors';
    } else if (computerChoice >= 0.6 && computerChoice < 0.8) {
      computerChoice = 'lizard';
    } else {
      computerChoice = 'spock';
    }

    $('.outcome__choices-item--you img').attr('src', `dist/images/${userChoice}.svg`);
    $('.outcome__choices-item--computer img').attr('src', `dist/images/${computerChoice}.svg`);

    bothChoices.push(computerChoice, userChoice);

    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function showOutcome(choice1, action, choice2) {
      if(bothChoices.includes(choice1) && bothChoices.includes(choice2)) {
        choice1 = capitalizeFirstLetter(choice1);
        choice2 = capitalizeFirstLetter(choice2);
        outcome = `${choice1} ${action} ${choice2}`;
      }
    }

    showOutcome('scissors', 'cuts', 'paper');
    showOutcome('paper', 'covers', 'rock');
    showOutcome('rock', 'crushes', 'lizard');
    showOutcome('lizard', 'poisons', 'spock');
    showOutcome('spock', 'smashes', 'scissors');
    showOutcome('scissors', 'decapitates', 'lizard');
    showOutcome('lizard', 'eats', 'paper');
    showOutcome('paper', 'disproves', 'spock');
    showOutcome('spock', 'vaporizes', 'rock');
    showOutcome('rock', 'crushes', 'scissors');

    if (computerChoice === userChoice) {
      $('.outcome__choices-text').text(`It's a tie!`);
    } else if ((userChoice === 'scissors' && computerChoice === 'paper') || (userChoice === 'paper' && computerChoice === 'rock') || (userChoice === 'rock' && computerChoice === 'lizard') || (userChoice === 'lizard' && computerChoice === 'spock') || (userChoice === 'spock' && computerChoice === 'scissors') || (userChoice === 'scissors' && computerChoice === 'lizard') || (userChoice === 'lizard' && computerChoice === 'paper') || (userChoice === 'paper' && computerChoice === 'spock') || (userChoice === 'spock' && computerChoice === 'rock') || (userChoice === 'rock' && computerChoice === 'scissors')) {
      $('.outcome__choices-text').text(`${outcome}!`);
      score.wins += 1;
      $('.outcome__sides-item--you .outcome__sides-score p').text(score.wins);
    } else {
      $('.outcome__choices-text').text(`${outcome}!`);
      score.losses += 1;
      $('.outcome__sides-item--computer .outcome__sides-score p').text(score.losses);
    }

    if (score.plays == numGamesChoice) {
      $('.options').addClass('options--disabled');
    }
  }
});
