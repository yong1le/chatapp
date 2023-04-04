// The idea to remove flashes is to move them enough to the right so that
// They appear to be off the screen
const flashes = document.querySelector('.flashes');
const limit = 200; // How much the flashes should be moved
let pos = 0;

const moveFlashes = () => {
  if (pos === limit) {
    clearInterval(moveFlashes);
  } else if (pos >= limit / 3) {
    pos = pos + 2;
    flashes.style.right = -pos + 'px';
  } else {
    pos++;
    flashes.style.right = -pos + 'px';
  }
};

// Play this animation once
const removeFlashes = () => {
  setInterval(moveFlashes, 10);
  clearInterval(removeFlashes);
};

// Only set the animation timer once a flash has appeared
if (flashes != null) {
  setInterval(removeFlashes, 5000);
}
