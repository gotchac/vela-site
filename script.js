/* ==========================================================================
   VELA — Site Script
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ---------- Navigation scroll effect ----------
  const nav = document.querySelector('.nav');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // ---------- Mobile menu toggle ----------
  const toggle = document.querySelector('.nav-mobile-toggle');
  const mobileMenu = document.querySelector('.nav-mobile-menu');

  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      toggle.classList.toggle('active');
    });

    // Close mobile menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        toggle.classList.remove('active');
      });
    });
  }

  // ---------- Smooth scroll for anchor links ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 72; // nav height
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ---------- Fade-in on scroll ----------
  const fadeElements = document.querySelectorAll('.fade-in');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  fadeElements.forEach(el => observer.observe(el));

  // ---------- Form submission (placeholder) ----------
  const form = document.querySelector('#quote-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Collect form data
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);
      
      // Show success message
      const submitBtn = form.querySelector('.form-submit');
      submitBtn.innerHTML = `
        <div style="padding: 20px; background: #ECFDF5; border-radius: 8px; color: #065F46; font-weight: 600;">
          ✓ Demande envoyée ! Nous vous recontactons sous 24h.
        </div>
      `;
      
      // In production, this would send to Tally or an API
      console.log('Form submitted:', data);
    });
  }

  // ---------- Active nav link highlighting ----------
  const sections = document.querySelectorAll('section[id]');
  
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
      link.style.color = '';
      if (link.getAttribute('href') === '#' + current) {
        link.style.color = 'var(--color-accent)';
      }
    });
  });

});
