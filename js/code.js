var stat = {
	// Global config
	config : {
			startingPlayer:"black",
			takenMsg: "This position is already taken.",
  		evenMsg: "the game is tied.",
  		winMsg: "The winner is the Player COLOR",
  		target: 4,
  		boardLength: 7,
  		boardHeight: 6,
	},

	//Players.
	players : [
		'',
		playerA = {
				name: "Player A",
				color: "#000000",
				score: 0
		},
		playerB = {
				name: "Player B",
				color:"#FF0000",
				score: 0 
		}],
	turns: 0,
	currentPlayer : 0,
	currentPlayerDisplay : '',

	// Global State
	board : [[0,0,0,0,0,0,0],
	         [0,0,0,0,0,0,0],
	         [0,0,0,0,0,0,0],
	         [0,0,0,0,0,0,0],
	         [0,0,0,0,0,0,0],
	         [0,0,0,0,0,0,0]],	         

	choseGamer: function(){
		return Math.floor(Math.random()*100)%2 + 1;
	}
};

stat.setCell = function(col,row){
	stat.board[row][col] = stat.currentPlayer;
}

stat.isCellTaken = function(col,row){
	return stat.board[row][col] !== 0;
}

stat.dropDown = function(row, col) {
    for (var y = stat.config.boardHeight - 1; y > row; y--) {
      if (!stat.isCellTaken(col, y)) {
        return y;
      }
    }
    return row;
  }

stat.showStatus = function(){
	console.log(stat.board);
}

stat.countTurns = function(){
	stat.turns ++;
}

stat.changeGamer = function(){	
	stat.currentPlayer = (stat.currentPlayer === 1) ? 2 : 1;
	stat.currentPlayerDisplay = stat.players[stat.currentPlayer].name;
}

stat.resetGame = function(){
	location.reload();
}

stat.saveColors = function(index, color){
	stat.players[index].color = color;
}

stat.addScore = function(player){
	stat.players[player].score++;
}
//////////////////////////////////////////////////////////////////////////////////////////////
var board = {
	color : ''
};

board.printBoard = function(){	
	var cell,color;
	
	for (var d_row = 0; d_row < stat.board.length ;d_row++) {
      for (var d_col = 0; d_col < stat.board[0].length; d_col++){      	
      	cell = "cell"+((7*d_row)+d_col)	;
      	if (stat.board[d_row][d_col] != 0){
      		color = stat.players[stat.board[d_row][d_col]].color;
      		document.getElementById(cell).style.backgroundColor = color; 
      	}
      	else{
      		document.getElementById(cell).style.backgroundColor = "#D4D4D4"; 
      	}      	
      }
	}
}

board.printCell = function(cel,col,row){
	var cell,color;
	cell  = "cell"+((7*row)+col);	
	color = stat.players[stat.board[row][col]].color;
	document.getElementById(cell).style.backgroundColor = color;
}

board.setTurn = function(){
	var notify = "Turn: "+(stat.turns);
	document.getElementById("turn").innerHTML = notify;
}

board.setPlayer = function (){
	var notify = "Player: " + stat.currentPlayerDisplay.toUpperCase();
	document.getElementById("player").innerHTML = notify;
}

board.setscore = function(){
	document.getElementById("player_a").innerHTML = stat.players[1].name + ": " + stat.players[1].score;
	document.getElementById("player_b").innerHTML = stat.players[2].name + ": " + stat.players[2].score;
}

board.setcolorBoard = function(){	
	color = board.color;
	document.getElementById("board").style.backgroundColor = color;
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////
var ctrl = {};

ctrl.isHortWin = function() {
	var l_return = false;

	for (var r = stat.board.length - 1; r >= 0; r--){
		for (var c = 0; c <= stat.board[0].length - 4; c++){

			if( (stat.board[r][c]   !== 0 &&
			     stat.board[r][c+1] !== 0 &&
			     stat.board[r][c+2] !== 0 &&
			     stat.board[r][c+3] !== 0 ) 
				&&
			    (stat.board[r][c]   === stat.board[r][c+1] &&
			   	 stat.board[r][c+1] === stat.board[r][c+2] &&
			   	 stat.board[r][c+2] === stat.board[r][c+3])
			    ){ 	/*	
			    	console.log("["+r+"]["+c+"]=>",stat.board[r][c],"["+r+"]["+(c+1)+"]=>",stat.board[r][c+1],
					            "["+r+"]["+(c+2)+"]=>",stat.board[r][c+2],"["+r+"]["+(c+3)+"]=>",stat.board[r][c+3]);*/
			    	l_return = true;
					break;
			}		
		}
	}

	return l_return;
}

ctrl.isVertWin = function () {
	var l_return = false;
	
	for (var c = 0; c < stat.board[0].length; c++){
		for (var r = 0; r < stat.board.length - 3; r++){
			
			if((stat.board[r][c]   !== 0 &&
				stat.board[r+1][c] !== 0 &&
				stat.board[r+2][c] !== 0 &&
				stat.board[r+3][c] !== 0 )
				&&
			   (stat.board[r][c]   === stat.board[r+1][c] &&
			   	stat.board[r+1][c] === stat.board[r+2][c] &&
			   	stat.board[r+2][c] === stat.board[r+3][c])
			   ){	/*
					console.log("["+r+"]["+c+"]:"+stat.board[r][c],"<=>","["+(r+1)+"]["+c+"]:"+stat.board[r+1][c],"<=>",
                    "["+(r+2)+"]["+c+"]:"+stat.board[r+2][c],"<=>","["+(r+3)+"]["+c+"]:"+stat.board[r+3][c]);*/ 
					l_return = true; break;
				}			
		}
	}

	return l_return;
}

ctrl.isDiagWin = function () {
	var l_return = false;
	
	for (var r = stat.board.length - 1; r>= stat.board.length - 1 - 2; r--){
		for (var c = stat.board[0].length - 1; c >= stat.board[0].length - 1 - 3; c--){
			if((stat.board[r][c] !== 0 &&
				stat.board[r-1][c-1] !== 0 &&
				stat.board[r-2][c-2] !== 0 &&
				stat.board[r-2][c-3] !== 0 )
				&&
			   (stat.board[r][c] === stat.board[r-1][c-1]     &&
			   	stat.board[r-1][c-1] === stat.board[r-2][c-2] &&
			   	stat.board[r-2][c-2] === stat.board[r-3][c-3] )){
					/*
					console.log(
						"["+r+"]["+(c)+"]:"+stat.board[r][c],"<=>","["+(r-1)+"]["+(c-1)+"]:"+stat.board[r-1][c-1],"<=>",
            			"["+(r-2)+"]["+(c-2)+"]:"+stat.board[r-2][c-2],"<=>","["+(r-3)+"]["+(c-3)+"]:"+stat.board[r-3][c-3]);*/
					l_return = true;
					break;}

			if((stat.board[r-3][c] !== 0   &&
				stat.board[r-2][c-1] !== 0 &&
				stat.board[r-1][c-2] !== 0 &&
				stat.board[r-0][c-3] !== 0 )
				&&
			   (stat.board[r-3][c] === stat.board[r-2][c-1]   &&
			   	stat.board[r-2][c-1] === stat.board[r-1][c-2] &&
			   	stat.board[r-1][c-2] === stat.board[r][c-3] )){
					/*
					console.log("["+(r-3)+"]["+(c)+"]:"+stat.board[r-3][c],"<=>","["+(r-2)+"]["+(c-1)+"]:"+stat.board[r-2][c-1],"<=>",
            					"["+(r-1)+"]["+(c-2)+"]:"+stat.board[r-1][c-2],"<=>","["+(r)+"]["+(c-3)+"]:"+stat.board[r][c-3]);*/
					l_return = true;
					break;}
		}
	}

	return l_return;
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////
var mang  = {};

mang.selectedCell = function (cel){

	var player = stat.currentPlayerDisplay;
	var row = Math.floor(cel/7);
	var col = cel%7;

	if (stat.isCellTaken(col, row)) {
      alert(stat.config.takenMsg);
      return;
    }
	//dropPieceDown
	var dropRow = stat.dropDown(row,col);
	//save data
	stat.setCell(col,dropRow);
	//stat.showStatus();
	//print cell
	board.printCell(cel,col,dropRow);
	//chageGamer

	if(ctrl.isHortWin() || ctrl.isVertWin() || ctrl.isDiagWin()){
		stat.addScore(stat.currentPlayer);
		if(confirm(stat.config.winMsg.replace('COLOR',stat.currentPlayerDisplay.toUpperCase()))){
			mang.startGame();
		}
	} 
	else if (stat.turns === 42){
		if(confirm(stat.config.evenMsg)){
			stat.resetGame();
		}
	}

	/*
	if (ctrl.isHortWin()){
		stat.addScore(stat.currentPlayer);
		if(confirm(stat.config.winMsg.replace('COLOR',stat.currentPlayerDisplay.toUpperCase()))){
			mang.startGame();
		}
	}
	else if (ctrl.isVertWin()){
		stat.addScore(stat.currentPlayer);
		if(confirm(stat.config.winMsg.replace('COLOR',stat.currentPlayerDisplay.toUpperCase()))){
			mang.startGame();
		}	
	}
	else if (ctrl.isDiagWin()){
		stat.addScore(stat.currentPlayer);
		if(confirm(stat.config.winMsg.replace('COLOR',stat.currentPlayerDisplay.toUpperCase()))){
			mang.startGame();
		}
	}
	else if (stat.turns === 42){
		if(confirm(stat.config.evenMsg)){
			stat.resetGame();
		}

	}*/
	stat.changeGamer();
	stat.countTurns();

	board.setPlayer();
	board.setTurn();
	board.setscore();
}

mang.setColorValue = function(colorPicker){
	
	switch(colorPicker.name){
		case "colorPlayerOne":
			stat.saveColors(1, colorPicker.value);
			board.printBoard();
			break;
		case "colorPlayerTwo":
			stat.saveColors(2, colorPicker.value);
			board.printBoard();
			break;
		case "colorBoard":			
			board.color = colorPicker.value;
			board.setcolorBoard();
			break;
		default:
			//pass
	}				
}

mang.startGame = function(){
 	stat.currentPlayer = stat.choseGamer();
	stat.currentPlayerDisplay = stat.players[stat.currentPlayer].name;
	stat.turns = 1;
	stat.board = [[0,0,0,0,0,0,0],
	         			[0,0,0,0,0,0,0],
	         			[0,0,0,0,0,0,0],
	         			[0,0,0,0,0,0,0],
	         			[0,0,0,0,0,0,0],
	         			[0,0,0,0,0,0,0]]
	board.setTurn();
	board.setPlayer();
	board.setscore();
	board.printBoard();

 }

mang.resetGame = function(){
	if(confirm("Do you Really want to Reset the Game?")){
		mang.startGame();
	}
}