// ===================================
// Smooth Scroll Utility
// ===================================

import { $$, $ } from './dom';

export function initSmoothScroll(): void {
  $$('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e: Event) => {
      e.preventDefault();
      const href = (anchor as HTMLAnchorElement).getAttribute('href');
      
      if (href) {
        const target = $(href);
        if (target) {
          const offsetTop = target.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }
    });
  });
}

