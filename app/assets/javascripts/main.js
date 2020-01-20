shooting = false;
timePressed = null;
timeReleased = null;
keyDown = false;

score = 0;
timerStarted = false;
gameOver = false;

timerInit = 5;
timer = timerInit;
chancePercentage = 50;
meterFillValue = 2;

restartGame = function() {
  score = 0;
  scoreElement.text(0);
  gameOver = false;
  $('#gameOverModal').addClass('hidden');
  timerStarted = false;
  timer = timerInit;
}

checkKeyup = function() {
  $(document).keyup(function(event) {
    if (event.which == 32) {
      keyDown = false;
    }
  })
}

animateBall = function(made) {
  if (made) {
    ball.animate({
      right: '45%',
      bottom: '50%'
    })
    ball.animate({
      right: '45%',
      bottom: '0'
    })
  } else {
    ball.animate({
      right: '70%',
      bottom: '50%'
    })
    ball.animate({
      right: '100%',
      bottom: '0'
    })
  }
}

shotMade = function(text) {
  animateBall(true);
  shotIndicator.text(text);
  shotIndicator.css('color', 'limegreen');
  score += 1;
  scoreElement.text(score);
  $('#finalScore').text(score);
}

shotMissed = function(text) {
  shotIndicator.text(text);
  shotIndicator.css('color', 'red');
  animateBall(false);
}

shoot = function() {
  var meterValue = $('#meter').height() - $('#meter-fill').height();
  var shotIndicator = $('#shotIndicator');
  if (meterValue >= 40 && meterValue <= 50) {
    shotMade('Perfect!');
  } else if (meterValue >= 20 && meterValue < 40) {
    var random = Math.random() * 100
    if (random > chancePercentage) {
      shotMade('Nice!');
    } else {
      shotMissed('A little long :(');
    }
  } else if (meterValue > 50 && meterValue <= 70) {
    var random = Math.random() * 100
    if (random > chancePercentage) {
      shotMade('Whoo Whoo!');
    } else {
      shotMissed('Missed! Just a little short');
    }
  } else {
    shotMissed('Whoops!');
  }
  setTimeout(function() {
    shooting = false;
    $('#meter-fill').height(0);
    ball.css('right', 0);
    ball.css('bottom', 0);
  }, 1000)
}

startShot = function(event) {
  setTimeout(function() {
    checkKeyup();
    if (keyDown) {
      $('#meter-fill').height(`+=${meterFillValue}px`);
      startShot();
    } else {
      shoot();
    }
  }, 0.0)
}

runTimer = function() {
  timer = timer - 1;
  timerElement.text(timer);
  setTimeout(function() {
    if (timer > 0) {
      runTimer();
    } else {
      gameOver = true;
      $('#scoreField').val(score);
      $('#gameOverModal').removeClass('hidden');
    }
  }, 1000);
}

$(document).ready(function() {
  shotIndicator = $('#shotIndicator');
  scoreElement = $('#score');
  ball = $('#ball');
  timerElement = $('#timer');

  timerElement.text(timer);

  $(document).keydown(function(event) {
    if (event.which == 32 && !shooting && !gameOver) {
      if (!timerStarted) {
        runTimer()
        timerStarted = true
      }
      keyDown = true;
      shooting = true;
      startShot(event);
    }
  })

  $('#restart').on('click', function() {
    restartGame();
  })
})


