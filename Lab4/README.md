###### Graphics Programming - Exercise 4

# User Interaction 
In this exercise we will look at user interaction with our canvas.

## Exercises
Save each exercise as a separate source file.

1. Open mouse.html and click on the canvas. You should see a red dot appear on the canvas.

1. Log the event variable to the console, and examine it. Change mouse.html to draw the circle at (event.clientX, event.clientY), rather than (50,50).

1. Have a look at Mozilla's documentation on [offsetTop](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetTop) and [offsetLeft](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetLeft). Fix mouse.html so that the circle is drawn with its centre at the mouse cursor.

1. Have every second circle drawn in blue, rather than red.

1. Open keyboard.html in Firefox, with the JavaScript console open. Press various keys and examine the console output.

1. Have a circle drawn initially on the console, and when the user presses any of the arrow keys, have the ball move in that direction.

1. Edit the code so that the ball cannot go off the edge of the canvas.

## Advanced exercises

1. Create an x's and o's game. At the start a grid should be displayed on the canvas, and two players can take turns in clicking in any of the empty sections in the grid. The first click should result in a circle going into that section, with the next click (in any other empty section) resulting in a square being places in that setion. The players then alternate turns until one wins or the game ends in a draw.

1. Change .

## Note

- See Mozilla's list of standard events [here](https://developer.mozilla.org/en-US/docs/Web/Events).

- Have a look at Code Academy's tutorial on events [here](https://www.codecademy.com/courses/web-beginner-en-A0uwI/0/2).
