document.getElementById('chat-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const input = document.getElementById('user-input');
  const messages = document.getElementById('messages');
  const userMessage = input.value.trim();
  if (!userMessage) return;

  // Show user message
  const userMsgElem = document.createElement('div');
  userMsgElem.classList.add('message', 'user');
  userMsgElem.textContent = userMessage;
  messages.appendChild(userMsgElem);

  // Simple bot response (echo for demo)
  const botMsgElem = document.createElement('div');
  botMsgElem.classList.add('message', 'bot');
  botMsgElem.textContent = "Savage-1 says: " + userMessage;
  messages.appendChild(botMsgElem);

  // Clear input and scroll to bottom
  input.value = '';
  messages.scrollTop = messages.scrollHeight;
});
