console.log("hello")
var positioning =[{
  line : "row1",
  values : function(){return this.position[0].value + this.position[1].value + this.position[2].value;},
  positions : [{ place : "num0", values: 0},
                {place : "num1", values: 0},
                {place : "num2", values: 0}] 
  },
  {
  	line : "row2",
    values : function(){return this.position[0].value + this.position[1].value + this.position[2].value;},
    positions : [{ place : "num3", values: 0},
                 { place : "num4", values: 0},
                 { place : "num5", values: 0}]
  },
  {
  	line : "row3",
    values : function(){return this.position[0].value + this.position[1].value + this.position[2].value;},
    positions : [{ place : "num6", values: 0},
                 { place : "num7", values: 0},
                 { place : "num8", values: 0}]
  },
  {
  	line : "vertical1",
    values : function(){return this.position[0].value + this.position[1].value + this.position[2].value;},
    positions : [{ place : "num0", values: 0},
                 { place : "num3", values: 0},
                 { place : "num6", values: 0}]
  },
  {
  	line : "vertical2",
    values : function(){return this.position[0].value + this.position[1].value + this.position[2].value;},
    positions : [{ place : "num1", values: 0},
                 { place : "num4", values: 0},
                 { place : "num7", values: 0}]
  },
  {
  	line : "vertical3",
    values : function(){return this.position[0].value + this.position[1].value + this.position[2].value;},
    positions : [{ place : "num2", values: 0},
                 { place : "num5", values: 0},
                 { place : "num8", values: 0}]
  },
  {
  	line : "diagnol1",
    values : function(){return this.position[0].value + this.position[1].value + this.position[2].value;},
    positions : [{ place : "num0", values: 0},
                 { place : "num4", values: 0},
                 { place : "num8", values: 0}]
  },
  {
  	line : "diagnol2",
    values : function(){return this.position[0].value + this.position[1].value + this.position[2].value;},
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
	console.log($turn.html());
    var num = "num" + String(i);
    var $div = $("#" + num);
    spot = document.getElementById(num).innerHTML;
    if($turn.html() == "Player"){
      if(spot != "<p>X</p>" && spot != "<p>O</p>"){
        $div.append("<p>X</p>");
        updatePositioning(num, 1);
        $turn.empty();
        $turn.append("Computer");
      }
    }
  }));
}

function updatePositioning(divId, value){
  if(divId != undefined && value != undefined){
    for(var i in positioning){
      for(var n  = 0; n < 3; ++n){
        if(positioning[i].positions[n].place == divId){
          positioning[i].positions[n].value = value;
          break;
        }
  	  }
  	}
  }
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
