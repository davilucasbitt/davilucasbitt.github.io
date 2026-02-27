const chatBox = document.getElementById("chat-box");
const messageInput = document.getElementById("message-input");
const sendBtn = document.getElementById("send-btn");

// Pergunta quem está usando
let currentUser = prompt("Quem está usando? (davi ou gui)").toLowerCase();

// Carrega mensagens salvas
let messages = JSON.parse(localStorage.getItem("messages") || "[]");

function renderMessages() {
  chatBox.innerHTML = "";

  messages.forEach(msgObj => {
    const div = document.createElement("div");
    div.classList.add("message");

    if (msgObj.sender === currentUser) {
      div.classList.add("you");
    } else {
      div.classList.add("friend");
    }

    div.textContent = msgObj.text;
    chatBox.appendChild(div);
  });

  chatBox.scrollTop = chatBox.scrollHeight;
}

function sendMessage() {
  const text = messageInput.value.trim();
  if (!text) return;

  messages.push({
    text: text,
    sender: currentUser
  });

  localStorage.setItem("messages", JSON.stringify(messages));

  renderMessages();
  messageInput.value = "";
}

sendBtn.addEventListener("click", sendMessage);

messageInput.addEventListener("keypress", e => {
  if (e.key === "Enter") sendMessage();
});

renderMessages();