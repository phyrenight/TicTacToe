console.log("hello")
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
  },]

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
 // change all document.getElementById to jquery $("#")
function toclick(i){
  var $turn = $("#currentTurn");
  document.getElementById("num"+String(i)).addEventListener("click", (function(){
	var num = "";
    var num = "num" + String(i);
    var $div = $("#" + num);
    spot = document.getElementById(num).innerHTML;
    console.log(spot);
    if($turn.html() == "Player"){
      if(spot != "<p>X</p>" && spot != "<p>O</p>"){
        $div.append("<p>X</p>");
        updatePositioning(num, 1);
        $turn.empty();
        $turn.append("Computer");
        computerMove();
      }
    }
  }));
}

function updatePositioning(divId, value){
  if(divId != undefined && value != undefined){
    for(var i in positioning){
      for(var n  = 0; n < 3; ++n){
        if(positioning[i].positions[n].place == divId){
          positioning[i].positions[n].values = value;
          console.log(positioning[i].positions[n].values);
          break;
        }
  	  }
  	}
  }
}

function whoGoesFirst(){
  var turn = document.getElementById("currentTurn");
  var num = randomNumber(2);
  var Xs = $("#X").html();
  if(!Xs){
    assignPieces(num);
  }
  if( num === 0){
    //may change to jquery modals.
    turn.innerHTML = "Player";
  }
  else{
    turn.innerHTML = "Computer";
    computerFirst();
  }
}

function assignPieces(num){
  var Xs = document.getElementById("X");
  var Os = document.getElementById("O");
  var choice ="";
  if(num === 0 ){
  	choice = prompt("You go first.Are you X\'s or O\'s?");
  }
  else{
  	choice = prompt("The computer goes first. Are you X\'s or O\'s?");
  }
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

function computerFirst(){
  var $turn = $("#currentTurn");
  var num = randomNumber();
  var str = "num"+ String(num);
  var $square = $("#"+str);
  $square.append("<p>O</p>");
  updatePositioning(str, -1);
  $turn.empty();
  $turn.append("Player");
}

function computerMove(){
  var done = false;
  var $turn = $("#currentTurn")
  var $div = "";
  var computerWin = false;
  if($turn.html() == "Computer"){
    for(var i in positioning){
  	  if(positioning[i].values() == -2){
  	    for(var n in positioning[i].positions){
  		  if(positioning[i].positions[n].values === 0){
  			var pos = positioning[i].positions[n];
  			$div = $("#"+pos.place);
  			pos.values = -1;
  			Xs = $("#X").html();
  			if(Xs == "Computer"){
  			  $div.append("<p>X</p>");
  			}
  			else{
  			  $div.append("<p>O</p>");
  			}
  			computerWin = true;
  			break;
  		  }
  	    }
  	    if(computerWin){
  	    	displayWin();
  	    	break;
  	    }
  	  }
  	  else if(positioning[i].values() == 2){
  	  	console.log("Hello");
  	  	for(var n in positioning[i].positions){
          if(positioning[i].positions[n].values === 0){
            var pos = positioning[i].positions[n];
            $div = $("#"+pos.place);
            pos.values = -1;
            Xs = $("#X").html();
            if(Xs == "Computer"){
              $div.append("<p>X</p>");
            }
            else{
              $div.append("<p>O</p>");
            }
            done = true;
            $turn.empty();
            $turn.append("Player");
            break;
          }
  	  	}
  	  }
  	  if(done){
  	  	break;
  	  }
    }
  }
  // need to up data positioning down below somehow
  if(!computerWin && !done){
    computerRandomMove();
  }
}

function computerRandomMove(){
	  	var found = false;
    var $turn = $("#currentTurn");
    var $div = "";
    var $Xs = $("#X");
    var ranNum = randomNumber();
    var div = $("#num"+ranNum).html();
    console.log(ranNum);
    if(div != "<p>X</p>" && div != "<p>O</p>"){
      $div = $("#num"+ranNum);
      if($Xs =="Computer"){
        $div.append("<p>X</p>");
      }
      else{
        $div.append("<p>O</p>");
      }
    updatePositioning(("num"+ranNum), -1);
    $turn.empty();
    $turn.append("Player");
    }
    else{
      computerRandomMove();
    }
}

function displayWin(){
  var answer = prompt("You Lose. Would you like to play again?(yes or no");
  if(answer == "yes" || answer == "Yes"){
    newGame();
  }
  else if(answer == "no" || answer == "No"){
    confirm("Game over");
  }
  else{
  	displayWin();
  }
}

function newGame(){
  var $div;
  var num = "";
  for(var i = 0; i < 9; ++i){
  	console.log(i);
  	$div = $("#num"+ i);
  	$div.empty();
  }
  for(var i in positioning){
    for( var n in positioning[i].position){
      positioning[i].position[n].values = 0;
      console.log(n);
	}
  }
  whoGoesFirst();
}