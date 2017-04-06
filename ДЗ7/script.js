var FIELD_SIZE_X = 20;
var FIELD_SIZE_Y = 20;
var SNAKE_SPEED = 200;
var NEW_FOOD_TIME = 1500;
var NEW_BARRIER_TIME = 5000;
var barrier;
var isGameRunning = false;
var snakeTimer;
var snake = [];
var direction = 'x-';
var count = 0;
var resultTxt ;

function init() {
  resultTXT = document.getElementById('result');
  var startButton = document.getElementById('snake-start');
  startButton.addEventListener('click', startGame);

/*  var renewButton = document.getElementById('snake-renew');
  renewButton.addEventListener('click', refreshGame);*/

  addEventListener('keydown', changeDirection);

  buildGameField();
}

function buildGameField() {
  var gameTable = document.createElement('table');
  gameTable.classList.add('game-table');

  for(var i = 0; i < FIELD_SIZE_X; i++) {
    var row = document.createElement('tr');
    row.classList.add('game-table-row');

    for(var j = 0; j < FIELD_SIZE_Y; j++) {
      var cell = document.createElement('td');
      cell.classList.add('game-table-cell');
      cell.classList.add('cell-' + i + "-" + j);

      row.appendChild(cell);
    }
    gameTable.appendChild(row);
  }

  document.getElementById('snake-field').appendChild(gameTable);
}

function changeDirection(event) {
  switch (event.keyCode) {
    case 37:
      if(direction != 'y+') {
        direction = 'y-';
      }
      break;
    case 38:
      if(direction != 'x+') {
        direction = 'x-';
      }
      break;
    case 39:
      if(direction != 'y-') {
        direction = 'y+';
      }
      break;
    case 40:
      if(direction != 'x-') {
        direction = 'x+';
      }
      break;

  }
}

function startGame() {

    for(var i = 0; i < FIELD_SIZE_X; i++) {
        for(var j = 0; j < FIELD_SIZE_Y; j++) {
            var cell2 = document.getElementsByClassName('cell-' + i + '-' + j)[0];
            cell2.classList.remove('snake-unit', 'food-unit', 'barriers');
        }
    }

  direction = 'x-';
  count = 0;

  respawn();

  if(!isGameRunning) {
      snakeTimer = setInterval(move, SNAKE_SPEED);
      isGameRunning = true;
  }
      setTimeout(createFood, NEW_FOOD_TIME);
      barrier = setInterval(createBarrier, NEW_BARRIER_TIME );
      resultTXT.innerHTML = 'Начали';

}

function respawn() {
  var startCoordX = Math.floor(FIELD_SIZE_X / 2);
  var startCoordY = Math.floor(FIELD_SIZE_Y / 2);

  var snakeHead
    = document.getElementsByClassName('cell-' + startCoordX + '-' + startCoordY)[0];
  snakeHead.classList.add('snake-unit');

  var snakeTail
    = document.getElementsByClassName('cell-' + (startCoordX - 1) + '-' + startCoordY)[0];

  snakeTail.classList.add('snake-unit');

  snake = [];

  snake.push(snakeHead);
  snake.push(snakeTail);
}

function move() {
  var snakeHeadClasses = snake[snake.length - 1].classList;

  var newUnit;
  var snakeCoords = snakeHeadClasses[1].split('-');
  var coordX = parseInt(snakeCoords[1]);
  var coordY = parseInt(snakeCoords[2]);

  switch(direction) {
    case 'x-':
      newUnit = document.getElementsByClassName('cell-' + (minusCoord(coordX)) + '-' + coordY)[0];
      break;
    case 'x+':
      newUnit = document.getElementsByClassName('cell-' + ((coordX + 1)%FIELD_SIZE_X) + '-' + coordY)[0];
      break;
    case 'y-':
      newUnit = document.getElementsByClassName('cell-' + coordX + '-' + (minusCoord(coordY)))[0];
      break;
    case 'y+':
      newUnit = document.getElementsByClassName('cell-' + coordX + '-' + ((coordY + 1)%FIELD_SIZE_Y))[0];
      break;
  }

  if(newUnit !== undefined && !newUnit.classList.contains('snake-unit') && !newUnit.classList.contains('barriers')) {
    newUnit.classList.add('snake-unit');
    snake.push(newUnit);

    if(!newUnit.classList.contains('food-unit')) {
      var removed = snake.splice(0, 1)[0];
      removed.classList.remove('snake-unit');
    } else {
      newUnit.classList.remove('food-unit');
      resultTXT.innerHTML = 'Ваш результат : ' + (snake.length-2);
      createFood();
    }
  } else {
    finishGame();
  }
}

function minusCoord(x ){
  if (x == 0) {return 19
  } else return (x-- );
}

function createFood() {
  var foodCreated = false;

  while(!foodCreated) {
    var foodX = Math.floor(Math.random() * FIELD_SIZE_X);
    var foodY = Math.floor(Math.random() * FIELD_SIZE_Y);

    var foodCell = document.getElementsByClassName('cell-' + foodX + '-' + foodY)[0];

    if(!foodCell.classList.contains('snake-unit')) {
      foodCell.classList.add('food-unit');
      foodCreated = true;
    }
  }
}

function createBarrier() {

        var foodX = Math.floor(Math.random() * FIELD_SIZE_X);
        var foodY = Math.floor(Math.random() * FIELD_SIZE_Y);

        var barrierCell = document.getElementsByClassName('cell-' + foodX + '-' + foodY)[0];

        if(!barrierCell.classList.contains('snake-unit')) {
            barrierCell.classList.add('barriers');
            if (++count > 10 ) {
              var a = document.getElementsByClassName('barriers');
              var b = Math.floor(Math.random() * a.length);
              a[b].classList.remove('barriers');
            }
        }
}

function finishGame() {
  clearInterval(snakeTimer);
  clearInterval(barrier);
  isGameRunning = false;
  resultTXT.innerHTML = 'Game Over <br> Ваш результат : ' + (snake.length-2);

}

window.onload = init;