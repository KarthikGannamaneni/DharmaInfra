// ===================================
// Hero Component - Dharma Infra
// ===================================

import { icons } from '../utils/icons';

export function Hero(): string {
  return `
    <section id="home" class="hero">
      <div class="hero-bg">
        <div class="hero-aurora"></div>
      </div>

      <div class="container">
        <div class="hero-shell">
          <div class="hero-panel glass">
            <div class="hero-badge glass glass-pill">Trusted Builders in Hyderabad</div>
            <h1 class="hero-title">
              <span class="title-line">Transform Your Land</span>
              <span class="title-highlight">Into Premium Residences</span>
            </h1>
            <p class="hero-subtitle">
              Dharma Infra specializes in developing premium residential apartments in Kukatpally, Hyderabad. 
              Partner with us to transform your land into high-quality living spaces.
            </p>

            <div class="hero-cta">
              <a href="#contact" class="btn btn-primary glass glass-pill">
                <span>Partner With Us</span>
                ${icons.arrow}
              </a>
              <a href="#projects" class="btn btn-secondary glass glass-pill">
                <span>View Projects</span>
              </a>
            </div>

            <div class="hero-stats">
              <div class="hero-stat glass glass-chip">
                <span class="stat-number">10+</span>
                <span class="stat-label">Years Experience</span>
              </div>
              <div class="hero-stat glass glass-chip">
                <span class="stat-number">25+</span>
                <span class="stat-label">Projects Delivered</span>
              </div>
              <div class="hero-stat glass glass-chip">
                <span class="stat-number">50+</span>
                <span class="stat-label">Happy Landowners</span>
              </div>
            </div>
          </div>

          <div class="hero-visual glass" aria-hidden="true">
            <div class="hero-visual-inner" style="background-image: linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.6)), url('/assets/WhatsApp Image 2025-12-13 at 1.51.44 PM.jpeg');"></div>
            <div class="hero-visual-caption">
              <span class="hero-visual-kicker">Latest Project</span>
              <span class="hero-visual-title">Dharma Heights, Kukatpally</span>
            </div>
          </div>
        </div>
      </div>

      <div class="hero-scroll">
        <a href="#projects" class="scroll-indicator glass glass-pill">
          <span>Scroll</span>
          <div class="scroll-arrow"></div>
        </a>
      </div>
    </section>
  `;
}
