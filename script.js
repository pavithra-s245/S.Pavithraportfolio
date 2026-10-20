/**
 * S. PAVITHRA - PERSONAL PORTFOLIO JAVASCRIPT
 * Modern, clean, beginner-friendly JavaScript for interactive features
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ===================================================
     1. MOBILE MENU TOGGLE (HAMBURGER DRAWER)
     =================================================== */
  const navToggle = document.getElementById('nav-toggle');
  const navClose = document.getElementById('nav-close');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Open mobile menu
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.add('show-menu');
    });
  }

  // Close mobile menu
  if (navClose && navMenu) {
    navClose.addEventListener('click', () => {
      navMenu.classList.remove('show-menu');
    });
  }

  // Close mobile menu when any nav link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu) {
        navMenu.classList.remove('show-menu');
      }
    });
  });


  /* ===================================================
     2. STICKY NAVBAR BACKGROUND & BACK TO TOP ON SCROLL
     =================================================== */
  const navbar = document.getElementById('navbar');
  const backToTopBtn = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    // Add shadow to navbar when scrolled past 50px
    if (navbar) {
      if (scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Show or hide "Back to Top" button
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }

    // Update active link in navigation based on current section
    highlightActiveNavLink();
  });


  /* ===================================================
     3. BACK TO TOP BUTTON CLICK
     =================================================== */
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }


  /* ===================================================
     4. ACTIVE LINK HIGHLIGHTING AS USER SCROLLS
     =================================================== */
  const sections = document.querySelectorAll('section[id]');

  function highlightActiveNavLink() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    sections.forEach(currentSection => {
      const sectionHeight = currentSection.offsetHeight;
      const sectionTop = currentSection.offsetTop - 120;
      const sectionId = currentSection.getAttribute('id');
      const targetNavLink = document.querySelector(`.nav-menu a[href*='${sectionId}']`);

      if (targetNavLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          targetNavLink.classList.add('active');
        } else {
          targetNavLink.classList.remove('active');
        }
      }
    });
  }


  /* ===================================================
     5. PRINT OR DOWNLOAD RESUME AS PDF
     =================================================== */
  const downloadResumeBtn = document.getElementById('download-resume-btn');

  if (downloadResumeBtn) {
    downloadResumeBtn.addEventListener('click', () => {
      // Trigger the browser's native print dialog
      // In all modern browsers (Chrome, Edge, Firefox), users can choose "Save as PDF"
      window.print();
    });
  }


  /* ===================================================
     6. TOAST NOTIFICATION UTILITY
     =================================================== */
  const toastBox = document.getElementById('toastNotification');
  const toastTitle = document.getElementById('toastTitle');
  const toastBody = document.getElementById('toastBody');
  let toastTimer;

  function showToast(title, message) {
    if (!toastBox) return;

    if (toastTitle) toastTitle.textContent = title;
    if (toastBody) toastBody.textContent = message;

    toastBox.classList.add('show');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastBox.classList.remove('show');
    }, 4500);
  }


  /* ===================================================
     7. CONTACT FORM VALIDATION & MAILTO TRIGGER
     =================================================== */
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault(); // Stop default page refresh

      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const subjectInput = document.getElementById('subject');
      const messageInput = document.getElementById('message');

      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim()) {
        showFieldError(nameInput, true);
        isValid = false;
      } else {
        showFieldError(nameInput, false);
      }

      // Validate Email (Basic Email regex)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
        showFieldError(emailInput, true);
        isValid = false;
      } else {
        showFieldError(emailInput, false);
      }

      // Validate Subject
      if (!subjectInput.value.trim()) {
        showFieldError(subjectInput, true);
        isValid = false;
      } else {
        showFieldError(subjectInput, false);
      }

      // Validate Message
      if (!messageInput.value.trim()) {
        showFieldError(messageInput, true);
        isValid = false;
      } else {
        showFieldError(messageInput, false);
      }

      // If all fields are valid
      if (isValid) {
        const senderName = encodeURIComponent(nameInput.value.trim());
        const senderEmail = encodeURIComponent(emailInput.value.trim());
        const mailSubject = encodeURIComponent(subjectInput.value.trim());
        const mailBody = encodeURIComponent(
          `Hello Pavithra,\n\nName: ${nameInput.value.trim()}\nEmail: ${emailInput.value.trim()}\n\nMessage:\n${messageInput.value.trim()}`
        );

        // Notify user with toast
        showToast('Opening Email Client...', 'Redirecting to your email app so you can send the message directly to S. Pavithra');

        // Build mailto link
        const mailtoUri = `mailto:pavithra.s22062007@gmail.com?subject=${mailSubject}&body=${mailBody}`;

        // Delay slightly for smooth user experience then open email client
        setTimeout(() => {
          window.location.href = mailtoUri;
          contactForm.reset();
        }, 1200);
      }
    });
  }

  // Helper to show/hide input error styling
  function showFieldError(inputElement, hasError) {
    const parentField = inputElement.closest('.form-field');
    if (parentField) {
      if (hasError) {
        parentField.classList.add('has-error');
      } else {
        parentField.classList.remove('has-error');
      }
    }
  }


  /* ===================================================
     8. AUTO-UPDATE COPYRIGHT YEAR IN FOOTER
     =================================================== */
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }


  /* ===================================================
     9. THEME TOGGLE (DARK / LIGHT MODE)
     =================================================== */
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  if (savedTheme === 'light') {
    if (themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
  }
  updateCanvasVisibility();

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      if (themeIcon) {
        if (next === 'dark') {
          themeIcon.classList.replace('fa-sun', 'fa-moon');
        } else {
          themeIcon.classList.replace('fa-moon', 'fa-sun');
        }
      }
      updateCanvasVisibility();
    });
  }

  function updateCanvasVisibility() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    canvas.style.opacity = isDark ? '0.18' : '0';
  }


  /* ===================================================
     10. PARTICLE CANVAS BACKGROUND
     =================================================== */
  (function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const PARTICLE_COUNT = 40;
    const CONNECT_DIST = 140;
    const particles = [];

    const colors = ['#8b5cf6', '#7c3aed', '#a78bfa', '#c084fc', '#9333ea'];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 1.1,
        vy: (Math.random() - 0.5) * 1.1,
        r: 2,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(139,92,246,${1 - dist / CONNECT_DIST})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    }
    animate();
  })();


  /* ===================================================
     11. SCROLL FADE-UP INTERSECTION OBSERVER
     =================================================== */
  const fadeEls = document.querySelectorAll('.skill-group-card, .project-card, .cert-card, .achieve-card, .design-card, .uiux-card, .strength-card');
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(el => {
      if (el.isIntersecting) {
        el.target.classList.add('in-view');
        fadeObserver.unobserve(el.target);
      }
    });
  }, { threshold: 0.1 });
  fadeEls.forEach(el => { el.classList.add('fade-up'); fadeObserver.observe(el); });

});
