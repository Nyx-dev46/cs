const messagesEl = document.getElementById('messages');
const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');

function appendMessage(text, sender) {
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('message');
  msgDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
  msgDiv.textContent = text;
  messagesEl.appendChild(msgDiv);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

async function fetchBotReply(prompt) {
  const API_KEY = 'YOUR_API_KEY';  // Replace with your actual OpenAI API key
  const url = 'https://api.openai.com/v1/chat/completions';

  const body = {
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: 'You are Savage-1, a ruthless AI content savage with edgy Gen Z style.' },
      { role: 'user', content: prompt }
    ],
    temperature: 0.9,
    max_tokens: 150,
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return data.choices[0].message.content.trim();
}

chatForm.addEventListener('submit', async e => {
  e.preventDefault();
  const userText = userInput.value.trim();
  if (!userText) return;
  appendMessage(userText, 'user');
  userInput.value = '';

  appendMessage('Savage-1 is thinking...', 'bot');
  try {
    const botReply = await fetchBotReply(userText);
    const thinkingMsg = messagesEl.querySelector('.bot-message:last-child');
    if (thinkingMsg && thinkingMsg.textContent === 'Savage-1 is thinking...') {
      thinkingMsg.remove();
    }
    appendMessage(botReply, 'bot');
  } catch (err) {
    const thinkingMsg = messagesEl.querySelector('.bot-message:last-child');
    if (thinkingMsg && thinkingMsg.textContent === 'Savage-1 is thinking...') {
      thinkingMsg.remove();
    }
    appendMessage('Error connecting to API. Try again later.', 'bot');
  }
});
