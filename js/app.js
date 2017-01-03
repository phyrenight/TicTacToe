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
  var width = 45;
  var height = 45;
  var style = "style='width:"+width+";% height:"+height+"%;'";
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
    if($turn.html() == "Player"){
      if(spot != "X" && spot != "O"){  //<p>
      	if(Xs == "Player"){
          $div.append("X");   //<p>
        }
        else{
          $div.append("O");  // <p>
        }
        updatePositioning(num, 1);
        $turn.empty();
        $turn.append("Computer");
        computerMove();
      }
    }
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
    $square.append("O"); //<p>O</p>
  }
  else{
  	$square.append("X");  //<p>X</p>
  }
  updatePositioning(str, -1);
  //$turn.empty();
  $turn.html("Player");
}

function computerMove(){
  var done = false;
  var $turn = $("#currentTurn");
  var $div = "";
  var Xs = "";
  var pos;
  var computerWin = false;
  if(!isMatchOver()){
    if($turn.html() == "Computer"){
      for(var i in positioning){
  	    if(positioning[i].values() == -2){
  	      // for(var n in positioning[i].positions){
  		      // if(positioning[i].positions[n].values === 0){
  			      pos = findOpenPosition(i);
  			      $div = $("#"+pos.place);
  			      //pos.values = -1;
  			      Xs = $("#X").html();
  			      if(Xs == "Computer"){
  			        $div.html("X");  //<p>
  			      }
  			      else{
  			        $div.html("O");  // <p>
  			      }
  			      computerWin = true;
  			      break;
  		     // }
  	      //}
  	      if(computerWin){
  	    	  displayWin();
  	    	  break;
  	      }
  	    }
  	    else if(positioning[i].values() == 2){
  	  	//  for(var n in positioning[i].positions){
          //  if(positioning[i].positions[n].values === 0){
            //  pos = positioning[i].positions[n];
              pos = findOpenPosition(i);
              $div = $("#"+pos.place);
             // pos.values = -1;
              Xs = $("#X").html();
              if(Xs == "Computer"){
                $div.html("X"); //<p>
              }
              else{
                $div.html("O");  //<p>
              }
              done = true;
              $turn.html("Player");
              break;
          //  }
  	  	 // }
  	    }
  	    if(done){
  	  	  break;
  	    }
      }
    }
  // need to up data positioning down below somehow
    if(!computerWin && !done){
      console.log("hello")
      computerRandomMove();
    }
  }
  else{
    console.log("match is over")
  }
}

function findOpenPosition(line){
  for(var n in positioning[line].positions){  // to boost performance change to the other for loop
    if(positioning[line].positions[n].values === 0){
      var pos = positioning[line].positions[n];
      updatePositioning(pos.place, -1);
      return pos
    }
  }
}

function computerRandomMove(){
	var found = false;
    var $turn = $("#currentTurn");
    var $div = "";
    var $Xs = $("#X");
    var ranNum = randomNumber();
    var div = $("#num"+ranNum).html();
    if(div != "X" && div != "O"){  // <p>
      $div = $("#num"+ranNum);
      if($Xs.html() =="Computer"){
        $div.html("X");  //<p>
      }
      else{
        $div.html("O");  //<p>
      }
    updatePositioning(("num"+ranNum), -1);
    $turn.html("Player");
    }
    else{
      computerRandomMove();
    }
}

function displayWin(){
  var answer = prompt("You Lose. Would you like to play again?(yes or no)");
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
  for(var i in positioning){
    for( var n in positioning[i].positions){
      positioning[i].positions[n].values = 0;
	  }
  }
  whoGoesFirst();
}

function isMatchOver(){
  /*
    checks to see if the board is fuilled
  */
  var draw = true;
  for(var i = 0; i < 9; i++){
    var $div = $("#num"+i);
    console.log($div.html())
    if($div.html() != "O" || $div.html() != "X"){
      draw = false;
      break;
    }
  }
  return draw;
}