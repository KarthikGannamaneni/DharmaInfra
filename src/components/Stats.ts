// ===================================
// Stats Component
// ===================================

import { stats } from '../data/stats';
import { icons } from '../utils/icons';
import { $$, observeElements, animateCounter } from '../utils/dom';

const statIcons: Record<string, string> = {
  projects: icons.projects,
  sqft: icons.area,
  landowners: icons.people,
  years: icons.clock,
  awards: icons.star,
  delivery: icons.check
};

export function Stats(): string {
  const statCards = stats.map(stat => `
    <div class="stat-card">
      <div class="stat-icon">${statIcons[stat.id]}</div>
      <div class="stat-value">
        <span data-count="${stat.value}">0</span>${stat.suffix || ''}
      </div>
      <div class="stat-label">${stat.label}</div>
    </div>
  `).join('');

  return `
    <section id="stats" class="stats section">
      <div class="stats-bg"></div>
      <div class="container">
        <div class="section-header">
          <div class="section-label">Our Impact</div>
          <h2 class="section-title">Track Record of Excellence</h2>
        </div>

        <div class="stats-grid">
          ${statCards}
        </div>
      </div>
    </section>
  `;
}

export function initStats(): void {
  const counters = $$('[data-count]');
  
  observeElements(counters, (entry) => {
    const target = entry.target as HTMLElement;
    const countTo = parseInt(target.dataset.count || '0', 10);
    animateCounter(target, countTo);
  }, { threshold: 0.5 });
}
