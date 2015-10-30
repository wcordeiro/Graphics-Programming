/**
* @fileoverview JavaScript for the Starter Screen (Game selection)
* @author Wilson Cordeiro
*/

  // Gets a handle to the element with id canvasOne.
  var canvas = document.getElementById("gamecanvas");
  // Get a 2D context for the canvas.
  var context = canvas.getContext("2d");
  // Size before the canvas
  var SCREEN_HEIGHT = 83 ;

/**
 * Resize the Canvas
 */
function reziseCanvas(){
    canvas.width = 600;
    canvas.height = 600;
}

/**
 * Draws the Game Options.
 */
function drawStartScreen() {
    reziseCanvas();
    $(canvas).bind('click', gameSelection);
    var x = canvas.width / 2,
        y = 175;
    context.textAlign = 'center';
    context.fillStyle = '#000000';
    context.font = '30px Verdana bold';
    context.textBaseline = 'top';
    context.fillText("Chose the Game:",x,100)
    context.fillText('Brick Breaker', x, y);
    context.fillText('Snake', x, y+100);
}

function gameSelection (e){
    console.log(e.pageY);
    $(canvas).unbind('click');
    if(e.pageY - SCREEN_HEIGHT > 150 && e.pageY - SCREEN_HEIGHT < 225 )
        drawStartBrickBreakerScreen();
    else if(e.pageY - SCREEN_HEIGHT > 225 && e.pageY - SCREEN_HEIGHT < 300)
        drawStartSnakeScreen();
    else{
        drawStartScreen(); 
    }
}

drawStartScreen();