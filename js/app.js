var positioning =[{
  line : "row1",
  values : function(){return this.positions[0].values + this.positions[1].values + this.positions[2].values;},
  positions : [{ place : "num0", values: 0},
                {place : "num1", values: 0},
                {place : "num2", values: 0}] 
  },
  {
  	line : "row2",
    values : function(){return this.positions[0].values + this.positions[1].values + this.positions[2].values;},
    positions : [{ place : "num3", values: 0},
                 { place : "num4", values: 0},
                 { place : "num5", values: 0}]
  },
  {
  	line : "row3",
    values : function(){return this.positions[0].values + this.positions[1].values + this.positions[2].values;},
    positions : [{ place : "num6", values: 0},
                 { place : "num7", values: 0},
                 { place : "num8", values: 0}]
  },
  {
  	line : "vertical1",
    values : function(){return this.positions[0].values + this.positions[1].values + this.positions[2].values;},
    positions : [{ place : "num0", values: 0},
                 { place : "num3", values: 0},
                 { place : "num6", values: 0}]
  },
  {
  	line : "vertical2",
    values : function(){return this.positions[0].values + this.positions[1].values + this.positions[2].values;},
    positions : [{ place : "num1", values: 0},
                 { place : "num4", values: 0},
                 { place : "num7", values: 0}]
  },
  {
  	line : "vertical3",
    values : function(){return this.positions[0].values + this.positions[1].values + this.positions[2].values;},
    positions : [{ place : "num2", values: 0},
                 { place : "num5", values: 0},
                 { place : "num8", values: 0}]
  },
  {
  	line : "diagnol1",
    values : function(){return this.positions[0].values + this.positions[1].values + this.positions[2].values;},
    positions : [{ place : "num0", values: 0},
                 { place : "num4", values: 0},
                 { place : "num8", values: 0}]
  },
  {
  	line : "diagnol2",
    values : function(){return this.positions[0].values + this.positions[1].values + this.positions[2].values;},
    positions : [{ place : "num2", values: 0},
                 { place : "num4", values: 0},
                 { place : "num6", values: 0}]
  },];

function createBoard(){
  var $board = $("#board");
    for(var i = 0; i < 9; i++){
      toclick(i);
    }
    whoGoesFirst();
}

function toclick(i){
  var $turn = $("#currentTurn");
  $("#num"+String(i)).click((function(){
  var num = "";
	var Xs = $("#X").html();
    num = "num" + String(i);
    var $div = $("#" + num);
    spot = $("#"+num).html();
    if(!isMatchOver()){
      if($turn.html() == "Player"){
        if(spot != "<p>X</p>" && spot != "<p>O</p>"){
      	  if(Xs == "Player"){
            $div.html("<p>X</p>");
          }
          else{
            $div.html("<p>O</p>");
          }
          updatePositioning(num, 1);
          $turn.html("Computer");
          if(isMatchOver()){
            displayWin();
          }
          else{
          computerMove();
        }
        }
      }
    }
    //else{
   //   displayWin();
   // }
  }));
}

function updatePositioning(divId, value){
  if(divId !== undefined && value !== undefined){
    for(var i in positioning){
      for(var n  = 0; n < 3; ++n){
        if(positioning[i].positions[n].place == divId){
          positioning[i].positions[n].values = value;
          break;
        }
  	  }
  	}
  }
}

function whoGoesFirst(){
  var turn = $("#currentTurn");
  var num = randomNumber(2);
  var Xs = $("#X").html();
  if(!Xs){
    assignPieces(num);
  }
  if( num === 0){
    //may change to jquery modals.
    turn.html("Player");
  }
  else{
    turn.html("Computer");
    computerFirst();
  }
}

function assignPieces(num){
  /*
    assigns X's or O's to the computer and the player
  */
  var Xs = $("#X");
  var Os = $("#O");
  var choice ="";
  if(num === 0 ){
  	choice = prompt("You go first.Are you X\'s or O\'s?");
  }
  else{
  	choice = prompt("The computer goes first. Are you X\'s or O\'s?");
  }
  if(choice == "X" || choice == "x"){
    Xs.html("Player");
    Os.html("Computer");
  }
  else if(choice == "O" || choice == "o"){
    Xs.html("Computer");
    Os.html("Player");
 
  }
  else{
    whoGoesFirst();
  }
}

function randomNumber(num = 9){
  return Math.floor(Math.random() * num);
}

function computerFirst(){
  var Xs = $("#X").html();
  var $turn = $("#currentTurn");
  var num = randomNumber();
  var str = "num"+ String(num);
  var $square = $("#"+str);
  if(Xs == "Player"){
    $square.html("<p>O</p>");
  }
  else{
  	$square.html("<p>X</p>");
  }
  updatePositioning(str, -1);
  $turn.html("Player");
}

function computerMove(){
  var done = false;
  var $turn = $("#currentTurn");
  var pos;
  var computerWin = false;
  if(!isMatchOver()){
    if($turn.html() == "Computer"){
      for(var i in positioning){
  	    if(positioning[i].values() == -2){
  			  pos = findOpenPosition(i);
  			  placeComputerMark(pos.place);
  			  computerWin = true;
          displayWin();
  			  break;
        }
  	    else if(positioning[i].values() == 2){
          pos = findOpenPosition(i);
          placeComputerMark(pos.place);
          done = true;
          if(isMatchOver()){
            displayWin();
          }
          else{
            $turn.html("Player");
            break;
          }
  	    }
      }
    }
  // need to up data positioning down below somehow
    if(!computerWin && !done){
      computerRandomMove();
    }
  }
  else{
    displayWin()
  }
}

function placeComputerMark(square){
  var Xs = $("#X").html();
  if(Xs == "Computer"){
    $("#"+square).html("<p>X</p>");
  }
  else{
    $("#"+square).html("<p>O</p>");
  }
}

function findOpenPosition(line){
  for(var n in positioning[line].positions){  // to boost performance change to the other for loop
    if(positioning[line].positions[n].values === 0){
      var pos = positioning[line].positions[n];
      updatePositioning(pos.place, -1);
      return pos;
    }
  }
}

function computerRandomMove(){
	var found = false;
  var $turn = $("#currentTurn");
  var ranNum = randomNumber();
  var div = $("#num"+ranNum).html();
  if(div != "<p>X</p>" && div != "<p>O</p>"){
    placeComputerMark("num"+ranNum);
    updatePositioning(("num"+ranNum), -1);
    if(isMatchOver()){
      displayWin();
    }
    else{
      $turn.html("Player");
    }
  }
  else{
    computerRandomMove();
  }
}

function whoWon(){
  /*

  */
  var winner = "Draw";
  for(var i in positioning){
    if(positioning[i].values() == 3){
      winner = "Player";
      break;
    }
    else if(positioning[i].values() == -3){
      winner = "Computer";
      break;
    }
  }
  return winner;
}

function displayWin(){
  var winner = whoWon();
  var answer = "";
  if( winner == "Player"){
    answer = prompt("You win. Would you like to play again?(yes or no)");
  }
  else if(winner == "Computer"){
    answer = prompt("You Lose. Would you like to play again?(yes or no)");
  }
  else{
    answer = prompt("Draw. Would you like to play again?(yes or no)");
  }
  if(answer == "yes" || answer == "Yes"){
    newGame();
  }
  else if(answer == "no" || answer == "No"){
    alert("Game over");
  }
  else{
  	alert("Game Over!");
  }
}

function newGame(){
  /*
    resets the board
  */
  var $div;
  for(var i = 0; i < 9; ++i){
  	$div = $("#num"+ i);
  	$div.empty();
  }
  for(var t in positioning){
    for( var n in positioning[t].positions){
      positioning[t].positions[n].values = 0;
	  }
  }
  whoGoesFirst();
}

// to increase performance use positioning.ppositions to find an empty space instead of accessing the dom.
function isMatchOver(){
  /*
    checks to see if the board is fulled
  */
  var draw = true;
  for(var i = 0; i < 9; i++){
    var $div = $("#num"+i);
    if($div.html() != "<p>O</p>" && $div.html() != "<p>X</p>"){
      draw = false;
      break;
    }
  }
  return draw;
}