// ===================================
// Testimonials Component
// ===================================

import { testimonials } from '../data/testimonials';
import type { TestimonialData } from '../types';
import { $, on } from '../utils/dom';
import { icons } from '../utils/icons';

function TestimonialCard(testimonial: TestimonialData): string {
  return `
    <div class="testimonial-card">
      <div class="testimonial-content glass liquid">
        <div class="testimonial-quote">"</div>
        <p>"${testimonial.content}"</p>
      </div>
      <div class="testimonial-author">
        <div class="author-avatar glass glass-chip">${testimonial.authorInitials}</div>
        <div class="author-info">
          <h4>${testimonial.authorName}</h4>
          <p>${testimonial.authorLocation}</p>
        </div>
      </div>
    </div>
  `;
}

export function Testimonials(): string {
  return `
    <section id="testimonials" class="testimonials section">
      <div class="container">
        <div class="section-header">
          <div class="section-label">Testimonials</div>
          <h2 class="section-title">What Landowners Say</h2>
        </div>

        <div class="testimonials-slider glass liquid">
          <div class="testimonials-track" id="testimonials-track">
            ${testimonials.map(TestimonialCard).join('')}
          </div>

          <div class="testimonials-nav">
            <button class="testimonial-btn prev glass glass-icon" id="testimonial-prev" aria-label="Previous testimonial">
              ${icons.arrowLeft}
            </button>
            <div class="testimonials-dots" id="testimonials-dots"></div>
            <button class="testimonial-btn next glass glass-icon" id="testimonial-next" aria-label="Next testimonial">
              ${icons.arrow}
            </button>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function initTestimonials(): void {
  const track = $('#testimonials-track');
  const dotsContainer = $('#testimonials-dots');
  const prevBtn = $('#testimonial-prev');
  const nextBtn = $('#testimonial-next');
  
  const total = testimonials.length;
  let current = 0;

  // Create dots
  for (let i = 0; i < total; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goTo(i));
    dotsContainer?.appendChild(dot);
  }

  function update(): void {
    if (track) {
      track.style.transform = `translateX(-${current * 100}%)`;
    }
    
    const dots = dotsContainer?.querySelectorAll('.dot');
    dots?.forEach((dot, i) => {
      dot.classList.toggle('active', i === current);
    });
  }

  function goTo(index: number): void {
    current = index;
    update();
  }

  function next(): void {
    current = (current + 1) % total;
    update();
  }

  function prev(): void {
    current = (current - 1 + total) % total;
    update();
  }

  on(nextBtn, 'click', next);
  on(prevBtn, 'click', prev);

  // Auto-slide
  setInterval(next, 6000);
}
