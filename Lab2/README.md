# JavaScript Refresher
In this exercise we will refresh our knowledge of JavaScript.
THe exercises are mainly focused on writing JavaScript for use with Canvas and SVG tags.

## Exercises
Save each exercise as a separate source files:

1. Download and open the files in this repository in Brackets.

1. Open basics.html in Firefox.

1. In basics.html, create two variables, called xpos and ypos. Set xpos to 10 and ypos to 20.

1. Refresh basics.html in Firefox, open the javascript console, and check that xpos and ypos have been defined.

1. Create a JavaScript function called move(), which adds 10 to both xpos and ypos. Verify that your function works at the JavaScript console.

1. Change move() to take two arguments, one value to add to xpos, and the other to add to ypos. Check that your function works.

1. Create an object called ball, that has the following properties: x (its x co-ordinate), y (its y co-ordinate) and r (its radius).

1. Define a function/method in ball called move(), which moves the x and y co-ordinates by 10.

1. Change move() to take two values, one the increment for the x value and the other the increment for the y value.

1. Create a second method in ball, called resize, which takes one argument. This should set the radius (r) of the ball to the value of the argument.

## Advanced exercises

1. Create a method called contains() in ball, that takes two arguments - one an x co-ordinate and the other a y co-ordinate. The method should return true if the point given by those co-ordinates is in or on the circle.

1. Re-create the ball object using a constructor function instead of an object literal. You should name this object Ball instead of ball.

1. Create a method in the Ball object called intersect, which takes another Ball as an argument and returns true if the Balls are touching/intersecting and false otherwise.

## Note

- There is an excellent JavaScript refresher tutorial here: [A re-introduction to JavaScript (JS tutorial)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript)

- Mozilla have a piece on objects here: [Working with objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects).
