$(function() {
  var score = {
    wins: 0,
    losses: 0,
    plays: 0
  }

  var numGamesChoice = 0;

  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function resetAll() {
    $('.options').removeClass('options--open');
    $('.options__item').removeClass('options__item--active');

    $('.games-count__box-option').removeClass('games-count__box-option--active');

    $('.outcome').removeClass('outcome--open');
    $('.results').removeClass('results--open');

    score.wins = 0;
    score.losses = 0;
    score.plays = 0;

    $('.outcome__sides-item--human .outcome__sides-score p').text(score.wins);
    $('.outcome__sides-item--computer .outcome__sides-score p').text(score.losses);

    $('.results__text').text('');
  }

  $('.results__button').on('click', function() {
    resetAll();
  });

  $('#games input[type="radio"]').on('click', function() {
    resetAll();

    numGamesChoice = $('#games input[type="radio"]:checked').val();

    $('.games-count__box-option').removeClass('games-count__box-option--active');
    $(this).parent().addClass('games-count__box-option--active');

    $('.options').addClass('options--open');
    $('.options').removeClass('options--disabled');

    $('html, body').animate({
        scrollTop: $('#options').offset().top
    }, 1000);
  });

  $('#options input[type="radio"]').on('click', function() {
    score.plays += 1;

    if (score.plays <= numGamesChoice) {
      var computerChoice = Math.random();
      var userChoice = $('#options input[type="radio"]:checked').val();
      var bothChoices = [];
      var outcome = '';

      $('.outcome').addClass('outcome--open');

      $('.options__item').removeClass('options__item--active');
      $(this).parent().parent().addClass('options__item--active');

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

      $('.outcome__choices-item--winner img').removeAttr('src');

      $('.outcome__choices-item--human img').attr('src', `dist/images/${userChoice}-human.svg`).attr('alt', `${capitalize(userChoice)}`);
      $('.outcome__choices-item--computer img').attr('src', `dist/images/${computerChoice}-computer.svg`).attr('alt', `${capitalize(computerChoice)}`);

      bothChoices.push(computerChoice, userChoice);

      function showOutcome(winner, loser) {
        if (bothChoices.includes(winner) && bothChoices.includes(loser)) {
          $('.outcome__choices-item--winner img').attr('src', `dist/images/${winner}.svg`).attr('alt', `${capitalize(winner)}`);
        }

        if(computerChoice === userChoice) {
          $('.outcome__choices-item--winner img').attr('src', `dist/images/${userChoice}.svg`).attr('alt', `${capitalize(userChoice)}`);
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

      if (userChoice === 'scissors') {
        if (computerChoice === 'paper' || computerChoice === 'lizard') {
          score.wins += 1;
          $humanScore.text(score.wins);
        } else if (computerChoice === 'spock' || computerChoice === 'rock') {
          score.losses += 1;
          $computerScore.text(score.losses);
        }
      } else if (userChoice === 'paper') {
        if (computerChoice === 'rock' || computerChoice === 'spock') {
          score.wins += 1;
          $humanScore.text(score.wins);
        } else if (computerChoice === 'scissors' || computerChoice === 'lizard') {
          score.losses += 1;
          $computerScore.text(score.losses);
        }
      } else if (userChoice === 'rock') {
        if (computerChoice === 'lizard' || computerChoice === 'scissors') {
          score.wins += 1;
          $humanScore.text(score.wins);
        } else if (computerChoice === 'paper' || computerChoice === 'spock') {
          score.losses += 1;
          $computerScore.text(score.losses);
        }
      } else if (userChoice === 'lizard') {
        if (computerChoice === 'spock' || computerChoice === 'paper') {
          score.wins += 1;
          $humanScore.text(score.wins);
        } else if (computerChoice === 'rock' || computerChoice === 'scissors') {
          score.losses += 1;
          $computerScore.text(score.losses);
        }
      } else if (userChoice === 'spock') {
        if (computerChoice === 'scissors' || computerChoice === 'rock') {
          score.wins += 1;
          $humanScore.text(score.wins);
        } else if (computerChoice === 'paper' || computerChoice === 'lizard') {
          score.losses += 1;
          $computerScore.text(score.losses);
        }
      }

      function soundsFlash(outcome) {
        setTimeout(function() {
          $('.results__text').append(`<audio autoplay><source src="dist/sounds/${outcome}.mp3" type="audio/mpeg"></audio>`);

          var flash = setInterval(function() {
            $('.results__text').toggleClass('results__text--on');
          }, 250);

          $('.results__text').addClass('results__text--on');

          setTimeout(function() {
            clearInterval(flash);
          }, 1000);
        }, 1000);
      }

      if (score.plays == numGamesChoice) {
        $('.options').addClass('options--disabled');

        setTimeout(function() {
          $('.results').addClass('results--open');
        }, 1000);

        if (score.wins > score.losses) {
          $('.results__text').text('You Win!');

          soundsFlash('winner');
        } else if (score.wins < score.losses) {
          $('.results__text').text('You Lose!');

          soundsFlash('loser');
        } else {
          $('.results__text').text('It\'s a tie!');

          soundsFlash('tie');
        }

        $('.results__score').text(`${score.wins} - ${score.losses}`);
        $('.results__button').addClass('results__button--open');
      } else if (score.plays < numGamesChoice) {
        setTimeout(function() {
          $('html, body').animate({
              scrollTop: $('#options').offset().top
          }, 1000);
        }, 2000);
      }

      $('html, body').animate({
          scrollTop: $('#outcome').offset().top
      }, 1000);

      $('html, body').on('wheel', function(){
        $(this).stop();
      });
    }
  });
});
