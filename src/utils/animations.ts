// ===================================
// Scroll Animations
// ===================================

import { $$, observeElements } from './dom';

export function initScrollAnimations(): void {
  const elements = $$(
    '.section-header, .hero-panel, .hero-visual, .projects-filter, .project-card, .testimonials-slider, .testimonial-content, .contact-grid > *, .footer-grid > *'
  );
  
  elements.forEach(el => {
    el.classList.add('animate-on-scroll');
  });
  
  observeElements(elements, (entry) => {
    entry.target.classList.add('animated');
  });
}

