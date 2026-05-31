const PASSWORD = '14081994';
const music = document.getElementById('bgMusic');
const lockScreen = document.getElementById('lockScreen');
const site = document.getElementById('site');
const input = document.getElementById('passwordInput');
const unlockBtn = document.getElementById('unlockBtn');
const lockError = document.getElementById('lockError');
const musicToggle = document.getElementById('musicToggle');
const confettiBtn = document.getElementById('confettiBtn');
const finalBtn = document.getElementById('finalBtn');
const typewriter = document.getElementById('typewriter');
const daysTogether = document.getElementById('daysTogether');
const hoursTogether = document.getElementById('hoursTogether');
const minutesTogether = document.getElementById('minutesTogether');
const secondsTogether = document.getElementById('secondsTogether');

let typeStarted = false;
let musicStarted = false;

function createStars() {
  const holder = document.getElementById('stars');
  for (let i = 0; i < 95; i++) {
    const s = document.createElement('span');
    s.className = 'star';
    s.style.left = `${Math.random() * 100}%`;
    s.style.top = `${Math.random() * 100}%`;
    s.style.animationDelay = `${Math.random() * 3}s`;
    s.style.opacity = String(Math.random() * .7 + .2);
    holder.appendChild(s);
  }
}

function createPetals() {
  const holder = document.getElementById('petals');
  const symbols = ['❤', '♡', '❦', '✦'];
  for (let i = 0; i < 38; i++) {
    const p = document.createElement('span');
    p.className = 'petal';
    p.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    p.style.left = `${Math.random() * 100}%`;
    p.style.animationDuration = `${9 + Math.random() * 11}s`;
    p.style.animationDelay = `${Math.random() * 9}s`;
    p.style.fontSize = `${12 + Math.random() * 22}px`;
    holder.appendChild(p);
  }
}

async function startMusic() {
  try {
    music.volume = 0.42;
    await music.play();
    musicStarted = true;
    musicToggle.classList.add('playing');
    musicToggle.textContent = '♫';
  } catch (err) {
    musicStarted = false;
    musicToggle.classList.remove('playing');
    musicToggle.textContent = '♪';
  }
}

function unlock() {
  if (input.value.trim() !== PASSWORD) {
    lockError.textContent = 'Şifre yanlış gibi… ipucu: Zeynep’in doğum günü, gün-ay-yıl ve boşluksuz 🎂';
    input.animate([
      { transform: 'translateX(0)' },
      { transform: 'translateX(-8px)' },
      { transform: 'translateX(8px)' },
      { transform: 'translateX(0)' }
    ], { duration: 280 });
    return;
  }
  lockError.textContent = '';
  lockScreen.style.opacity = '0';
  lockScreen.style.transform = 'scale(1.04)';
  lockScreen.style.transition = 'opacity .7s ease, transform .7s ease';
  setTimeout(() => {
    lockScreen.classList.add('hidden');
    site.classList.remove('hidden');
    document.body.style.overflowY = 'auto';
    startMusic();
    burstHearts(90);
  }, 680);
}

unlockBtn.addEventListener('click', unlock);
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') unlock();
});

musicToggle.addEventListener('click', async () => {
  if (!musicStarted || music.paused) {
    await startMusic();
  } else {
    music.pause();
    musicStarted = false;
    musicToggle.classList.remove('playing');
    musicToggle.textContent = '♪';
  }
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      if (entry.target.closest('.final-section') && !typeStarted) startTyping();
    }
  });
}, { threshold: .18 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const finalMessage = 'Seni seviyorum bebeğim. İyi ki 1 Şubat. İyi ki 1 Haziran. İyi ki doğduğun gün. İyi ki minnoşum, prensesim, sevgilim oldun. ❤';
function startTyping() {
  typeStarted = true;
  typewriter.textContent = '';
  let i = 0;
  const tick = () => {
    typewriter.textContent = finalMessage.slice(0, i++);
    if (i <= finalMessage.length) setTimeout(tick, 55);
  };
  tick();
}

finalBtn.addEventListener('click', () => {
  typeStarted = false;
  startTyping();
  burstHearts(120);
});
confettiBtn.addEventListener('click', () => burstHearts(140));

const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');
let hearts = [];
function resizeCanvas() {
  canvas.width = window.innerWidth * devicePixelRatio;
  canvas.height = window.innerHeight * devicePixelRatio;
  ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function burstHearts(count = 80) {
  for (let i = 0; i < count; i++) {
    hearts.push({
      x: window.innerWidth / 2 + (Math.random() - .5) * 140,
      y: window.innerHeight * .55 + (Math.random() - .5) * 120,
      vx: (Math.random() - .5) * 7,
      vy: -Math.random() * 9 - 2,
      size: Math.random() * 18 + 10,
      life: 1,
      hue: Math.random() > .5 ? 335 : 280,
      rot: Math.random() * Math.PI
    });
  }
}

function drawHeart(x, y, size, color, rot) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);
  ctx.scale(size / 30, size / 30);
  ctx.beginPath();
  ctx.moveTo(0, 8);
  ctx.bezierCurveTo(-26, -10, -12, -28, 0, -14);
  ctx.bezierCurveTo(12, -28, 26, -10, 0, 8);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.restore();
}

function animateHearts() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  hearts = hearts.filter(h => h.life > 0);
  hearts.forEach(h => {
    h.x += h.vx;
    h.y += h.vy;
    h.vy += .12;
    h.rot += .03;
    h.life -= .012;
    drawHeart(h.x, h.y, h.size, `hsla(${h.hue}, 95%, 72%, ${h.life})`, h.rot);
  });
  requestAnimationFrame(animateHearts);
}


function updateRelationshipCounter() {
  if (!daysTogether || !hoursTogether || !minutesTogether || !secondsTogether) return;
  const start = new Date('2026-02-01T00:00:00+03:00');
  const now = new Date();
  const diff = Math.max(0, now.getTime() - start.getTime());
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  daysTogether.textContent = days.toLocaleString('tr-TR');
  hoursTogether.textContent = hours.toLocaleString('tr-TR');
  minutesTogether.textContent = minutes.toLocaleString('tr-TR');
  secondsTogether.textContent = seconds.toString().padStart(2, '0');
}

createStars();
createPetals();
updateRelationshipCounter();
setInterval(updateRelationshipCounter, 1000);
animateHearts();
setInterval(() => {
  if (!site.classList.contains('hidden')) burstHearts(9);
}, 3200);
