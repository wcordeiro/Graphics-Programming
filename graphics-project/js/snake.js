/**
* @fileoverview JavaScript for the Snake game.
* @author Wilson Cordeiro
*/

  // Gets a handle to the element with id canvasOne.
  var canvas = document.getElementById("gamecanvas");
  // Get a 2D context for the canvas.
  var context = canvas.getContext("2d");
  // Apple Object
  var apple = null;
  // Snake Object
  var snake = null;
  // Control the snake direction
  var direction;
  // Eat on this round flag
  var food;
  // Flag game on or game off
  var gameStatus;
  // Score variable
  var score;
  // Variable used to cancel the request animation frame
  var myreq;

/**
* A Snake Piece.
* @constructor
*/
var SnakePiece = function (x,y){
    this.width = 10; //Size of the piece on the X
    this.height = 10; //Size of the piece on the Y
    this.position = { //Position was divided in four variables in order to faciltate collision detection
                        x1 : x,
                        y1 : y,
                        x2 : x + this.width,
                        y2 : y + this.height
                    };
};

/**
* A Snake.
* @constructor
*/
var Snake = function(){
    this.pieces = []; //Pieces of the snake
    this.fillColor = "blue"; //Snake fill color
    this.strokeColor = "black" //Snake stroke color
    this.size = 3; //Size of the Snake, 3 is the initial size, 2 + HEAD
    this.velocity = 60; //Snake velocity, small the value is more speed
}

/**
* An Apple.
* @constructor
*/
var Apple = function (x,y){
    this.width = 10; //Size of the piece on the X
    this.height = 10; //Size of the piece on the Y
    this.position = { //Position was divided in four variables in order to faciltate collision detection
                        x1 : x,
                        y1 : y,
                        x2 : x + this.width,
                        y2 : y + this.height
                    };
    this.color = "red"; //Color of the apple
};

/**
 * Checks to see if the snake has collided with the apple.
 */
var appleCollisionCheck = function(){
    var i = 0;
    for(i = 0; i < snake.size; i++){
        if(isColliding(snake.pieces[i],apple)){
            snakeGrowth();
            drawNewApple();
            return;
        }
    }
}

/**
 * Checks to see if the snake has collided with her self.
 */
var snakeCollisionCheck = function(){
    var i = 0;
    for(i = 1; i < snake.size; i++){
        if(snake.pieces[0].position.x1 == snake.pieces[i].position.x1 &&
           snake.pieces[0].position.x2 == snake.pieces[i].position.x2 &&
           snake.pieces[0].position.y1 == snake.pieces[i].position.y1 &&
           snake.pieces[0].position.y2 == snake.pieces[i].position.y2){
                 gameOverSnake();
                 return;
        }
    }
}

/**
 * Checks to see if the snake has collided with one of the walls.
 */
var snakeWallCollisionCheck = function(){
    //Left wall  
    if(snake.pieces[0].position.x1 < 0  || snake.pieces[0].position.x2 < 0 ){
        gameOverSnake();
    }
    //Right Wall
    else if(snake.pieces[0].position.x1 > canvas.width  || snake.pieces[0].position.x2 > canvas.width){
        gameOverSnake();
    }
    //Top Wall
    if(snake.pieces[0].position.y1 < 0 || snake.pieces[0].position.y2 < 0){
        gameOverSnake();
    }
    //Down Wall
    else if(snake.pieces[0].position.y1 > canvas.height || snake.pieces[0].position.y2 > canvas.height ){
        gameOverSnake();
    }
}


var initSnake = function (){
    reziseCanvas();
    $(canvas).unbind('click');
    direction = "right";
    food = false;
    gameStatus = true;
    score = 0;
    snake = new Snake();
    drawNewApple();
    drawScore();
    drawInitialSnake();
    myreq = window.requestAnimationFrame(moveSnake);
}

/**
 * Draws the NewApple.
 */
function drawNewApple() {
    apple = new Apple(parseInt(Math.random() * (canvas.width - 1) ), parseInt(Math.random() * (canvas.height - 1)));
    context.fillStyle = apple.color;
    context.fillRect(apple.position.x1, apple.position.y1, apple.width, apple.height);
}

/**
 * Draws the Apple.
 */
function drawApple() {
    context.fillStyle = apple.color;
    context.fillRect(apple.position.x1, apple.position.y1, apple.width, apple.height);
}

/**
 * Draws the InitalSnake.
 */
function drawInitialSnake() {
    context.fillStyle = snake.fillColor;
    context.strokeStyle = snake.strokeColor;
    var i = 0;
    for (i = 0; i < snake.size; i++){
        snake.pieces.push(new SnakePiece(30-(i*10),0));
        context.fillRect(snake.pieces[i].position.x1, snake.pieces[i].position.y1, snake.pieces[i].width, snake.pieces[i].height);
        context.strokeRect(snake.pieces[i].position.x1, snake.pieces[i].position.y1, snake.pieces[i].width, snake.pieces[i].height);
    }
}

/**
 * Draws the Snake.
 */
function drawSnake(x,y) {
    context.fillStyle = snake.fillColor;
    context.strokeStyle = snake.strokeColor;
    if(!food){
        snake.pieces.pop();
        food = true;
    }
    var newTop = new SnakePiece(x,y);
    snake.pieces.unshift(newTop);
    var i = 0;
    for (i = 0; i < snake.size; i++){
        context.fillRect(snake.pieces[i].position.x1, snake.pieces[i].position.y1, snake.pieces[i].width, snake.pieces[i].height);
        context.strokeRect(snake.pieces[i].position.x1, snake.pieces[i].position.y1, snake.pieces[i].width, snake.pieces[i].height);
    }
}

/**
 * Move the snake base on the keyboard
 */
window.addEventListener("keydown", function(event) { 
    var offset = 0;
    switch (event.key) {
        case "ArrowLeft":
            if(direction != "right" )
                direction = "left";
            break;
        case "ArrowRight":
            if(direction != "left" )
                direction = "right";
            break;
        case "ArrowUp":
            if(direction != "down" )
                direction = "up";
            break;
        case "ArrowDown":
            if(direction != "up" )
                direction = "down";
            break;    
        default:
            return;
    }
});

/**
 * Move the Snake arround respecting the colissions
 */
function moveSnake() {
    if(!gameStatus){
        gameOverSnake();
        myreq = window.requestAnimationFrame(moveSnake);    
    }
    else{
        setTimeout(function(){
            context.clearRect(0, 0, canvas.width, canvas.height);
            snakeWallCollisionCheck();
            snakeCollisionCheck();
            appleCollisionCheck();
            var newx = snake.pieces[0].position.x1;
            var newy = snake.pieces[0].position.y1;
            switch(direction){
                case "right":
                    newx += snake.pieces[0].width;
                    break;
                case "left":
                    newx -= snake.pieces[0].width;
                    break;
                case "up":
                    newy -= snake.pieces[0].height;
                    break;
                case "down":
                    newy += snake.pieces[0].height;
                    break;    
            }

            drawSnakeScore();
            drawSnake(newx,newy);
            drawApple();
            myreq = window.requestAnimationFrame(moveSnake);
        },snake.velocity);
    }
};

/* Handle the food eating event*/
var snakeGrowth = function (){
    food = true;
    snake.size += 1;
    score +=10;
    if(score % 100 == 0)
        snake.velocity -= 5;
    if(snake.velocity < 0)
        snake.velocity = 0;
}

/**
 * Game Over Screen
 */
var gameOverSnake = function(){
    gameStatus = false;
    $(canvas).bind('click', restartSnakeGame);
    var x = canvas.width / 2,
        y = 175;
    context.textAlign = 'center';
    context.fillStyle = '#000000';
    context.font = '30px Verdana bold';
    context.textBaseline = 'top';
    context.fillText("Game Over", x, y);
    context.font = '15px Arial';
    context.fillStyle = '#000000';
    context.fillText('Click on screen to restart', x, y + 125);
}

/**
 * Draws the start screen.
 */
function drawStartSnakeScreen() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    reziseCanvas();
    $(canvas).bind('click', initSnake);
    var x = canvas.width / 2,
        y = 175;
    context.textAlign = 'center';
    context.fillStyle = '#000000';
    context.font = '30px Verdana bold';
    context.textBaseline = 'top';
    context.fillText('Snake', x, y);
    context.font = '15px Arial';
    context.fillStyle = '#000000';
    context.fillText('Click on screen to start', x, y + 125);
}

var restartSnakeGame = function (){
    reziseCanvas();
    $(canvas).unbind('click');
    direction = "right";
    food = false;
    gameStatus = true;
    score = 0;
    snake = new Snake();
    drawNewApple();
    drawScore();
    drawInitialSnake();
}

/**
 * Draws the score.
 */
function drawSnakeScore() {
    context.textAlign = 'left';
    context.fillStyle = '#000000';
    context.font = '15px arial';
    context.textBaseline = 'top';
    context.fillText('Score: ' + score, 10,
        canvas.height - 20);
}
