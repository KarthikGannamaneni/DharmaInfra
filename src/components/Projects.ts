// ===================================
// Projects Component
// ===================================

import { projects, getProjectById } from '../data/projects';
import type { ProjectData } from '../types';
import { $, delegate } from '../utils/dom';
import { icons } from '../utils/icons';

function ProjectCard(project: ProjectData): string {
  return `
    <div class="project-card glass liquid">
      <div class="project-image">
        <img src="${project.image}" alt="${project.title}" />
        <div class="project-overlay">
          <a href="#" class="project-link glass glass-pill" data-project="${project.id}">View Project</a>
        </div>
      </div>
      <div class="project-info">
        <span class="project-category">${project.location}</span>
        <h3 class="project-title">${project.title}</h3>
        <p class="project-details">${project.units} • ${project.size} • ${project.year}</p>
      </div>
    </div>
  `;
}

export function Projects(): string {
  return `
    <section id="projects" class="projects section">
      <div class="container">
        <div class="section-header">
          <div class="section-label">Projects</div>
          <h2 class="section-title">Landmark Developments</h2>
          <p class="section-subtitle">
            Explore our collection of award-winning residential and commercial projects 
            that have redefined urban living.
          </p>
        </div>
        
        <div class="projects-grid">
          ${projects.map(ProjectCard).join('')}
        </div>

        <div class="projects-cta">
          <a href="#contact" class="btn btn-primary glass glass-pill">
            <span>Discuss Your Land</span>
          </a>
        </div>
      </div>
    </section>

    <!-- Project Modal -->
    <div id="project-modal" class="modal">
      <div class="modal-content glass liquid">
        <button class="modal-close" id="modal-close" aria-label="Close modal">
          ${icons.close}
        </button>
        <div class="modal-body" id="modal-body"></div>
      </div>
    </div>
  `;
}

export function initProjects(): void {
  const modal = $('#project-modal');
  const modalBody = $('#modal-body');
  const modalClose = $('#modal-close');

  // Open modal
  const projectsSection = $('#projects');
  if (projectsSection) {
    delegate(projectsSection, '.project-link', 'click', (e, target) => {
      e.preventDefault();
      const projectId = target.dataset.project;
      if (projectId) {
        openModal(projectId);
      }
    });
  }

  // Close modal
  modalClose?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  function openModal(projectId: string): void {
    const project = getProjectById(projectId);
    if (!project || !modalBody || !modal) return;

    modalBody.innerHTML = `
      <img src="${project.image.replace('w=600', 'w=900')}" alt="${project.title}" class="modal-project-image" />
      <div class="modal-project-content">
        <h2>${project.title}</h2>
        <div class="modal-project-meta">
          <span>${project.category.charAt(0).toUpperCase() + project.category.slice(1)}</span>
          <span>${project.location}</span>
          <span>${project.size}</span>
          <span>${project.year}</span>
        </div>
        <p>${project.description}</p>
        <p><strong>Project Highlights:</strong> ${project.units}</p>
        <div class="modal-project-features">
          <h3>Key Features</h3>
          <ul>
            ${project.features.map(f => `<li>${f}</li>`).join('')}
          </ul>
        </div>
      </div>
    `;

    modal.classList.add('active');
    document.body.classList.add('no-scroll');
  }

  function closeModal(): void {
    modal?.classList.remove('active');
    document.body.classList.remove('no-scroll');
  }

  // Escape key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}
