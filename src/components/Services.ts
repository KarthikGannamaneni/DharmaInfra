// ===================================
// Services Component
// ===================================

import { services } from '../data/services';
import { icons } from '../utils/icons';

const serviceIcons: Record<string, string> = {
  residential: icons.building,
  commercial: icons.office,
  mixed: icons.mixed,
  joint: icons.document
};

export function Services(): string {
  const serviceCards = services.map(service => `
    <div class="service-card">
      <div class="service-number">${service.number}</div>
      <div class="service-icon">${serviceIcons[service.id]}</div>
      <h3 class="service-title">${service.title}</h3>
      <p class="service-desc">${service.description}</p>
      <ul class="service-features">
        ${service.features.map(f => `<li>${f}</li>`).join('')}
      </ul>
    </div>
  `).join('');

  return `
    <section id="services" class="services section">
      <div class="container">
        <div class="section-header">
          <div class="section-label">What We Offer</div>
          <h2 class="section-title">Our Services</h2>
          <p class="section-subtitle">
            Comprehensive development solutions from concept to completion
          </p>
        </div>

        <div class="services-grid">
          ${serviceCards}
        </div>
      </div>
    </section>
  `;
}
