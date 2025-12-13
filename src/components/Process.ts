// ===================================
// Process Component
// ===================================

import type { ProcessStep } from '../types';

const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Initial Consultation',
    description: 'We assess your land\'s potential, discuss your goals, and present preliminary development concepts.'
  },
  {
    number: '02',
    title: 'Feasibility Study',
    description: 'Comprehensive analysis of regulations, market demand, and financial projections for your property.'
  },
  {
    number: '03',
    title: 'Agreement & Design',
    description: 'Transparent agreement signing followed by detailed architectural and engineering design.'
  },
  {
    number: '04',
    title: 'Approvals & Permits',
    description: 'We handle all regulatory approvals, ensuring compliance with local building codes and regulations.'
  },
  {
    number: '05',
    title: 'Construction',
    description: 'Quality-focused construction with regular updates and site visits for complete transparency.'
  },
  {
    number: '06',
    title: 'Handover & Returns',
    description: 'Project completion, possession handover, and realization of your returns as agreed.'
  }
];

function ProcessStepCard(step: ProcessStep): string {
  return `
    <div class="process-step">
      <div class="step-number">${step.number}</div>
      <div class="step-content">
        <h3>${step.title}</h3>
        <p>${step.description}</p>
      </div>
    </div>
  `;
}

export function Process(): string {
  return `
    <section id="process" class="process section">
      <div class="container">
        <div class="section-header">
          <div class="section-label">How We Work</div>
          <h2 class="section-title">Our Development Process</h2>
          <p class="section-subtitle">
            A transparent, collaborative approach that keeps landowners informed at every stage
          </p>
        </div>

        <div class="process-timeline">
          ${processSteps.map(ProcessStepCard).join('')}
        </div>
      </div>
    </section>
  `;
}

