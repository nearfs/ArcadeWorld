function snake(){
 let score = 0;
 let canvas = document.getElementById("game-canvas");
	let ctx = canvas.getContext("2d");
	var w = canvas.width;
	var h = canvas.height;
	var cw = 25; //cell width
	var d;
	var food;

	//the snake
	var snake_array;
	function init() {
		d = "right";
		create_snake();
		create_food();
		//snake speed - 70ms
		if (typeof game_loop != "undefined") clearInterval(game_loop);
		game_loop = setInterval(paint, 70);
	}
	init();

	function create_snake() {
		var length = 5; //initial length
		snake_array = [];
		for (var i = length - 1; i >= 0; i--) {
			snake_array.push({ x: i, y: 2 });
		}
	}

	//the food
	function create_food() {
		food = {
			x: Math.round(Math.random() * (w - cw) / cw),
			y: Math.round(Math.random() * (h - cw) / cw),
      };

      if(food.y < 2){
        food.y +=2;
		  }
	}

	function paint() {
		var background = new Image();
		background.src = "https://raw.githubusercontent.com/Team-Margarita/ArcadeWorld/master/TeamMargarita-ArcadeWorld/images/snake_bck.jpg";
    //background.src = "./images/snake_bck.jpg"; //load local
		ctx.drawImage(background, 0, 0);
		ctx.fillStyle = "rgba(0, 0, 200, 0)";
		ctx.fillRect(0, 0, w, h);

    ctx.beginPath();
    ctx.moveTo(0, 40);
    ctx.lineTo(600, 40);
    ctx.strokeStyle= '#FFFFFF';
    ctx.stroke();

		var nx = snake_array[0].x;
		var ny = snake_array[0].y;

		if (d == "right") nx++;
		else if (d == "left") nx--;
		else if (d == "up") ny--;
		else if (d == "down") ny++;


		if (nx == -1 || nx == w / cw || ny == 1 || ny == h / cw || check_collision(nx, ny, snake_array)) {
			//restart game/game over condition
			//window.alert("Game over!");
      score = 0;
			init();
			return;
		}

		if (nx == food.x && ny == food.y) {
			var tail = { x: nx, y: ny };
			//Create new food
      score +=1;
			create_food();
		}
		else {
			var tail = snake_array.pop();
			tail.x = nx; tail.y = ny;
		}

		snake_array.unshift(tail);

		for (var i = 0; i < snake_array.length; i++) {
			var c = snake_array[i];
			paint_cell(c.x, c.y);
		}

		paint_cell(food.x, food.y);

    function paint_score() {
        ctx.font = "28px ArcadeFont";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText("Score  " + score, 10, 28);
    }

    paint_score();
	}

	//paint cells
	function paint_cell(x, y) {
		ctx.fillStyle = "#DD0000";
		ctx.fillRect(x * cw, y * cw, cw, cw);
		ctx.strokeStyle = "black";
		ctx.strokeRect(x * cw, y * cw, cw, cw);
		//ctx.shadowColor = "#7100fd";
		//ctx.shadowBlur = 20;
		//ctx.shadowOffsetX = 0;
		//ctx.shadowOffsetY = 0;
	}

	function check_collision(x, y, array) {
		//This function will check if the provided x/y coordinates exist
		//in an array of cells or not
		for (var i = 0; i < array.length; i++) {
			if (array[i].x == x && array[i].y == y)
				return true;
		}
		return false;
	}

	//keyboard controls

	document.addEventListener("keydown", keycontrol);
	function keycontrol(e) {
		var key = e.which;
		if (key == "37" && d != "right") d = "left";
		else if (key == "38" && d != "down") d = "up";
		else if (key == "39" && d != "left") d = "right";
		else if (key == "40" && d != "up") d = "down";
	}
}
