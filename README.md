# Langton's Ant

Langton's Ant is an interactive visualization of a two-dimentional turing machine with a very simple set of rules that produce complex results.  This specific visualization improves upon the original by allowing for multiple ants at a time,
and including an option to make the visualization multi-colored.

Experience at: [Langton's Ant][link]

[link]: http://mallen1080.github.io/Langtons-Ant/


### Technologies Used
- Javascript
- HTML Canvas

### Intro and menu
![menu]

### With multiple active ants
![action]

[menu]: ./assets/images/menu_ss.png
[action]: ./assets/images/action_ss.png

### Speed change

Any time the position of the speed slider is changed, the timing of the board steps
is also changed.  Events.prototype.changeSpeed gets an input from the slider
at a linear range from 1 to 1000. Early development of this project involved
running a single board step every (1000 / speedInput) milliseconds. This lead to
1 step /second on the left bound of the slider, and 1000 steps / second on the
right bound.

This posed 2 problems:

1. It was calculated that the average and maximum amount of time it took to
run a board step was 15.4ms and 19ms respectively.  This caused a backup of
steps whenever the speed exceeded 50 steps / second, which accounted for 19/20ths
of the slider.
2. The linear model led to a poor visual representation of the position of the slider.  
On the left bound, an increase of 100 from the input changed the speed from 1 step / second
to 100 steps / second, which caused a large visual change.  On the right bound, a decrease of 100
changed the speed from 1000 steps / second to 900 steps / second, which was seen as negligible.  

Both of these problems were solved with the setSpeed function below.

```javascript
Events.prototype.changeSpeed = function (e) {
  this.setSpeed(e.target.value);

  if (this.board.active) {
    this.pauseBoard();
    this.startBoard();
  }
};

Events.prototype.setSpeed = function (speed) {
  this.board.speed = (1000 / Math.pow(1000, speed / 1000)) + 20;
};
```

By using Math.pow with a base of 1000, the map is changed from a linear model to an
exponential one where changes on both end of the spectrum are more fitting visually.
By adding 20 at the end, it ensures that a step cannot run any faster than every 20ms
on the right bound, and has a negligible difference on the left bound.

### Future Work
- [ ] Ability to add new rows to the grid
