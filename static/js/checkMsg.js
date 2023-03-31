const msg = document.querySelector('#new-msg');
const form = document.querySelector('.msg-form');

const checkEmpty = (e) => {
  if (msg.value === '')
    e.preventDefault(); 
}

form.addEventListener('submit', checkEmpty);