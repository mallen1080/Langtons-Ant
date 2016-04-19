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

Input from speed slider is remapped so that the speed visualization is a better representation of its position on the slider.

The left end of the slider is mapped to run a step once per second
The right end of the slider is mapped to run a step 100 times per second


```javascript
Events.prototype.changeSpeed = function (e) {
  this.setSpeed(e.target.value);
  var prevState = this.board.active;
  if (prevState) {
    this.pauseBoard();
    this.startBoard();
  }
};

Events.prototype.setSpeed = function (speed) {
  this.board.speed = (1000 / Math.pow(1000, speed / 1000)) + 20;
};
```

### Future Work
[ ] Ability to add new rows to the grid
