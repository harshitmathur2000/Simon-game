var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var toggle = false;
var level = 0;
var userClickedPattern = [];
$(document).keypress(function() {
  if (!toggle) {
    $("#level-title").text("Level " + level);
    nextSequence();
    toggle = true;
  }
});

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length -1);
  
});
function checkAnswer(currLevel){
  if(userClickedPattern[currLevel] === gamePattern[currLevel]){
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function nextSequence() {
  userClickedPattern = []
  level += 1;
  $("#level-title").html("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

}
function animatePress(currentColor){
    var activeBtn = $("#" + currentColor);
    activeBtn.addClass("pressed");
    setTimeout(function(){
        activeBtn.removeClass("pressed");
    },110);
}
function playSound(name){
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}
function startOver() {
  level = 0;
  gamePattern = [];
  toggle= false;
}
