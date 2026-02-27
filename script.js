const loginContainer = document.getElementById("login-container");
const chatContainer = document.getElementById("chat-container");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("login-btn");
const loginError = document.getElementById("login-error");

const chatBox = document.getElementById("chat-box");
const messageInput = document.getElementById("message-input");
const sendBtn = document.getElementById("send-btn");

// Usuários válidos
const users = {
  davi: "davidono",
  gui: "guidono"
};

let currentUser = null;

// Mensagens salvas no LocalStorage
let messages = JSON.parse(localStorage.getItem("messages") || "[]");

// Função login
loginBtn.addEventListener("click", () => {
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if (users[username] && users[username] === password) {
    currentUser = username;
    loginContainer.style.display = "none";
    chatContainer.style.display = "flex";
    renderMessages();
  } else {
    loginError.style.display = "block";
  }
});

// Renderiza mensagens no chat
function renderMessages() {
  chatBox.innerHTML = "";
  messages.forEach(msgObj => {
    const div = document.createElement("div");
    div.classList.add("message");
    div.classList.add(msgObj.sender === currentUser ? "you" : "friend");
    div.textContent = msgObj.text;
    chatBox.appendChild(div);
  });
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Enviar mensagem
function sendMessage() {
  const text = messageInput.value.trim();
  if (!text) return;

  messages.push({ text, sender: currentUser });
  localStorage.setItem("messages", JSON.stringify(messages));
  renderMessages();
  messageInput.value = "";
}

sendBtn.addEventListener("click", sendMessage);
messageInput.addEventListener("keypress", e => {
  if (e.key === "Enter") sendMessage();
});