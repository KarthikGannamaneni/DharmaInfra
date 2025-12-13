// ===================================
// Navbar Component
// ===================================

import { $, $$, on } from '../utils/dom';

export function Navbar(): string {
  return `
    <nav id="navbar" class="navbar glass glass-nav">
      <div class="nav-container">
        <a href="#home" class="nav-logo">
          <span class="logo-text">Dharma</span><span class="logo-accent">Infra</span>
        </a>
        <ul class="nav-menu" id="nav-menu">
          <li><a href="#home" class="nav-link active">Home</a></li>
          <li><a href="#projects" class="nav-link">Projects</a></li>
          <li><a href="#testimonials" class="nav-link">Testimonials</a></li>
          <li><a href="#contact" class="nav-link nav-cta glass glass-pill">Partner With Us</a></li>
        </ul>
        <button class="nav-toggle" id="nav-toggle" aria-label="Toggle navigation">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  `;
}

export function initNavbar(): void {
  const navbar = $('#navbar');
  const navToggle = $('#nav-toggle');
  const navMenu = $('#nav-menu');
  const navLinks = $$('.nav-link');

  // Scroll handler
  const handleScroll = (): void => {
    if (window.scrollY > 50) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    // Active link based on section
    const sections = $$('section[id]');
    sections.forEach(section => {
      const top = section.offsetTop - 150;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (window.scrollY >= top && window.scrollY < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  // Toggle mobile menu
  const toggleMenu = (): void => {
    navToggle?.classList.toggle('active');
    navMenu?.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
  };

  // Close mobile menu
  const closeMenu = (): void => {
    navToggle?.classList.remove('active');
    navMenu?.classList.remove('active');
    document.body.classList.remove('no-scroll');
  };

  // Event listeners
  window.addEventListener('scroll', handleScroll);
  on(navToggle, 'click', toggleMenu);
  navLinks.forEach(link => on(link, 'click', closeMenu));

  // Initial check
  handleScroll();
}
