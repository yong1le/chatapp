const flashes = document.querySelector('.flashes');
const limit = 200;
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

const removeFlashes = () => {
  setInterval(moveFlashes, 10);
  clearInterval(removeFlashes);
};

if (flashes != null) {
  setInterval(removeFlashes, 5000);
}
