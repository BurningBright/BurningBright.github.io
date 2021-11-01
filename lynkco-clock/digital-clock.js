
var digitSegments = [
  [1,2,3,4,5,6],
  [2,3],
  [1,2,7,5,4],
  [1,2,7,3,4],
  [6,7,2,3],
  [1,6,7,3,4],
  [1,6,5,4,3,7],
  [1,2,3], 
  [1,2,3,4,5,6,7],
  [1,2,7,3,6]
]

document.addEventListener('DOMContentLoaded', function() {
var _hours = document.querySelectorAll('.hours');
var _minutes = document.querySelectorAll('.minutes');
var _seconds = document.querySelectorAll('.seconds');
var timer=setInterval(function() {
  if (seconds_ >= 0) {
    $('.clock-time, .clock').show()
    hours = Math.floor(seconds_ / 3600);
    minutes = Math.floor((seconds_ - hours*3600) /60);
    seconds = Math.floor(seconds_ % 60);
    
    hours < 10 ? hours = "0" + hours : hours = "" + hours;
    minutes < 10 ? minutes = "0" + minutes : minutes = "" + minutes;
    seconds < 10 ? seconds = "0" + seconds : seconds = "" + seconds;
    if($(window).width()>812){
      setNumber(_hours[0], Math.floor(hours/10), 1);
      setNumber(_hours[1], hours%10, 1);
    
      setNumber(_minutes[0], Math.floor(minutes/10), 1);
      setNumber(_minutes[1], minutes%10, 1);
    
      setNumber(_seconds[0], Math.floor(seconds/10), 1);
      setNumber(_seconds[1], seconds%10, 1);
    }else{
      setNumber(_hours[2], Math.floor(hours/10), 1);
      setNumber(_hours[3], hours%10, 1);
    
      setNumber(_minutes[2], Math.floor(minutes/10), 1);
      setNumber(_minutes[3], minutes%10, 1);
    
      setNumber(_seconds[2], Math.floor(seconds/10), 1);
      setNumber(_seconds[3], seconds%10, 1);
    }
    --seconds_;
  } else {
    $('.clock-time, .clock').hide()
    clearInterval(timer);
  }
}, 1000);
});

var setNumber = function(digit, number, on) {
var segments = digit.querySelectorAll('.segment');
var current = parseInt(digit.getAttribute('data-value'));
if (!isNaN(current) && current != number) {
  digitSegments[current].forEach(function(digitSegment, index) {
    setTimeout(function() {
      segments[digitSegment-1].classList.remove('on');
    }, index*45)
  });
}

if (isNaN(current) || current != number) {
  // set new number after
  setTimeout(function() {
    digitSegments[number].forEach(function(digitSegment, index) {
      setTimeout(function() {
        segments[digitSegment-1].classList.add('on');
      }, index*45)
    });
  }, 250);
  digit.setAttribute('data-value', number);
}
}