var buttonColors = ["red","blue","green","yellow"]
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var status=1;
var gameOverStatus=0;
function nextSequence() {
  userClickedPattern=[];
  level++;
   $("h1").text("Level - " + level); 
   var randomNumber = Math.floor(Math.random() * 4);
   
   var randomColor = buttonColors[randomNumber];

   gamePattern.push(randomColor);
  
   $("#" + randomColor).fadeOut(100).fadeIn(100);
   playSound(randomColor); 
   
   
}

$(".btn").click(function(){
  if(gameOverStatus==0)
  {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
  }
})

function animatePress(clickButton) {
    $("#" + clickButton).addClass("pressed");
    setTimeout(function() {
      $("#" + clickButton).removeClass("pressed")
    },100)
}

$(document).ready($(document).keypress(function() {
  if(status==1){
 $("h1").text("Level - " + level);
  nextSequence();
  status = 0;
  gameOverStatus=0;
  }
}))
function playSound(name) {
   var audio = new Audio("sounds/" + name + ".mp3");
   audio.play();
 }
 
function checkAnswer(currentlevel){
  if(gamePattern[currentlevel]===userClickedPattern[currentlevel]){
    if(userClickedPattern.length===gamePattern.length){
     setTimeout(function(){
      nextSequence(); 
      $("h1").text("Level - " + level);
     },1000) 
    }
  } 
  else{
    playSound("wrong");
    gamePattern=[];
    level=0;
    $("body").addClass("game-over");
    $("h1").text("Game-Over,press any key to start");
    status=1; 
    gameOverStatus=1;
     
  }
  setTimeout(function(){
    $("body").removeClass("game-over")
  },1000
  )
}