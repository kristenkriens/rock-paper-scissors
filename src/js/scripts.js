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
  $('.outcome__result').removeClass('outcome__result--open');

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

    $('.outcome__choices-item--winner img').removeAttr('src');

    bothChoices.push(computerChoice, userChoice);

    function showOutcome(winner, loser) {
      if (bothChoices.includes(winner) && bothChoices.includes(loser)) {
        $('.outcome__choices-item--winner img').attr('src', `dist/images/${winner}.svg`);
      } else {
        $('.outcome__choices-item--winner img').attr('src', `dist/images/${userChoice}.svg`);
      }
    }

    showOutcome('scissors', 'paper');
    showOutcome('paper', 'rock');
    showOutcome('rock', 'lizard');
    showOutcome('lizard', 'spock');
    showOutcome('spock', 'scissors');
    showOutcome('scissors', 'lizard');
    showOutcome('lizard', 'paper');
    showOutcome('paper', 'spock');
    showOutcome('spock', 'rock');
    showOutcome('rock', 'scissors');

    if ((userChoice === 'scissors' && computerChoice === 'paper') || (userChoice === 'paper' && computerChoice === 'rock') || (userChoice === 'rock' && computerChoice === 'lizard') || (userChoice === 'lizard' && computerChoice === 'spock') || (userChoice === 'spock' && computerChoice === 'scissors') || (userChoice === 'scissors' && computerChoice === 'lizard') || (userChoice === 'lizard' && computerChoice === 'paper') || (userChoice === 'paper' && computerChoice === 'spock') || (userChoice === 'spock' && computerChoice === 'rock') || (userChoice === 'rock' && computerChoice === 'scissors')) {
      score.wins += 1;
      $('.outcome__sides-item--you .outcome__sides-score p').text(score.wins);
    } else if ((userChoice === 'paper' && computerChoice === 'scissors') || (userChoice === 'rock' && computerChoice === 'paper') || (userChoice === 'lizard' && computerChoice === 'rock') || (userChoice === 'spock' && computerChoice === 'lizard') || (userChoice === 'scissors' && computerChoice === 'spock') || (userChoice === 'lizard' && computerChoice === 'scissors') || (userChoice === 'paper' && computerChoice === 'lizard') || (userChoice === 'spock' && computerChoice === 'paper') || (userChoice === 'rock' && computerChoice === 'spock') || (userChoice === 'scissors' && computerChoice === 'rock')) {
      score.losses += 1;
      $('.outcome__sides-item--computer .outcome__sides-score p').text(score.losses);
    }

    if (score.plays == numGamesChoice) {
      $('.options').addClass('options--disabled');

      $('.outcome__result').addClass('outcome__result--open');

      if (score.wins > score.losses) {
        $('.outcome__result').text('You Win!');
      } else if (score.wins < score.losses) {
        $('.outcome__result').text('You Lose!');
      } else {
        $('.outcome__result').text('It\'s a tie!');
      }
    }
  }
});
