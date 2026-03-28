/* ============================================================
   SHAMAL KHALID NP — Premium Portfolio JavaScript
   Vanilla JS — No jQuery dependency (security improvement)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ── Navbar Scroll Effect ──
  const navbar = document.querySelector('.navbar');
  const handleNavScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  };
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // ── Mobile Nav Toggle ──
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    // Close mobile nav when link clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (navLinks.classList.contains('open') &&
          !navLinks.contains(e.target) &&
          !navToggle.contains(e.target)) {
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // ── Active Nav Link on Scroll ──
  const sections = document.querySelectorAll('section[id]');
  const navLinkItems = document.querySelectorAll('.nav-links a[href^="#"]');

  const activateNavLink = () => {
    const scrollY = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const link = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (link) {
        if (scrollY >= top && scrollY < top + height) {
          navLinkItems.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        }
      }
    });
  };
  window.addEventListener('scroll', activateNavLink, { passive: true });

  // ── Typing Effect ──
  const typingElement = document.getElementById('typingText');
  if (typingElement) {
    const roles = [
      'Web Developer',
      'IT Auditor',
      'Frontend Specialist',
      'Freelancer'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    const type = () => {
      const current = roles[roleIndex];
      if (isDeleting) {
        typingElement.textContent = current.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        typingElement.textContent = current.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
      }

      if (!isDeleting && charIndex === current.length) {
        typingSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 500;
      }

      setTimeout(type, typingSpeed);
    };
    setTimeout(type, 1000);
  }

  // ── Stats Counter Animation ──
  const counters = document.querySelectorAll('[data-count]');
  let countAnimated = false;

  const animateCounters = () => {
    if (countAnimated) return;
    const statsSection = document.querySelector('.stats-bar');
    if (!statsSection) return;

    const rect = statsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      countAnimated = true;
      counters.forEach(counter => {
        const target = parseInt(counter.dataset.count, 10);
        const suffix = counter.dataset.suffix || '';
        const duration = 2000;
        const start = performance.now();

        const update = (timestamp) => {
          const elapsed = timestamp - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          counter.textContent = Math.floor(target * eased) + suffix;
          if (progress < 1) requestAnimationFrame(update);
        };
        requestAnimationFrame(update);
      });
    }
  };
  window.addEventListener('scroll', animateCounters, { passive: true });

  // ── Skill Bar Animation ──
  const skillFills = document.querySelectorAll('.skill-fill');
  let skillsAnimated = false;

  const animateSkills = () => {
    if (skillsAnimated) return;
    const skillsSection = document.getElementById('skills');
    if (!skillsSection) return;

    const rect = skillsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.8) {
      skillsAnimated = true;
      skillFills.forEach(fill => {
        const width = fill.dataset.width;
        setTimeout(() => {
          fill.style.width = width;
        }, 200);
      });
    }
  };
  window.addEventListener('scroll', animateSkills, { passive: true });

  // ── Scroll Reveal Animation ──
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ── Back to Top Button ──
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ── Smooth Scroll for Anchor Links ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ── Contact Form with Client-side Validation & Honeypot ──
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Honeypot check
      const honeypot = contactForm.querySelector('[name="_gotcha"]');
      if (honeypot && honeypot.value) {
        console.warn('Bot submission blocked');
        return;
      }

      const name = contactForm.querySelector('[name="name"]');
      const email = contactForm.querySelector('[name="email"]');
      const message = contactForm.querySelector('[name="message"]');
      const statusEl = document.getElementById('formStatus');
      const submitBtn = contactForm.querySelector('button[type="submit"]');

      // Input sanitization
      const sanitize = (str) => {
        const div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
      };

      // Validation
      const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (!name.value.trim() || name.value.trim().length < 2) {
        showStatus(statusEl, 'Please enter a valid name.', 'error');
        name.focus();
        return;
      }
      if (!emailRegex.test(email.value.trim())) {
        showStatus(statusEl, 'Please enter a valid email address.', 'error');
        email.focus();
        return;
      }
      if (!message.value.trim() || message.value.trim().length < 10) {
        showStatus(statusEl, 'Message should be at least 10 characters.', 'error');
        message.focus();
        return;
      }

      // Rate limiting (simple client-side)
      const now = Date.now();
      const lastSubmit = parseInt(sessionStorage.getItem('lastFormSubmit') || '0', 10);
      if (now - lastSubmit < 30000) {
        showStatus(statusEl, 'Please wait 30 seconds between submissions.', 'error');
        return;
      }

      // Submit
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      try {
        const formData = new FormData();
        formData.append('name', sanitize(name.value.trim()));
        formData.append('email', sanitize(email.value.trim()));
        formData.append('message', sanitize(message.value.trim()));

        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          showStatus(statusEl, 'Message sent successfully! I\'ll get back to you soon.', 'success');
          contactForm.reset();
          sessionStorage.setItem('lastFormSubmit', now.toString());
        } else {
          throw new Error('Network response was not ok');
        }
      } catch (err) {
        showStatus(statusEl, 'Something went wrong. Please try again later.', 'error');
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="ti-email"></i> Send Message';
      }
    });
  }

  function showStatus(el, msg, type) {
    if (!el) return;
    el.textContent = msg;
    el.className = 'form-status ' + type;
    el.style.display = 'block';
    setTimeout(() => {
      el.style.display = 'none';
    }, 6000);
  }

  // ── Keyboard accessibility: Escape to close mobile nav ──
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks && navLinks.classList.contains('open')) {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
});
