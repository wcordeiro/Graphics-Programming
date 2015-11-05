/**
* @fileoverview JavaScript for the Ping Pong game.
* @author Wilson Cordeiro
*/

  // Gets a handle to the element with id canvasOne.
  var canvas = document.getElementById("gamecanvas");
  // Get a 2D context for the canvas.
  var context = canvas.getContext("2d");
  // Ball Object
  var pingBall;
  // User Paddle
  var userPaddle;
  // AI Paddle
  var aiPaddle;
  // Lifes
  var aiLifes,userLifes;
  // Game status variable
  var endPingGame;
  // Control the following of the ball by the aiPaddle
  var following;
  // Count the hits, and update the speed
  var count;

/**
* A Ball.
* @constructor
*/
var PingBall = function() {
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
 var PingPaddle = function(y) {
    this.width = 100; //Size on X
    this.height = 15; //Size on Y
    this.color = '#000'; //Color of the paddle
    this.position = { //Position was divided in four variables in order to faciltate collision detection
                        x1 : (canvas.width - this.width) / 2,
                        y1 : y - this.height,
                        x2 : this.x1 + this.width,
                        y2 : y
                    };
};

/**
 * Draws the ball.
 */
function drawPingBall() {
    context.beginPath();
    context.arc(pingBall.center.x, pingBall.center.y, pingBall.radius, 0, Math.PI * 2, true);
    context.closePath();
    context.stroke();
    context.fill();
}

/**
 * Draws the paddle.
 */
function drawPingPaddle(paddle) {
    context.fillStyle = paddle.color;
    context.fillRect(paddle.position.x1, paddle.position.y1, paddle.width, paddle.height);
}

/**
 * Initialize the variables
 */
var initPingPongGame = function(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    $(canvas).unbind('click');
    pingBall = new PingBall();
    aiPaddle = new PingPaddle(15);
    userPaddle = new PingPaddle(canvas.width);
    drawPingBall();
    drawPingPaddle(aiPaddle);
    drawPingTurns();
    drawPingPaddle(userPaddle);
    aiLifes = 3;
    userLifes = 3;
    endPingGame = "play";
    following = true;
    count = 1;
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
        
        if ((userPaddle.position.x1 >= 0) && (userPaddle.position.x2 <= canvas.width)) {
            userPaddle.position.x1 += offset;
            if (userPaddle.position.x1 <= 0) {
                userPaddle.position.x1 = 1;
            } 
            else if (userPaddle.position.x1 >= canvas.width - userPaddle.width) {
                userPaddle.position.x1 = canvas.width - userPaddle.width;
            }
        }
        userPaddle.position.x2 = userPaddle.position.x1 + userPaddle.width;
    });
    window.requestAnimationFrame(movePingBall);
}

/**
 * Checks to see if the snake has collided with one of the walls.
 */
var pingBallWallCollisionCheck = function(){
    //Left wall  
    if(pingBall.position.x1 < 0  || pingBall.position.x2 < 0 ){
        pingBall.velocity.x = -pingBall.velocity.x;
    }
    //Right Wall
    else if(pingBall.position.x1 > canvas.width  || pingBall.position.x2 > canvas.width){
        pingBall.velocity.x = -pingBall.velocity.x;
    }
    //Top Wall
    if(pingBall.position.y1 < 0 || pingBall.position.y2 < 0){
        aiLifes -= 1;
        pingBall = new PingBall();
        setTimeout(function(){
            count = 1;
            drawPingBall();
        },30);
    }
    //Down Wall
    else if(pingBall.position.y1 > canvas.height || pingBall.position.y2 > canvas.height ){
        userLifes -= 1;
        pingBall = new PingBall();
        setTimeout(function(){
            count = 1;
            drawPingBall();
        },30);
    }
}

/**
 * Checks to see if the paddle has collided with the ball.
 */
var pingPaddleCollisionCheck = function(paddle){
    if (isCollidingRightLeft(pingBall, paddle)) {
            if(count % 10 == 0){
              pingBall.velocity.x *= 1.3;    
            }
            pingBall.velocity.x = -pingBall.velocity.x;
    } 
    if (isCollidingTopBottom(pingBall, paddle)) {
            if(count % 10 == 0){
                //
                pingBall.velocity.y *= 1.5;
            }
            pingBall.velocity.y = -pingBall.velocity.y;
            count += 1;
           // console.log(paddle.position, pingBall.position);
            return false;
    }
    return true;
}

function moveAIPaddle() {

    //randomly pick number beteween 0 and 1
    var delayReaction = Math.random();

    var delayChance = 0;
    
    switch(aiLifes){
        case 3 : 
                delayChance = 0.5;
                break;
        case 2 :
                delayChance = 0.25;
                break;
        case 1 : 
                delayChance = 0.1;
                break;
        
    }
    
    //chance of reaction delay depends on the turn
    if(delayReaction >= delayChance) {
        if(pingBall.position.x1 > aiPaddle.position.x1 + aiPaddle.width) {
            if(aiPaddle.position.x1 + aiPaddle.width + 5 <= canvas.width) {
                aiPaddle.position.x1 += 5;
            }
        }
        else if(pingBall.position.x1 < aiPaddle.position.x1) {
            if(aiPaddle.position.x1 - 5 >= 0) {
                aiPaddle.position.x1 -= 5;
            }
        }
        else {
            var centerPaddle = Math.random();
            //80% chance of better centering the paddle
            //otherwise the paddleAI will most of the times
            //hit the ball in one of its extremities
            if(centerPaddle > 0.2) {
                //if ball closer to left side of computer paddle
                if( Math.abs(pingBall.position.x1 - aiPaddle.position.x1) < Math.abs(pingBall.position.x1 - aiPaddle.position.x1 - aiPaddle.width) ) {
                    if(aiPaddle.position.x1 - 5 >= 0) {
                        aiPaddle.position.x1 -= 5;
                    }
                }

                else {	
                    if(aiPaddle.position.x1 + aiPaddle.width + 5 <= canvas.width) {
                        aiPaddle.position.x1 += 5;
                    }
                }
            }
        }
    }
    aiPaddle.position.x2 = aiPaddle.position.x1 + aiPaddle.width;
    //console.log(aiPaddle.position,pingBall.position);
}

var movePingBall = function(){
    context.clearRect(0, 0, canvas.width, canvas.height);  
    if(endPingGame != "play"){
        gamePingOver();
        window.requestAnimationFrame(movePingBall);
    }
    else{
        pingBall.center.x += pingBall.velocity.x;
        pingBall.center.y += pingBall.velocity.y;
        pingBall.position.x1 = pingBall.center.x - pingBall.radius;
        pingBall.position.y1 = pingBall.center.y - pingBall.radius;
        pingBall.position.x2 = pingBall.center.x + pingBall.radius;
        pingBall.position.y2 = pingBall.center.y + pingBall.radius;
        if(following)
            moveAIPaddle();
        pingBallWallCollisionCheck();
        following = pingPaddleCollisionCheck(aiPaddle);
        pingPaddleCollisionCheck(userPaddle)
        drawPingBall();
        drawPingPaddle(userPaddle);
        drawPingPaddle(aiPaddle);
        drawPingTurns();
        exitPingGameCheck();
        window.requestAnimationFrame(movePingBall);    
    } 
}

var exitPingGameCheck = function(){
    if(aiLifes == 0){
        endPingGame = "Win"
    }
    else if (userLifes == 0){
        endPingGame = "Defeat"
    }
}

/**
 * Game Over Screen
 */
var gamePingOver = function(){
    $(canvas).bind('click', restartPingPongGame);
    var x = canvas.width / 2,
        y = 175;
    context.textAlign = 'center';
    context.fillStyle = '#000000';
    context.font = '30px Verdana bold';
    context.textBaseline = 'top';
    context.fillText(endPingGame.toUpperCase(), x, y);
    context.font = '15px Arial';
    context.fillStyle = '#000000';
    context.fillText('Click on screen to restart', x, y + 125);
}

/**
 * Restart the variables
 */
var restartPingPongGame = function(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    $(canvas).unbind('click');
    pingBall = new PingBall();
    aiPaddle = new PingPaddle(15);
    userPaddle = new PingPaddle(canvas.width);
    drawPingBall();
    drawPingPaddle(aiPaddle);
    drawPingPaddle(userPaddle);
    drawPingTurns();
    aiLifes = 3;
    userLifes = 3;
    endPingGame = "play";
    following = true;
    count = 1;
}

/**
 * Draws the start screen.
 */
function drawStartPingPongScreen() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    reziseCanvas();
    $(canvas).bind('click', initPingPongGame);
    var x = canvas.width / 2,
        y = 175;
    context.textAlign = 'center';
    context.fillStyle = '#000000';
    context.font = '30px Verdana bold';
    context.textBaseline = 'top';
    context.fillText('Ping Pong', x, y);
    context.font = '15px Arial';
    context.fillStyle = '#000000';
    context.fillText('Click on screen to start', x, y + 125);
}

/**
 * Draws the turns on the screen.
 */
function drawPingTurns() {
    context.textAlign = 'left';
    context.fillStyle = '#000000';
    context.font = '15px arial';
    context.textBaseline = 'top';
    context.fillText('Lifes: ' + aiLifes, 10,10);
    context.fillText('Lifes: ' + userLifes, canvas.width - 50,
        canvas.height - 20);
}


