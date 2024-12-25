const socket = io("http://localhost:3001");

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

// Retrieve userId from  local storage
const userId = localStorage.getItem('user_id');
const name = localStorage.getItem('name');
if (userId) {
    socket.emit('set user', userId); // Send userId to the server
}

// Send chat message to the server
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value) {
        socket.emit('chat message', input.value); // Emit message to the server
        input.value = ''; // Clear input
    }
});

// Listen for chat messages from the server
socket.on('chat message', (data) => {
    const item = document.createElement('li');
    item.textContent = `${data.username}: ${data.message}`;
        
    if(data.username==name){
        item.classList.add("received")
    } else {
        item.classList.add("sent")
    }
    // Create the icon
    const icon = document.createElement('div');
    icon.classList.add('icon');
    icon.textContent = '?';

    // Create the timestamp
    const timestampSpan = document.createElement('span');
    timestampSpan.classList.add('timestamp');
    timestampSpan.textContent = data.time;
    messages.appendChild(item);
    item.appendChild(timestampSpan);
    item.appendChild(messageText);

    messages.scrollTop = messages.scrollHeight;
});

// Listen for user connection notifications
socket.on('user connected', (msg) => {
    const item = document.createElement('li');
    item.classList.add('notification');
    item.textContent = msg;
    messages.appendChild(item);
});

// Listen for user disconnection notifications
socket.on('user disconnected', (msg) => {
    const item = document.createElement('li');
    item.classList.add('notification');
    item.textContent = msg;
    messages.appendChild(item);
});


// To keep the page at the bottom so new messages appear 
const chatbox = document.getElementById("messages");
const config = { childList: true };
const callback = function (mutationsList, observer) {
  for (let mutation of mutationsList) {
    if (mutation.type === "childList") {
      window.scrollTo(0, document.body.scrollHeight);
    }
  }
};
const observer = new MutationObserver(callback);
observer.observe(chatbox, config);

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}
