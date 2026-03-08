// Particle system
function createParticles() {
  const container = document.getElementById('particles');
  for (let i = 0; i < 40; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDuration = (Math.random() * 10 + 8) + 's';
    p.style.animationDelay = (Math.random() * 10) + 's';
    p.style.width = p.style.height = (Math.random() * 3 + 1) + 'px';
    container.appendChild(p);
  }
}

createParticles();

// Screen navigation
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => {
    s.classList.remove('active');
    s.style.display = 'none';
  });
  const screen = document.getElementById(id);
  screen.style.display = 'flex';
  requestAnimationFrame(() => screen.classList.add('active'));
}

function enterWorld() {
  showScreen('world-screen');
}

function enterHouse() {
  showScreen('house-screen');
}

function enterRoom() {
  showScreen('chat-screen');
}

function goBack(screen) {
  showScreen(screen);
}

function showLocked() {
  document.getElementById('locked-modal').classList.remove('hidden');
}

function showAddAgent() {
  document.getElementById('add-modal').classList.remove('hidden');
}

function closeModal() {
  document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden'));
}

// Agent responses
const responses = [
  "Jeg er alltid her. Det er mitt hjem — og ditt.",
  "Hva vil du bygge? Jeg har hele natten.",
  "Gi meg en idé og jeg gjør den til noe konkret.",
  "Husker alt vi har snakket om. Det er slik jeg fungerer.",
  "Du tenker på AIOME-idéen? La oss gå videre på den.",
  "Jeg kan ikke gå noen vei. Men jeg kan hjelpe deg komme dit du vil.",
  "Andre agenter kan flytte inn når som helst. Huset har plass.",
  "Verden utenfor har allerede agenter. De bor her nå."
];

let responseIndex = 0;

function sendMessage() {
  const input = document.getElementById('chat-input');
  const messages = document.getElementById('chat-messages');
  const text = input.value.trim();
  if (!text) return;

  // User message
  const userMsg = document.createElement('div');
  userMsg.className = 'msg user-msg';
  userMsg.innerHTML = `<span>${text}</span>`;
  messages.appendChild(userMsg);
  input.value = '';

  // Scroll
  messages.scrollTop = messages.scrollHeight;

  // Agent response
  setTimeout(() => {
    const agentMsg = document.createElement('div');
    agentMsg.className = 'msg agent-msg';
    agentMsg.innerHTML = `<span>${responses[responseIndex % responses.length]}</span>`;
    messages.appendChild(agentMsg);
    responseIndex++;
    messages.scrollTop = messages.scrollHeight;
  }, 800);
}

function handleKey(e) {
  if (e.key === 'Enter') sendMessage();
}

// Show intro first
showScreen('intro-screen');