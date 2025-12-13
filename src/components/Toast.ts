// ===================================
// Toast Component
// ===================================

import { icons } from '../utils/icons';
import { $ } from '../utils/dom';

export function Toast(): string {
  return `
    <div id="toast" class="toast glass liquid">
      <div class="toast-content">
        ${icons.check}
        <span id="toast-message">Message sent successfully!</span>
      </div>
    </div>
  `;
}

export function showToast(message: string): void {
  const toast = $('#toast');
  const toastMessage = $('#toast-message');
  
  if (toastMessage) {
    toastMessage.textContent = message;
  }
  
  toast?.classList.add('active');
  
  setTimeout(() => {
    toast?.classList.remove('active');
  }, 4000);
}

