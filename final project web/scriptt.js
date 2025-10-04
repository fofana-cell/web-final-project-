  
// Section toggle for nav links
document.querySelectorAll('nav ul li a').forEach(link => {
  link.addEventListener('click', e => {
    const targetId = link.getAttribute('href');
    if (targetId.startsWith('#')) {
      e.preventDefault();
      if (targetId === '#hero') {
        // Show all sections
        document.querySelectorAll('main section').forEach(section => {
          section.classList.add('active');
        });
        // Scroll to top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // Hide all sections
        document.querySelectorAll('main section').forEach(section => {
          section.classList.remove('active');
        });
        // Show target section
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          targetSection.classList.add('active');
          // Smooth scroll to the section
          targetSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
      // close mobile menu if open
      const sidebar = document.getElementById('sidebar');
      if (sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
        document.querySelector('.menu-toggle').setAttribute('aria-expanded', 'false');
      }
    }
  });
});

// Reveal sections on scroll
const sections = document.querySelectorAll('main section');
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
sections.forEach(s => observer.observe(s));

const menuToggle = document.querySelector('.menu-toggle');
const sidebar = document.getElementById('sidebar');

menuToggle.addEventListener('click', () => {
  const opened = sidebar.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', opened);
});

 // Close mobile menu if click outside
document.addEventListener('click', e => {
  if (!sidebar.contains(e.target) && !menuToggle.contains(e.target) && sidebar.classList.contains('open')) {
    sidebar.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }
});

// Contact form submission
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    if (name && email && message) {
        // Simulate sending
        document.getElementById('form-message').textContent = 'Thank you for your message! I will get back to you soon.';
        document.getElementById('form-message').style.color = 'green';
        this.reset();
    } else {
        document.getElementById('form-message').textContent = 'Please fill in all fields.';
        document.getElementById('form-message').style.color = 'red';
    }
});

// Load on page load
document.addEventListener('DOMContentLoaded', function() {
    // No messages to load
});

// Particle background animation
const canvas = document.getElementById('hero-bg');
const ctx = canvas.getContext('2d');
let particles = [];
const particleCount = 50;

function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}

function createParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 3 + 1,
            opacity: Math.random() * 0.5 + 0.2
        });
    }
}

function updateParticles() {
    particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    });
}

function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 233, 253, ${p.opacity})`;
        ctx.fill();
    });
}

function animate() {
    updateParticles();
    drawParticles();
    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    resizeCanvas();
    createParticles();
});

resizeCanvas();
createParticles();
animate();
