// ===================================
// About Component
// ===================================

import { icons } from '../utils/icons';

export function About(): string {
  return `
    <section id="about" class="about section">
      <div class="container">
        <div class="about-grid">
          <div class="about-images">
            <div class="about-img-main">
              <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=800&fit=crop" alt="Modern building exterior" />
            </div>
            <div class="about-img-secondary">
              <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=500&fit=crop" alt="Luxury apartment interior" />
            </div>
            <div class="about-experience">
              <span class="exp-number">25</span>
              <span class="exp-text">Years of Excellence</span>
            </div>
          </div>
          <div class="about-content">
            <div class="section-label">About Us</div>
            <h2 class="section-title">Building Dreams, Creating Value</h2>
            <p class="about-text">
              At GauthamAdda, we don't just construct buildings – we craft communities and create enduring value. 
              With over two decades of experience in transforming prime land into prestigious developments, 
              we've become the preferred partner for discerning landowners.
            </p>
            <p class="about-text">
              Our approach combines architectural innovation, sustainable practices, and meticulous attention 
              to detail. We handle everything from conceptualization to completion, ensuring landowners 
              receive maximum returns while preserving their legacy.
            </p>
            <div class="about-features">
              <div class="feature">
                <div class="feature-icon">${icons.shield}</div>
                <div class="feature-content">
                  <h4>Trusted Partnership</h4>
                  <p>Transparent agreements with landowner-first approach</p>
                </div>
              </div>
              <div class="feature">
                <div class="feature-icon">${icons.clock}</div>
                <div class="feature-content">
                  <h4>On-Time Delivery</h4>
                  <p>98% projects delivered within committed timeline</p>
                </div>
              </div>
              <div class="feature">
                <div class="feature-icon">${icons.layers}</div>
                <div class="feature-content">
                  <h4>Premium Quality</h4>
                  <p>World-class materials and construction standards</p>
                </div>
              </div>
            </div>
            <a href="#contact" class="btn btn-primary">
              <span>Learn More About Us</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  `;
}

