// ===================================
// Footer Component - Dharma Infra
// ===================================

import { icons } from '../utils/icons';
import { $, on } from '../utils/dom';
import { showToast } from './Toast';

export function Footer(): string {
  return `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <a href="#home" class="footer-logo">
              <span class="logo-text">Dharma</span><span class="logo-accent">Infra</span>
            </a>
            <p>
              Building quality residences in Hyderabad. Your trusted partner for transforming 
              land into premium residential developments.
            </p>
            <p style="font-size: 0.75rem; margin-top: 12px; color: var(--muted2);">
              GSTIN: 36AATFD1098G1Z3
            </p>
          </div>

          <div class="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#testimonials">Testimonials</a></li>
              <li><a href="#contact">Partner With Us</a></li>
            </ul>
          </div>

          <div class="footer-links">
            <h4>Contact</h4>
            <ul>
              <li><a href="tel:+916281074635">+91 62810 74635</a></li>
              <li><a href="mailto:gauthamgottimukkala@gmail.com">gauthamgottimukkala@gmail.com</a></li>
              <li>Kukatpally, Hyderabad</li>
              <li>Telangana - 500072</li>
            </ul>
          </div>

          <div class="footer-newsletter">
            <h4>Stay Updated</h4>
            <p>Subscribe to our newsletter for project updates and investment opportunities.</p>
            <form id="newsletter-form" class="newsletter-form">
              <input type="email" placeholder="Enter your email" required />
              <button type="submit" aria-label="Subscribe">
                ${icons.arrow}
              </button>
            </form>
          </div>
        </div>

        <div class="footer-bottom">
          <p>&copy; ${new Date().getFullYear()} Dharma Infra. All rights reserved.</p>
          <div class="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  `;
}

export function initFooter(): void {
  const form = $('#newsletter-form') as HTMLFormElement;
  
  on(form, 'submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input') as HTMLInputElement;
    console.log('Newsletter subscription:', input.value);
    showToast('Successfully subscribed to newsletter!');
    form.reset();
  });
}
