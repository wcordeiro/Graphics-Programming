/**
* @fileoverview JavaScript for the Brick Breaker game.
* @author Wilson Cordeiro
*/

  // Gets a handle to the element with id canvasOne.
  var canvas = document.getElementById("gamecanvas");
  // Get a 2D context for the canvas.
  var ctx = canvas.getContext("2d");


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
    var ballVelocity = 3,
            getRandomXVelocity = function() {
                var randomNumber = Math.random();
                if (randomNumber > 0.5) {
                    return ballVelocity;
                }
                return ballVelocity * -1;
            };
    this.velocity = {
                        x : getRandomXVelocity(),
                        y : ballVelocity
                    };
  };
    
    var ball = new Ball(); // Variable ball (object ball)
    
  var pad = {
    position : { x : 0 , y : 350 }
    , size : { x : 70 , y : 10 }
    , redirect : true

    ,check : function(){
      //  var part1 = Math.pow(ball.position.x - this.position.x,2);
        //var part2 = Math.pow(ball.position.y - this.position.y,2);

        //var d = Math.sqrt((part1+part2));

        if (ball.position.x + ball.radius < pad.position.x || ball.position.x - ball.radius > pad.position.x + pad.size.x)
            return true;

        else if (ball.position.y + ball.radius < pad.position.y)
            return true;
        else
            return false;
     }  

    , draw : function (){
         ctx.fillStyle = "rgb(0, 255, 0)";
         ctx.strokeStyle = "rgb(0, 0, 0)";
         ctx.fillRect(this.position.x,this.position.y,this.size.x,this.size.y);
         ctx.strokeRect(this.position.x,this.position.y,this.size.x,this.size.y);
         if(!this.check() && this.redirect){
            start = true; 
            this.redirect = false; 
            ball.velocity.y *= -1;
            if(ball.position.x > this.x){
                ball.velocity.x *= -1;
            }
         }
         else if(this.check()){
            this.redirect = true;
         }
    }
  };

  var init = function (){
    canvas.width = 400;
    canvas.height = 400;
  }

  var collideCheck = false;

 function Rectangle (x, y){
     this.x = x;
     this.y = y;
     this.sizex = 40;
     this.sizey = 30;
     this.redraw = true;

     this.check = function(){
        var part1 = Math.pow(ball.position.x - this.x,2);
        var part2 = Math.pow(ball.position.y - this.y,2);

        var d = Math.sqrt((part1+part2));

        if(collideCheck)
            return true;

        if(d < ball.radius)
            return false;
        else if(d + this.sizex < ball.radius)
            return false;
        else if(d - this.sizex < ball.radius)
            return false;
     /*   else if(d + this.sizey < ball.radius)
            return false;
        else if(d - this.sizey < ball.radius)
            return false;*/
        else
            return true;
        return true;
     }

     this.draw = function (){
        if(this.check() && this.redraw){
            ctx.fillStyle = "rgb(255, 0, 0)";
            ctx.strokeStyle = "rgb(0, 0, 0)";
            ctx.fillRect(this.x,this.y,this.sizex,this.sizey);
            ctx.strokeRect(this.x,this.y,this.sizex,this.sizey);
        }
        else{
            //Collisons treat
            if(this.redraw){
                pad.redirect = true;
                ball.velocity.y = 28;
                if(ball.position.x > this.x){
                    ball.velocity.x *= -1;
                }
                collideCheck = true;
            }
            this.redraw = false;               
        }
     }
  };

  var rec = [[null,null,null,null,null,null,null,null,null,null],
             [null,null,null,null,null,null,null,null,null,null],
             [null,null,null,null,null,null,null,null,null,null]];

  for(var i = 0; i < 2 ; i++){
      for(var j = 0; j < 10 ; j++){
        rec[i][j] = new Rectangle(j*40,i*30);

      }
  }

  var start = false;    

  var draw = function(){ 
    collideCheck = false;  
    ctx.fillStyle = "rgb(0, 0, 0)";  
    ctx.beginPath();
    ctx.arc(ball.position.x, ball.position.y, ball.radius, 0, 2 * Math.PI);
    ctx.fill();
    pad.draw();  
    if(start){  
        for(var i = 0; i < 2 ; i++){  
            for(var j = 0; j < 10 ; j++){ 
                    rec[i][j].draw();
            }
        }
    }
  }

  var move = function(){
   ctx.clearRect(0, 0, canvas.width, canvas.height);  
    console.log(ball.position.y + " " + ball.acceleration.y + " " + ball.velocity.y);

    ball.velocity.y += ball.acceleration.y;
    ball.position.x += ball.velocity.x;
    ball.position.y += ball.velocity.y;  

    //Left wall  
    if(ball.position.x < ball.radius){
        ball.position.x = ball.radius;
        ball.velocity.x *= -1;
    }
    //Right Wall
    else if(ball.position.x > canvas.width - ball.radius){
        ball.position.x = canvas.width - ball.radius;
        ball.velocity.x *= -1;
    }
    //Top Wall
    if(ball.position.y < ball.radius){
        ball.position.y = ball.radius;
        ball.velocity.y *= -1;
        pad.redirect = true;
    }
    //Down Wall
    else if(ball.position.y > canvas.height - ball.radius){
        ctx.clearRect(0, 0, canvas.width, canvas.height); 
        ctx.fillText("You Lose",200,200);
        return;
    }
    draw();  
    window.requestAnimationFrame(move);  
  }

  window.addEventListener("keydown", function(event) {  
    switch (event.key) {
        case "ArrowLeft":
          pad.position.x = pad.position.x - 30;
          break;
        case "ArrowRight":
          pad.position.x = pad.position.x + 30;
          break;
        default:
          return;
    }
    pad.draw();
  });


  init();
  draw();
  window.requestAnimationFrame(move);