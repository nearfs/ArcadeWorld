function beginGame(){
    breakOut();
}

function initializeGame(){
  var $root = $('#root');
  $root.empty();

  var $scoreboardContainer = $('<div/>').attr('id', 'scoreboard-container');

  $root.append($scoreboardContainer);

  var $player1Score = $('<span/>').attr('id', 'player1-score')
             .text('000');
  var $player2Score = $('<span/>').attr('id', 'player2-score')
             .text('000');
  $scoreboardContainer.append($player1Score);
  $scoreboardContainer.append($player2Score);

  $scoreboardContainer.append('<svg id="score-board" xmlns="http://www.w3.org/2000/svg">');
  createSvgRectangle();
  $root.append('<div id="canvas-container">');
  var $canvasContainer = $('#canvas-container');
  $canvasContainer.append('<canvas id="game-canvas" width="600" height="600"></canvas>');
  beginGame();
}

function initializeNewLevel(){
  let $canvasContainer = $('#canvas-container');
  $canvasContainer.empty();
  $canvasContainer.append('<canvas id="game-canvas" width="600" height="600"></canvas>');
}

function startScreen(playerId, startPressed, gameName){

  let canvas = document.getElementById("game-canvas");

  if(canvas){
      let ctx = canvas.getContext("2d");

      function drawPlayer(){
        ctx.font = "66px ArcadeFont";
        if(playerId === 1){
        ctx.fillStyle = '#DD0000';
        }else{
        ctx.fillStyle = '#0000DD';
        }
        ctx.textAlign = 'center';
        ctx.fillText("Player " + playerId, canvas.width/2, canvas.height/2);
      }

      function drawInstruction() {
          ctx.font = "24px ArcadeFont";
          ctx.fillStyle = '#888888';
          ctx.textAlign = 'center';
          ctx.fillText("Press  ' ENTER '  to  start", canvas.width/2, canvas.height/2 + 30);
      }

      function drawGameName() {
          ctx.font = "50px ArcadeFont";
          ctx.fillStyle = '#888888';
          ctx.textAlign = 'center';
          if(gameName === 'breakout'){
          ctx.fillText("BREAKOUT", canvas.width/2, canvas.height/2 - 58);
          }else if(gameName === 'snake'){
            ctx.fillText("SNAKE", canvas.width/2, canvas.height/2 - 58);
          }
      }

      drawPlayer();
      drawInstruction();
      drawGameName();
    }
}

function endScreen(){
  let canvas = document.getElementById("game-canvas");
  let ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let player1Score = $("#player1-score").text() | 0,
      player2Score = $("#player2-score").text() | 0;
  let color = '#FFFFFF',
      winner = '';
  if(player1Score > player2Score){
    color = '#DD0000';
    winner = 'PLAYER 1 WINS'
  }else if(player1Score < player2Score){
    color = '#0000DD';
    winner = 'PLAYER 2 WINS'
  }else{
    winner = 'DRAW';
  }

  document.addEventListener('keypress', returnToMainMenu, false);

  function returnToMainMenu(e){
    let key = e.which || e.keyCode || 0;
    if(key === 13) {
        document.removeEventListener('keypress', returnToMainMenu);
        location.reload();
    }
  }
    var trophy = new Image();
    if(winner === 'PLAYER 1 WINS'){
      trophy.src = './images/player1_victory.png';
    }else if(winner === 'PLAYER 2 WINS'){
      trophy.src = './images/player2_victory.png';
    }else{
      trophy.src = './images/draw.png';
    }

    function drawWinner(){
      ctx.font = "66px ArcadeFont";
      ctx.fillStyle = color;
      ctx.textAlign = 'center';
      ctx.fillText(winner, canvas.width/2, canvas.height/2 + 100);
    }
    function drawInstruction() {
        ctx.font = "24px ArcadeFont";
        ctx.fillStyle = '#888888';
        ctx.textAlign = 'center';
        ctx.fillText("Press  ' ENTER '  to  return", canvas.width/2, canvas.height/2 + 130);
    }

    function loop(){
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(trophy, 150, 70, 300, 300);

      drawWinner();
      drawInstruction();

    requestAnimationFrame(loop);
  }

  loop();
}
