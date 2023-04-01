const msg = document.querySelector('#new-msg');
const form = document.querySelector('.msg-form');
const messagesBox = document.querySelector('.messages-box');
const textBox = document.getElementById('new-msg');

// Automatically scroll to the bottom of the page on page load
const adjustScroll = () => {
  messagesBox.scrollTop = messagesBox.scrollHeight;
}

// Always focus the textbox on page load
const focusTextBox = () => {
  textBox.focus();
}

// Check whether the message is an empty string.
// Do not send empty strings
const checkEmpty = (e) => {
  if (msg.value === '')
    e.preventDefault(); 
}

form.addEventListener('submit', checkEmpty);
document.addEventListener('DOMContentLoaded', adjustScroll);
document.addEventListener('DOMContentLoaded', focusTextBox);