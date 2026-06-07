const nomes = [
  "Kuro","Vex","Zeno","Neo","Dark","Rex","Kira","Blade",
  "Zero","Ghost","Frost","Void","Drako","Lynx","Axe",
  "Reaper","Skull","Venom","Storm","Shadow","War","Titan",
  "Rage","Death","Blaze","Inferno","Night","Demon","Hawk",
  "Cyber","Pixel","Byte","Nano","Matrix","Glitch","Data",
  "Alpha","Omega","Sigma","Quantum","Circuit","Core","Node",
  "ProX","Aim","Clutch","Kill","Rush","Entry","Frag",
  "Ace","Elite","Legend","Master","Rank","Skill","Win"
];

const simbolos = [
  "乂","x","丨","么","//","†","X",
  "•","×","✦","✧","☯","⛧","𓆩","𓆪"
];

// ======================
// GERADOR DE NICK
// ======================

function gerarNick() {
  let n1 = nomes[Math.floor(Math.random() * nomes.length)];
  let n2 = nomes[Math.floor(Math.random() * nomes.length)];

  while (n1 === n2) {
    n2 = nomes[Math.floor(Math.random() * nomes.length)];
  }

  const s = simbolos[Math.floor(Math.random() * simbolos.length)];
  const num = Math.floor(Math.random() * 99);

  const nick = `${s}${n1}${n2}${num}`;

  const el = document.getElementById("nick");

  if (el) {
    el.value = nick;

    el.classList.remove("glitch");
    void el.offsetWidth;
    el.classList.add("glitch");
  }
}

function copiarNick() {
  const el = document.getElementById("nick");

  if (!el) return;

  navigator.clipboard.writeText(el.value);

  alert("Copiado: " + el.value);
}

// ======================
// LOADING SCREEN
// ======================

window.addEventListener("load", () => {
  setTimeout(() => {
    const screen = document.getElementById("loading-screen");

    if (screen) {
      screen.style.display = "none";
    }
  }, 2500);
});

// ======================
// PARTICULAS
// ======================

const particlesCanvas = document.getElementById("particles");

if (particlesCanvas) {

  const pctx = particlesCanvas.getContext("2d");

  function resizeParticles() {
    particlesCanvas.width = window.innerWidth;
    particlesCanvas.height = window.innerHeight;
  }

  resizeParticles();

  const particles = [];

  class Particle {

    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * particlesCanvas.width;
      this.y = Math.random() * particlesCanvas.height;
      this.size = Math.random() * 1.5 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.2;
      this.speedY = (Math.random() - 0.5) * 0.2;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
    }

    draw() {
      pctx.fillStyle = "rgba(255,255,255,0.25)";
      pctx.beginPath();
      pctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      pctx.fill();
    }
  }

  for (let i = 0; i < 80; i++) {
    particles.push(new Particle());
  }

  function animateParticles() {

    pctx.clearRect(
      0,
      0,
      particlesCanvas.width,
      particlesCanvas.height
    );

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(
      animateParticles
    );
  }

  animateParticles();

  window.addEventListener("resize", resizeParticles);
}

// ======================
// BURACO NEGRO GARGANTUA
// ======================

window.addEventListener("load", () => {

  const bg = document.getElementById("bg");

  if (!bg) return;

  const ctx = bg.getContext("2d");

  function resize() {
    bg.width = window.innerWidth;
    bg.height = window.innerHeight;
  }

  resize();
  window.addEventListener("resize", resize);

  const stars = [];

  for (let i = 0; i < 500; i++) {
    stars.push({
      x: Math.random() * bg.width,
      y: Math.random() * bg.height,
      px: 0,
      py: 0,
      size: Math.random() * 2 + 0.3
    });
  }

  let diskAngle = 0;

  function animateBlackHole() {

    ctx.clearRect(
      0,
      0,
      bg.width,
      bg.height
    );

    const cx = bg.width / 2;
    const cy = bg.height / 2;

    stars.forEach(star => {

      star.px = star.x;
      star.py = star.y;

      const dx = cx - star.x;
      const dy = cy - star.y;

      const dist = Math.sqrt(
        dx * dx + dy * dy
      );

      const gravity =
        Math.max(
          0.003,
          180 / (dist * dist)
        );

      star.x += dx * gravity;
      star.y += dy * gravity;

      ctx.strokeStyle =
        "#a855f7";
      ctx.lineWidth = 1;

      ctx.beginPath();
      ctx.moveTo(star.px, star.py);
      ctx.lineTo(star.x, star.y);
      ctx.stroke();

      const colors = [
  "#ffffff",
  "#22d3ee",
  "#a855f7",
  "#60a5fa"
];

ctx.fillStyle =
  colors[Math.floor(Math.random() * colors.length)];
      ctx.beginPath();
      ctx.arc(
        star.x,
        star.y,
        star.size,
        0,
        Math.PI * 2
      );
      ctx.fill();

      if (dist < 40) {

        const side =
          Math.floor(
            Math.random() * 4
          );

        if (side === 0) {
          star.x = Math.random() * bg.width;
          star.y = -20;
        } else if (side === 1) {
          star.x = bg.width + 20;
          star.y = Math.random() * bg.height;
        } else if (side === 2) {
          star.x = Math.random() * bg.width;
          star.y = bg.height + 20;
        } else {
          star.x = -20;
          star.y = Math.random() * bg.height;
        }
      }
    });

    // halo

    const glow =
      ctx.createRadialGradient(
        cx,
        cy,
        60,
        cx,
        cy,
        260
      );

    glow.addColorStop(
      0,
      "rgba(168,85,247,0.25)"
    );

    glow.addColorStop(
      1,
      "rgba(34,211,238,0)"
    );

    ctx.fillStyle = glow;

    ctx.beginPath();
    ctx.arc(
      cx,
      cy,
      260,
      0,
      Math.PI * 2
    );
    ctx.fill();

    // disco de acreção

    ctx.save();

    ctx.translate(cx, cy);
    ctx.rotate(diskAngle);

    ctx.strokeStyle =
      "rgba(255,255,255,0.95)";
    ctx.lineWidth = 14;

    ctx.beginPath();
    ctx.ellipse(
      0,
      0,
      220,
      70,
      0,
      0,
      Math.PI * 2
    );
    ctx.stroke();

    ctx.restore();

    diskAngle += 0.002;

    // centro

    ctx.fillStyle = "#000";

    ctx.beginPath();
    ctx.arc(
      cx,
      cy,
      110,
      0,
      Math.PI * 2
    );
    ctx.fill();

    requestAnimationFrame(
      animateBlackHole
    );
  }

  animateBlackHole();
});