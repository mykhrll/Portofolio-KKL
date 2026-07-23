/* ============================================
   PORTOFOLIO KKL — KELOMPOK 1 PTI 24B
   Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollReveal();
  initTabs();
  initSmoothScroll();
  initParallax();
  initTypedText();
});

/* ---------- Navbar ---------- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navOverlay = document.querySelector('.nav-overlay');
  const links = document.querySelectorAll('.nav-link');

  // Scroll effect
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  });

  // Active link highlight
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 100;

    sections.forEach(section => {
      const top = section.offsetTop - 100;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const link = document.querySelector(`.nav-link[href="#${id}"]`);
      
      if (link) {
        if (scrollY >= top && scrollY < top + height) {
          links.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        }
      }
    });
  });

  // Mobile toggle
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('open');
      if (navOverlay) navOverlay.classList.toggle('show');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });
  }

  // Close mobile menu on link click
  links.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
      if (navOverlay) navOverlay.classList.remove('show');
      document.body.style.overflow = '';
    });
  });

  // Close on overlay click
  if (navOverlay) {
    navOverlay.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
      navOverlay.classList.remove('show');
      document.body.style.overflow = '';
    });
  }
}

/* ---------- Scroll Reveal ---------- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

/* ---------- Tabs ---------- */
function initTabs() {
  const tabs = document.querySelectorAll('.tugas-tab');
  const contents = document.querySelectorAll('.tugas-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      document.getElementById(target).classList.add('active');
    });
  });
}

/* ---------- Smooth Scroll ---------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/* ---------- Parallax ---------- */
function initParallax() {
  const heroBg = document.querySelector('.hero-bg img');
  
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const rate = scrolled * 0.3;
      heroBg.style.transform = `translateY(${rate}px) scale(1.1)`;
    });
  }
}

/* ---------- Typed Text Animation ---------- */
function initTypedText() {
  const element = document.getElementById('typed-text');
  if (!element) return;

  const words = ['Bromo', 'Petualangan', 'Eksplorasi', 'Industri'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let currentText = '';

  function type() {
    const word = words[wordIndex];

    if (isDeleting) {
      currentText = word.substring(0, charIndex - 1);
      charIndex--;
    } else {
      currentText = word.substring(0, charIndex + 1);
      charIndex++;
    }

    element.textContent = currentText;

    let typeSpeed = isDeleting ? 60 : 120;

    if (!isDeleting && charIndex === word.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 400;
    }

    setTimeout(type, typeSpeed);
  }

  setTimeout(type, 1000);
}

/* ---------- Counter Animation ---------- */
function animateCounters() {
  const counters = document.querySelectorAll('.counter');
  
  counters.forEach(counter => {
    const target = parseInt(counter.dataset.target);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const update = () => {
      current += step;
      if (current < target) {
        counter.textContent = Math.floor(current);
        requestAnimationFrame(update);
      } else {
        counter.textContent = target;
      }
    };

    update();
  });
}
