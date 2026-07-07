const container = document.getElementById('popup-container');

const messages = [
  "ERROR // PARASITE DETECTED",
  "WARNING // SYSTEM CORRUPTED",
  "GLITCH // SIGNAL LOST",
  "MALFUNCTION // HOST INFECTED",
  "OVERRIDE // CONTROL LOST",
  "BREACH // FIREWALL DISABLED",
  "ALERT // UNAUTHORIZED ACCESS",
  "CRITICAL // MEMORY LEAK",
  "SYSTEM // OVERRIDE ACTIVE",
  "HOST // COMPROMISED"
];

const symbols = [
  "</O>",
  "<{X}>",
  "#Ω#",
  "<>_<>",
  ":•:",
  "~∆~"
];

function spawnPopup() {
  const popup = document.createElement('div');

  // 50% Symbol-Fenster, 50% Text-Fenster
  const isSymbol = Math.random() > 0.5;

  if (isSymbol) {
    popup.classList.add('popup-symbol');
    popup.innerHTML = `<p>${symbols[Math.floor(Math.random() * symbols.length)]}</p>`;
  } else {
    const isGreen = Math.random() > 0.5;
    popup.classList.add(isGreen ? 'popup-green' : 'popup-red');
    popup.innerHTML = `<p>${messages[Math.floor(Math.random() * messages.length)]}</p>`;
  }

  // zufällige Position
  const x = Math.random() * 70 + 10;
  const y = Math.random() * 70 + 10;

  popup.style.left = `${x}vw`;
  popup.style.top = `${y}vh`;

  enableDrag(popup);
  container.appendChild(popup);

  // Pop-up verschwindet nach 3 Sekunden
  setTimeout(() => popup.remove(), 3000);
}

// alle 500ms erscheint ein neues Fenster
setInterval(spawnPopup, 500);


// DRAG & DROP (Maus + Handy)
function enableDrag(element) {
  let offsetX = 0;
  let offsetY = 0;
  let isDragging = false;

  // --- MOUSE ---
  element.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - element.offsetLeft;
    offsetY = e.clientY - element.offsetTop;
    element.style.cursor = "grabbing";
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    element.style.left = `${e.clientX - offsetX}px`;
    element.style.top = `${e.clientY - offsetY}px`;
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
    element.style.cursor = "grab";
  });

  // --- TOUCH (für Handy) ---
  element.addEventListener('touchstart', (e) => {
    isDragging = true;
    const touch = e.touches[0];
    offsetX = touch.clientX - element.offsetLeft;
    offsetY = touch.clientY - element.offsetTop;
  });

  document.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    element.style.left = `${touch.clientX - offsetX}px`;
    element.style.top = `${touch.clientY - offsetY}px`;
  });

  document.addEventListener('touchend', () => {
    isDragging = false;
  });
}
