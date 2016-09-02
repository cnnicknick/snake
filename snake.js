window.onload=function(){
	var seven=document.getElementById('seven');
	var sense=document.getElementById('sense');
	var start=document.getElementById('start');
	var restart=document.getElementById('restart');
	var pause=document.getElementById('pause');
	var row2=15,food,MAXSNAKE=row2*row2,
		LEFT=37,UP=38,RIGHT=39,DOWN=40,
		defaultDirection=RIGHT,
		snake=[ {xxx:0,yyy:0},{xxx:0,yyy:1},{xxx:0,yyy:2}],
		foodcolor='#FF3900',defaultcolor='rgba(99, 99, 203,.4)',snakecolor='rgb(33, 255, 50)',
		direction=RIGHT,speed=400;
	
	var randomm=function(){
		return Math.floor(Math.random()*row2);
	};

	for (var i = 0; i < row2; i++) {
		for (var j = 0; j< row2; j++) {
			var block7=document.createElement('div');
			block7.setAttribute('class','block7');
			block7.setAttribute('id',i+'&'+j);
			block7.style.width=(600-row2)/row2+'px';
			block7.style.height=(600-row2)/row2+'px';
			sense.appendChild(block7);
		}
	}
	var init=function(){
		for (var i = 0; i < snake.length; i++) {
			document.getElementById(snake[i].xxx+'&'+snake[i].yyy).style.background=snakecolor;
		}
	};
	init();
	var isInSnake=function(xxx,yyy){
		for (var i = 0; i < snake.length; i++) {
			if(snake[i].xxx==xxx&&snake[i].yyy==yyy){
				return true;
			}
		}
		return false;
	};
	var dropFood=function(){
		var xxx=randomm(),yyy=randomm();
		if (snake.length==MAXSNAKE) {
			alert('你赢了!');
		}

		while(isInSnake(xxx,yyy)){
			xxx=randomm();yyy=randomm();
		}

		document.getElementById(xxx+'&'+yyy).style.background=foodcolor;		
		return {xxx:xxx,yyy:yyy};
	};
	food=dropFood();
	var zou=function(dir){
		defaultDirection=dir;
		var last=snake.length-1,newHead,weiba;
		if (dir==LEFT) {
			newHead={xxx:snake[last].xxx,yyy:snake[last].yyy-1};
		}
		if (dir==RIGHT) {
			newHead={xxx:snake[last].xxx,yyy:snake[last].yyy+1};
		}
		if (dir==UP) {
			newHead={xxx:snake[last].xxx-1,yyy:snake[last].yyy};
		}
		if (dir==DOWN) {
			newHead={xxx:snake[last].xxx+1,yyy:snake[last].yyy};
		}
		
		if ( newHead.xxx<0||newHead.xxx>=row2||newHead.yyy<0||newHead.yyy>=row2 ) {
			alert('game over!');
			location.reload();
		}
		if ( isInSnake(newHead.xxx,newHead.yyy) ) {
			alert('game over!');
			location.reload();
		}
		snake.push(newHead);
		if (newHead.xxx==food.xxx&&newHead.yyy==food.yyy) {
			document.getElementById(food.xxx+'&'+food.yyy).style.background=snakecolor;
			food=dropFood();
			return null;
		}
		weiba=snake.shift();

		document.getElementById(weiba.xxx+'&'+weiba.yyy).style.background=defaultcolor;
		document.getElementById(newHead.xxx+'&'+newHead.yyy).style.background=snakecolor;
		return null;
	};

	document.onkeydown=function(e){
		switch(e.keyCode){
			case 37:{
				if(direction==39){
					break;
				}
				direction=LEFT;
				break;
			}
			case 38:{
				if(direction==40){
					break;
				}
				direction=UP;
				break;
			}
			case 39:{
				if(direction==37){
					break;
				}
				direction=RIGHT;
				break;
			}
			case 40:{
				if(direction==38){
					break;
				}
				direction=DOWN;
				break;
			}
		}
		e.preventDefault();
	};
	var timer;
	start.onclick=function(){
		timer =setInterval(function(){
			zou(direction)
		},speed);
	}
	pause.onclick=function(){
		clearInterval(timer);
	}
	restart.onclick=function(){
		location.reload();
	}

};