// ===================================
// GauthamAdda - Main Entry Point
// ===================================

import './style.css';

// Components
import {
  Loader,
  initLoader,
  Navbar,
  initNavbar,
  Hero,
  Projects,
  initProjects,
  Testimonials,
  initTestimonials,
  Contact,
  initContact,
  Footer,
  initFooter,
  Toast
} from './components';

// Utilities
import { initSmoothScroll } from './utils/smoothScroll';
import { initScrollAnimations } from './utils/animations';
import { initLiquidGlass } from './utils/liquidGlass';

// ===================================
// App Renderer
// ===================================

function App(): string {
  return `
    ${Loader()}
    ${Navbar()}
    <main>
      ${Hero()}
      ${Projects()}
      ${Testimonials()}
      ${Contact()}
    </main>
    ${Footer()}
    ${Toast()}
  `;
}

// ===================================
// Initialize Application
// ===================================

function init(): void {
  // Add loading state
  document.body.classList.add('no-scroll');
  
  // Render app
  const app = document.getElementById('app');
  if (app) {
    app.innerHTML = App();
  }
  
  // Initialize all components
  initLoader();
  initNavbar();
  initProjects();
  initTestimonials();
  initContact();
  initFooter();
  
  // Initialize utilities
  initSmoothScroll();
  initScrollAnimations();
  initLiquidGlass();
}

// Start the app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
