console.log("hello")

function createBoard(){
  var width = 45;
  var height = 45;
  var style = "style='width:"+width+";% height:"+height+"%;'"
  var $board = $("#board");
    for(var i = 0; i < 9; i++){
      var square = "<div id='num"+i+"' style='width:"+width+"px; height:"+height+"px;'></div>";
      $board.append(square);
    }
    whoGoesFirst();
}

function whoGoesFirst(){
	var num = randomNumber(2);
	var choice = "";
	if( num === 0){
		choice = prompt("You go first. Are you X\'s or O\'s?")
    }
    else{
    	choice = prompt("The computer goes first.Are you X\'s or O\'s?")
    }
    console.log(choice);
}

function randomNumber(num = 9){
	return Math.floor(Math.random() * num);
}
console.log(randomNumber());

function computerFirst(){
	var num = randomNumber();
	var str = "#num"+ String(num);
	console.log(str);
	var $square = $(str);
//	$square.append("<p>O</p>");
}
computerFirst()