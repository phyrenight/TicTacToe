console.log("hello")

function createBoard(){
  var width = 45;
  var height = 45;
  var style = "style='width:"+width+";% height:"+height+"%;'"
  var $board = $("#board");
    for(var i = 0; i < 9; i++){
      toclick(i)
    }
    whoGoesFirst();
}

function toclick(i){
  var $turn = $("#currentTurn");
  document.getElementById("num"+String(i)).addEventListener("click", (function(){
	var num = "";
    var num = "num" + String(i);
    var $div = $("#" + num);
    spot = document.getElementById(num).innerHTML;
    if(spot != "<p>X</p>" && spot != "<p>O</p>"){
      $div.append("<p>X</p>");
      $turn.empty();
      $turn.append("Computer");
    }
  }));
}

function whoGoesFirst(){
  var turn = document.getElementById("currentTurn");
  var num = randomNumber(2);
  var choice = "";
  if( num === 0){
    //may change to jquery modals.
    choice = prompt("You go first. Are you X\'s or O\'s?");
    turn.innerHTML = "Player";
    assignPieces(choice);
  }
  else{
    choice = prompt("The computer goes first.Are you X\'s or O\'s?");
    turn.innerHTML = "Computer";
    assignPieces(choice);
    computerFirst();
  }
}

function assignPieces(choice){
  var Xs = document.getElementById("X");
  var Os = document.getElementById("O");
  if(choice == "X" || choice == "x"){
    Xs.innerHTML = "Player";
    Os.innerHTML = "Computer";
  }
  else if(choice == "O" || choice == "o"){
    Xs.innerHTML = "Computer";
    Os.innerHTML = "Player";
  }
  else{
    whoGoesFirst();
  }
}

function randomNumber(num = 9){
  return Math.floor(Math.random() * num);
}
console.log(randomNumber());

function computerFirst(){
  var $turn = $("#currentTurn");
  var num = randomNumber();
  var str = "#num"+ String(num);
  console.log(str);
  var $square = $(str);
  $square.append("<p>O</p>");
  $turn.empty();
  $turn.append("Player");
}
