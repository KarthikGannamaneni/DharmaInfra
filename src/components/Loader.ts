// ===================================
// Loader Component
// ===================================

export function Loader(): string {
  return `
    <div id="loader" class="loader">
      <div class="loader-content">
        <div class="loader-logo">DI</div>
        <div class="loader-bar"><div class="loader-progress"></div></div>
      </div>
    </div>
  `;
}

export function initLoader(): void {
  const loader = document.getElementById('loader');
  
  setTimeout(() => {
    loader?.classList.add('hidden');
    document.body.classList.remove('no-scroll');
  }, 2200);
}

