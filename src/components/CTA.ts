// ===================================
// CTA Component
// ===================================

import { icons } from '../utils/icons';

export function CTA(): string {
  return `
    <section class="cta section">
      <div class="cta-bg"></div>
      <div class="container">
        <div class="cta-content">
          <h2>Have Land to Develop?</h2>
          <p>
            Let's discuss how we can transform your property into a landmark development 
            while maximizing your returns.
          </p>
          <div class="cta-buttons">
            <a href="#contact" class="btn btn-light">
              <span>Schedule a Consultation</span>
              ${icons.arrow}
            </a>
            <a href="tel:+919876543210" class="btn btn-outline-light">
              ${icons.phone}
              <span>+91 98765 43210</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  `;
}

