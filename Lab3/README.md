###### Graphics Programming - Exercise 3
# Animation Frames
In this exercise we will use requestAnimationFrame() to animate a circle moving down the canvas.

## Exercises
Save each exercise as a separate source file.

1. Download this repository, open the files in Brackets, and open ball.html in Firefox.

1. Put a border around the canvas so that we can see its edges.

1. Stop the ball moving when it hits the bottom of the canvas.

1. Clear at each step of the animation, so that only one copy of the ball is visible at a time.

1. Represent the ball as an object, rather than by a global y value and hard-coded x and r values.

1. Change the code so that the ball starts moving up the way once it reaches the bottom of the screen.

1. Change the code so that the ball bounces from the bottom to the top of the screen, and back again, repeatedly. 

## Advanced exercises

1. Give the ball a hozizontal velocity, as well as a vertical one, and have it bounce off the left and right sides of the canvas also.

1. Give the ball a downwards acceleration, so that it gets faster as it falls, and slower as it ascends.

## Notes

- See [here](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) for Mozilla's docs on Window.requestAnimationFrame().

- CSS-Tricks has a good blog post [here](https://css-tricks.com/using-requestanimationframe/) about using requestAnimationFrame. Note that it discusses using it without canvas tags. 

- Mozilla Developer Network: [WindowTimers.setInterval()](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval)

- Mozilla Developer Network: [WindowTimers.setTimeout()](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setTimeout)