const chatBox = document.getElementById("chat-box");
const messageInput = document.getElementById("message-input");
const sendBtn = document.getElementById("send-btn");

// Lista de mensagens salva no LocalStorage
let messages = JSON.parse(localStorage.getItem("messages") || "[]");

function renderMessages() {
  chatBox.innerHTML = "";
  messages.forEach(msg => {
    const p = document.createElement("p");
    p.textContent = msg;
    chatBox.appendChild(p);
  });
  chatBox.scrollTop = chatBox.scrollHeight;
}

function sendMessage() {
  const text = messageInput.value.trim();
  if (!text) return;
  messages.push(text);
  localStorage.setItem("messages", JSON.stringify(messages));
  renderMessages();
  messageInput.value = "";
}

sendBtn.addEventListener("click", sendMessage);
messageInput.addEventListener("keypress", e => {
  if (e.key === "Enter") sendMessage();
});

// Renderiza mensagens salvas ao carregar a página
renderMessages();