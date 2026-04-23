const loadingScreen = document.querySelector(".loading-screen");
const rotatingRole = document.getElementById("rotating-role");
const revealItems = document.querySelectorAll(".reveal");
const counterItems = document.querySelectorAll("[data-counter]");
const magneticItems = document.querySelectorAll(".magnetic");
const copyButtons = [
  document.getElementById("copy-discord"),
  document.getElementById("copy-discord-inline"),
].filter(Boolean);
const heroVisual = document.querySelector(".hero-visual");
const scrollProgress = document.querySelector(".scroll-progress");
const cursorGlow = document.querySelector(".cursor-glow");
const tiltCards = document.querySelectorAll(".tilt-card");

const roles = [
  "AI Security Analyst",
  "Agentic AI Builder",
  "Threat Detection Explorer",
  "Future Security Engineer",
];

let roleIndex = 0;

function hideLoader() {
  loadingScreen?.classList.add("is-hidden");
  setTimeout(() => loadingScreen?.remove(), 900);
}

if (document.readyState !== "loading") {
  setTimeout(hideLoader, 1200);
} else {
  document.addEventListener("DOMContentLoaded", () => {
    setTimeout(hideLoader, 1200);
  });
}

window.addEventListener("load", () => {
  setTimeout(hideLoader, 1400);
});

function typeRoles() {
  if (!rotatingRole) return;

  const nextRole = roles[roleIndex];
  let charIndex = 0;
  rotatingRole.textContent = "";

  const typing = setInterval(() => {
    rotatingRole.textContent = nextRole.slice(0, charIndex + 1);
    charIndex += 1;

    if (charIndex === nextRole.length) {
      clearInterval(typing);
      setTimeout(() => {
        const deleting = setInterval(() => {
          rotatingRole.textContent = nextRole.slice(0, Math.max(0, charIndex - 1));
          charIndex -= 1;
          if (charIndex === 0) {
            clearInterval(deleting);
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(typeRoles, 220);
          }
        }, 28);
      }, 1300);
    }
  }, 58);
}

typeRoles();

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const target = Number(entry.target.dataset.counter || 0);
      let current = 0;
      const increment = Math.max(1, Math.ceil(target / 50));

      const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(counter);
        }
        entry.target.textContent = current;
      }, 32);

      counterObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.4 }
);

counterItems.forEach((item) => counterObserver.observe(item));

magneticItems.forEach((item) => {
  item.addEventListener("mousemove", (event) => {
    const rect = item.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    item.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`;
  });

  item.addEventListener("mouseleave", () => {
    item.style.transform = "translate(0, 0)";
  });
});

copyButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText("sonu070102");
      const originalText = button.textContent;
      button.textContent = "Discord copied: sonu070102";
      setTimeout(() => {
        button.textContent = originalText;
      }, 1800);
    } catch (error) {
      button.textContent = "Copy failed - sonu070102";
    }
  });
});

document.addEventListener("mousemove", (event) => {
  const x = `${(event.clientX / window.innerWidth) * 100}%`;
  const y = `${(event.clientY / window.innerHeight) * 100}%`;
  document.documentElement.style.setProperty("--x", x);
  document.documentElement.style.setProperty("--y", y);

  if (heroVisual) {
    const offsetX = (event.clientX / window.innerWidth - 0.5) * 18;
    const offsetY = (event.clientY / window.innerHeight - 0.5) * 18;
    heroVisual.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
  }

  if (cursorGlow && window.innerWidth > 900) {
    cursorGlow.style.opacity = "1";
  }
});

window.addEventListener("scroll", () => {
  const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = documentHeight > 0 ? (window.scrollY / documentHeight) * 100 : 0;
  scrollProgress?.style.setProperty("--scroll-width", `${scrolled}%`);
});

tiltCards.forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * -10;
    const rotateY = ((x / rect.width) - 0.5) * 10;
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
  });
});

const canvas = document.getElementById("network-canvas");
const context = canvas?.getContext("2d");
const particleCount = 72;
const particles = [];
const pointer = { x: null, y: null };

function resizeCanvas() {
  if (!canvas || !context) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createParticles() {
  if (!canvas) return;
  particles.length = 0;

  for (let index = 0; index < particleCount; index += 1) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 1.8 + 0.8,
    });
  }
}

function drawNetwork() {
  if (!canvas || !context) return;

  context.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle, index) => {
    particle.x += particle.vx;
    particle.y += particle.vy;

    if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
    if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

    context.beginPath();
    context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    context.fillStyle = "rgba(77, 183, 255, 0.75)";
    context.fill();

    for (let nextIndex = index + 1; nextIndex < particles.length; nextIndex += 1) {
      const other = particles[nextIndex];
      const dx = particle.x - other.x;
      const dy = particle.y - other.y;
      const distance = Math.hypot(dx, dy);

      if (distance < 130) {
        context.beginPath();
        context.moveTo(particle.x, particle.y);
        context.lineTo(other.x, other.y);
        context.strokeStyle = `rgba(77, 183, 255, ${0.1 - distance / 1500})`;
        context.stroke();
      }
    }

    if (pointer.x !== null && pointer.y !== null) {
      const pointerDistance = Math.hypot(pointer.x - particle.x, pointer.y - particle.y);

      if (pointerDistance < 160) {
        context.beginPath();
        context.moveTo(pointer.x, pointer.y);
        context.lineTo(particle.x, particle.y);
        context.strokeStyle = `rgba(55, 226, 199, ${0.18 - pointerDistance / 1200})`;
        context.stroke();
      }
    }
  });

  requestAnimationFrame(drawNetwork);
}

window.addEventListener("mousemove", (event) => {
  pointer.x = event.clientX;
  pointer.y = event.clientY;
});

window.addEventListener("resize", () => {
  resizeCanvas();
  createParticles();
});

resizeCanvas();
createParticles();
drawNetwork();
