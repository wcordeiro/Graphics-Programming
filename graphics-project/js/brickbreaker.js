/**
* @fileoverview JavaScript for the Brick Breaker game.
* @author Wilson Cordeiro
*/

  // Gets a handle to the element with id canvasOne.
  var canvas = document.getElementById("gamecanvas");
  // Get a 2D context for the canvas.
  var context = canvas.getContext("2d");
  // Ball object
  var ball = null;
  // Paddle Object    
  var paddle = null;
  // Array of bricks (rectangules)
  var bricks = [];
  var BRICK_ROWS = 10;
  var BRICKS_PER_ROW = 10;
  var BRICK_WIDTH = 60;
  var BRICK_HEIGHT = 13;
  var BRICK_OFFSET = 3;
  // Variable with holds the lifes
  var turn;
  // Score
  var score;
  //Quantity of bricks
  var bricksRemaining = BRICK_ROWS*BRICKS_PER_ROW;
  //Handle the increase of the speed
  var lastscore = bricksRemaining % BRICK_ROWS;    
  // End Game variable
  var endGame;


/**
* A Ball.
* @constructor
*/
var Ball = function() {
    this.center =   { // Center Position
                        x : canvas.width/2,
                        y : canvas.height/2
                    };
    this.radius = 7; //Define the size of the Ball
    this.position = { //Position was divided in four variables in order to faciltate collision detection
                        x1 : this.center.x - this.radius,
                        y1 : this.center.y - this.radius,
                        x2 : this.x1 + this.radius,
                        y2 : this.y1 + this.radius
                    };
    var ballVelocity = 2.5, //Auxiliar function.
            getRandomXVelocity = function() {
                var randomNumber = Math.random();
                if (randomNumber > 0.5) {
                    return ballVelocity;
                }
                return ballVelocity * -1;
            };
    this.velocity = { //Velocity on X and Y
                        x : getRandomXVelocity(),
                        y : ballVelocity
                    };
  };
    
/**
* A Paddle.
* @constructor
*/
 var Paddle = function() {
    this.width = 100; //Size on X
    this.height = 15; //Size on Y
    this.color = '#000'; //Color of the paddle
    this.position = { //Position was divided in four variables in order to faciltate collision detection
                        x1 : (canvas.width - this.width) / 2,
                        y1 : canvas.height - this.height,
                        x2 : this.x1 + this.width,
                        y2 : canvas.height
                    };
}

/**
 * Builds a rectangle of bricks.
 * @param {array} colors is an array of colors.
 */
function drawRectangle(colors) {
    var i,
        j,
        brickNum = 0,
        brickY = BRICK_OFFSET,
        brickX = 0,
        brick = null;
    for (i = 0; i < BRICK_ROWS; i += 1) {
        brickX = BRICK_OFFSET;
        for (j = 0; j < BRICKS_PER_ROW; j += 1) {
            brick = {
                x1: brickX,
                y1: brickY,
                x2: brickX + BRICK_WIDTH,
                y2: brickY + BRICK_HEIGHT,
                visible: true,
                color: colors[i]
            };
            bricks[brickNum] = brick;
            brickX += BRICK_WIDTH + BRICK_OFFSET;
            brickNum += 1;
        }
        brickY += BRICK_HEIGHT + BRICK_OFFSET;
    }
}

/**
* Checks to see if the ball has collided with the wall.
*/

function brickBreakerWallCollisionCheck() {
    if ((ball.position.x1 <= 0) || (ball.position.x2 >= canvas.width)) {
        ball.velocity.x = -ball.velocity.x;
    } 
    else if ((ball.position.y1 <= 0)) {
            ball.velocity.y = -ball.velocity.y;
            ball.center.y += 2;
    } 
    else if (ball.position.y2 >= canvas.height) {
            ball.velocity.y = -ball.velocity.y;
            loseTurn();
    }
}

/**
 * Checks to see if the ball has collided with the ball.
 */
function paddleCollisionCheck() {
   // console.log(ball.position.x1,paddle.position.x1,ball.position.y2,paddle.position.y2,isColliding(ball,paddle));
    if ( //Check Collision on the Right
        (ball.position.x1 < paddle.position.x1 &&
         ball.position.x1 < paddle.position.x2 &&
         ball.position.x2 > paddle.position.x1 &&
         ball.position.x2 < paddle.position.x2 &&
         ball.position.y1 > paddle.position.y1 &&
         ball.position.y1 < paddle.position.y2 &&
         ball.position.y2 > paddle.position.y1 &&
         ball.position.y2 < paddle.position.y2) 
        || //Check Collision on the Left
        (ball.position.x1 > paddle.position.x1 &&  
         ball.position.x1 < paddle.position.x2 &&
         ball.position.x2 > paddle.position.x1 &&
         ball.position.x2 > paddle.position.x2 &&
         ball.position.y1 > paddle.position.y1 &&
         ball.position.y1 < paddle.position.y2 &&
         ball.position.y2 > paddle.position.y1 &&  
         ball.position.y2 < paddle.position.y2)
       ) {
            ball.velocity.x = -ball.velocity.x;
    } 
    else if ( //Check Collision on the Top Left
        (ball.position.x1 > paddle.position.x1 && 
        ball.position.x1 < paddle.position.x2 && 
        ball.position.x2 > paddle.position.x1 && 
        ball.position.x2 > paddle.position.x2 && 
        ball.position.y1 > paddle.position.y1 && 
        ball.position.y1 < paddle.position.y2 &&
        ball.position.y2 > paddle.position.y1 &&
        ball.position.y2 > paddle.position.y2) 
        || //Check Collision on the Top Middle
        (ball.position.x1 > paddle.position.x1 && 
        ball.position.x1 < paddle.position.x2 && 
        ball.position.x2 > paddle.position.x1 &&
        ball.position.x2 < paddle.position.x2 &&  
        ball.position.y1 > paddle.position.y1 &&
        ball.position.y1 < paddle.position.y2 &&
        ball.position.y2 > paddle.position.y1 &&
        ball.position.y2 > paddle.position.y2)
        || //Check Collision on the Top Right
        (ball.position.x1 < paddle.position.x1 &&
        ball.position.x1 < paddle.position.x2 &&
        ball.position.x2 > paddle.position.x1 &&  
        ball.position.x2 < paddle.position.x2 && 
        ball.position.y1 > paddle.position.y1 &&
        ball.position.y1 < paddle.position.y2 &&
        ball.position.y2 > paddle.position.y1 &&
        ball.position.y2 > paddle.position.y2)
        || //Check Collision on the Bottom Left
        (ball.position.x1 > paddle.position.x1 &&
        ball.position.x1 < paddle.position.x2 &&
        ball.position.x2 > paddle.position.x1 &&
        ball.position.x2 > paddle.position.x2 &&
        ball.position.y1 < paddle.position.y1 &&
        ball.position.y1 < paddle.position.y2 &&
        ball.position.y2 > paddle.position.y1 && 
        ball.position.y2 < paddle.position.y2)
        || //Check Collision on the Bottom Middle
        (ball.position.x1 > paddle.position.x1 && 
        ball.position.x1 < paddle.position.x2 && 
        ball.position.x2 > paddle.position.x1 && 
        ball.position.x2 < paddle.position.x2 &&
        ball.position.y1 < paddle.position.y1 &&  
        ball.position.y1 < paddle.position.y2 &&
        ball.position.y2 > paddle.position.y1 &&  
        ball.position.y2 < paddle.position.y2)
        || //Check Collision on the Bottom Right
       (ball.position.x1 < paddle.position.x1 &&
        ball.position.x1 < paddle.position.x2 &&
        ball.position.x2 > paddle.position.x1 && 
        ball.position.x2 < paddle.position.x2 &&
        ball.position.y1 < paddle.position.y1 &&
        ball.position.y1 < paddle.position.y2 &&
        ball.position.y2 > paddle.position.y1 &&
        ball.position.y2 < paddle.position.y2)
        ) {
            ball.velocity.y = -ball.velocity.y;
            ball.center.y -= 2;
            
    }
}

/**
 * Checks to see if the ball has collided with the wall.
 */
function brickCollisionCheck() {
    var i,
        length = bricks.length;

    for (i = 0; i < length; i += 1) {
        if (bricks[i].visible === true) {
            if ((//Check Collision on the Right
                (ball.position.x1 < bricks[i].x1 &&
                 ball.position.x1 < bricks[i].x2 &&
                 ball.position.x2 > bricks[i].x1 &&
                 ball.position.x2 < bricks[i].x2 &&
                 ball.position.y1 > bricks[i].y1 &&
                 ball.position.y1 < bricks[i].y2 &&
                 ball.position.y2 > bricks[i].y1 &&
                 ball.position.y2 < bricks[i].y2) 
                || //Check Collision on the Left
                (ball.position.x1 > bricks[i].x1 &&  
                 ball.position.x1 < bricks[i].x2 &&
                 ball.position.x2 > bricks[i].x1 &&
                 ball.position.x2 > bricks[i].x2 &&
                 ball.position.y1 > bricks[i].y1 &&
                 ball.position.y1 < bricks[i].y2 &&
                 ball.position.y2 > bricks[i].y1 &&  
                 ball.position.y2 < bricks[i].y2)
               ) || 
                (( //Check Collision on the Top Left
                 (ball.position.x1 > bricks[i].x1 && 
                 ball.position.x1 < bricks[i].x2 && 
                 ball.position.x2 > bricks[i].x1 && 
                 ball.position.x2 > bricks[i].x2 && 
                 ball.position.y1 > bricks[i].y1 && 
                 ball.position.y1 < bricks[i].y2 &&
                 ball.position.y2 > bricks[i].y1 &&
                 ball.position.y2 > bricks[i].y2) 
                 || //Check Collision on the Top Middle
                 (ball.position.x1 > bricks[i].x1 && 
                 ball.position.x1 < bricks[i].x2 && 
                 ball.position.x2 > bricks[i].x1 &&
                 ball.position.x2 < bricks[i].x2 &&  
                 ball.position.y1 > bricks[i].y1 &&
                 ball.position.y1 < bricks[i].y2 &&
                 ball.position.y2 > bricks[i].y1 &&
                 ball.position.y2 > bricks[i].y2)
                 || //Check Collision on the Top Right
                 (ball.position.x1 < bricks[i].x1 &&
                 ball.position.x1 < bricks[i].x2 &&
                 ball.position.x2 > bricks[i].x1 &&  
                 ball.position.x2 < bricks[i].x2 && 
                 ball.position.y1 > bricks[i].y1 &&
                 ball.position.y1 < bricks[i].y2 &&
                 ball.position.y2 > bricks[i].y1 &&
                 ball.position.y2 > bricks[i].y2))
                 ||( //Check Collision on the Bottom Left
                 (ball.position.x1 > bricks[i].x1 &&
                 ball.position.x1 < bricks[i].x2 &&
                 ball.position.x2 > bricks[i].x1 &&
                 ball.position.x2 > bricks[i].x2 &&
                 ball.position.y1 < bricks[i].y1 &&
                 ball.position.y1 < bricks[i].y2 &&
                 ball.position.y2 > bricks[i].y1 && 
                 ball.position.y2 < bricks[i].y2)
                 || //Check Collision on the Bottom Middle
                 (ball.position.x1 > bricks[i].x1 && 
                 ball.position.x1 < bricks[i].x2 && 
                 ball.position.x2 > bricks[i].x1 && 
                 ball.position.x2 < bricks[i].x2 &&
                 ball.position.y1 < bricks[i].y1 &&  
                 ball.position.y1 < bricks[i].y2 &&
                 ball.position.y2 > bricks[i].y1 &&  
                 ball.position.y2 < bricks[i].y2)
                 || //Check Collision on the Bottom Right
                  (ball.position.x1 < bricks[i].x1 &&
                 ball.position.x1 < bricks[i].x2 &&
                 ball.position.x2 > bricks[i].x1 && 
                 ball.position.x2 < bricks[i].x2 &&
                 ball.position.y1 < bricks[i].y1 &&
                 ball.position.y1 < bricks[i].y2 &&
                 ball.position.y2 > bricks[i].y1 &&
                 ball.position.y2 < bricks[i].y2)))) 
            {
                        bricks[i].visible = false;
                        score += 100;
                        bricksRemaining -= 1;
                        if(bricksRemaining % BRICK_ROWS < lastscore){
                            lastscore = bricksRemaining % BRICK_ROWS;
                            ball.velocity.y += 0.2;
                        }
                        ball.velocity.y = -ball.velocity.y;
                        ball.center.y -= 2;
            }
        }
    }
}


/**
 * Draws the ball.
 */
function drawBall() {
    context.beginPath();
    context.arc(ball.center.x, ball.center.y, ball.radius, 0, Math.PI * 2, true);
    context.closePath();
    context.stroke();
    context.fill();
}

/**
 * This function is run when a player loses a turn.
 */
function loseTurn() {
    turn -= 1;
    ball = new Ball();
}

/**
 * Draws the paddle.
 */
function drawPaddle() {
    context.fillStyle = paddle.color;
    context.fillRect(paddle.position.x1, paddle.position.y1, paddle.width, paddle.height);
}

/**
 * Loads the colors of the bricks into an array and then returns the
 * array.
 * @return {array} color an array of colors.
 */
function loadBrick() {
    var red = '#ff0000',
        black = '#000000',
        yellow = '#ffff00',
        green = '#00ff00',
        darkBlue = '#0000ff',
        colors = [red, red, black, black, yellow, yellow, green,
            green, darkBlue, darkBlue];
    drawRectangle(colors);
}


/**
 * Draws the bricks.
 */
function drawBricks() {
    var i = 0,
        length = bricks.length,
        x1 = 0,
        y1 = 0,
        x2 = 0,
        y2 = 0,
        color = '';
    for (i = 0; i < length; i += 1) {
        if (bricks[i].visible === true) {
            x1 = bricks[i].x1;
            y1 = bricks[i].y1;
            x2 = BRICK_WIDTH;
            y2 = BRICK_HEIGHT;
            color = bricks[i].color;
            context.fillStyle = color;
            context.fillRect(x1, y1, x2, y2);
        }
    }
}

/**
 * Move the ball arround respecting the colissions
 */
function moveBall() {
    context.clearRect(0, 0, canvas.width, canvas.height);  
    if(endGame != "play"){
        gameOver();
        window.requestAnimationFrame(moveBall);
    }
    else{
        ball.center.x += ball.velocity.x;
        ball.center.y += ball.velocity.y;
        ball.position.x1 = ball.center.x - ball.radius;
        ball.position.y1 = ball.center.y - ball.radius;
        ball.position.x2 = ball.center.x + ball.radius;
        ball.position.y2 = ball.center.y + ball.radius;
        brickBreakerWallCollisionCheck();
        paddleCollisionCheck();
        brickCollisionCheck();
        drawBall();
        drawPaddle();
        drawBricks();
        drawScore();
        drawTurns();
        exitGameCheck();
        window.requestAnimationFrame(moveBall);    
    } 
}

/**
 * Move the paddle base on the keyboard
 */
window.addEventListener("keydown", function(event) { 
    var offset = 0;
    switch (event.key) {
        case "ArrowLeft":
            offset = -30;
            break;
        case "ArrowRight":
            offset = 30;
            break;
        default:
            return;
    }
    paddle.position.x2 = paddle.position.x1 + paddle.width;
    if ((paddle.position.x1 >= 0) && (paddle.position.x2 <= canvas.width)) {
        paddle.position.x1 += offset;
        if (paddle.position.x1 <= 0) {
            paddle.position.x1 = 1;
        } 
        else if (paddle.position.x1 >= canvas.width - paddle.width) {
            paddle.position.x1 = canvas.width - paddle.width;
        }
    }
    drawPaddle();
    paddleCollisionCheck();
});

/**
 * Draws the score.
 */
function drawScore() {
    context.textAlign = 'left';
    context.fillStyle = '#000000';
    context.font = '15px arial';
    context.textBaseline = 'top';
    context.fillText('Score: ' + score, 30,
        canvas.height - 40);
}

/**
 * Draws the turns on the screen.
 */
function drawTurns() {
    context.textAlign = 'left';
    context.fillStyle = '#000000';
    context.font = '15px arial';
    context.textBaseline = 'top';
    context.fillText('Turns: ' + turn, canvas.width - 100,
        canvas.height - 40);
}

/**
 * Gets the variables ready for the game.
 */
var initBrickBraker = function(){
    reziseCanvas();
    endGame = "play";
    $(canvas).unbind('click');
    turn = 3;
    score = 0;
    ball = new Ball();
    paddle = new Paddle();
    drawBall();
    drawPaddle();
    loadBrick();
    drawBricks();
    drawScore();
    bricksRemaining = BRICK_ROWS*BRICKS_PER_ROW;
    lastscore = bricksRemaining % BRICK_ROWS; 
    drawTurns();
    window.requestAnimationFrame(moveBall); 
}

/**
 * Check the win or defeat
 */
function exitGameCheck() {
    if (bricksRemaining == 0) {
        endGame = "Win";
        gameOver();
    } 
    else if (turn == 0) {
        endGame = "Game Over";
        gameOver();
    }
}

/**
 * Game Over Screen
 */
var gameOver = function(){
    $(canvas).bind('click', restartBrickGame);
    var x = canvas.width / 2,
        y = 175;
    context.textAlign = 'center';
    context.fillStyle = '#000000';
    context.font = '30px Verdana bold';
    context.textBaseline = 'top';
    context.fillText(endGame.toUpperCase(), x, y);
    context.font = '15px Arial';
    context.fillStyle = '#000000';
    context.fillText('Click on screen to restart', x, y + 125);
}

/**
 * Draws the start screen.
 */
function drawStartBrickBreakerScreen() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    reziseCanvas();
    $(canvas).bind('click', initBrickBraker);
    var x = canvas.width / 2,
        y = 175;
    context.textAlign = 'center';
    context.fillStyle = '#000000';
    context.font = '30px Verdana bold';
    context.textBaseline = 'top';
    context.fillText('Brick Breaker', x, y);
    context.font = '15px Arial';
    context.fillStyle = '#000000';
    context.fillText('Click on screen to start', x, y + 125);
}

var restartBrickGame = function (){
    reziseCanvas();
    $(canvas).unbind('click');
    endGame = "play";
    turn = 3;
    score = 0;
    ball = new Ball();
    paddle = new Paddle();
    drawBall();
    drawPaddle();
    loadBrick();
    drawBricks();
    drawScore();
    bricksRemaining = BRICK_ROWS*BRICKS_PER_ROW;
    lastscore = bricksRemaining % BRICK_ROWS; 
    drawTurns();
}