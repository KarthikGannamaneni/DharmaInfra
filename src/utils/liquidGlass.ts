// ===================================
// Liquid Glass Effects
// ===================================

import { $$ } from './dom';

type InitOptions = {
  selector?: string;
  maxTiltDeg?: number;
};

/**
 * Adds cursor-following "glare" and subtle 3D tilt to elements with the `glass` class.
 * Uses CSS variables:
 * - --gx / --gy (0..1): glare position within element
 * - --rx / --ry (deg): tilt rotations
 */
export function initLiquidGlass(options: InitOptions = {}): void {
  const selector = options.selector ?? '.glass';
  const maxTiltDeg = options.maxTiltDeg ?? 7;

  const elements = Array.from($$(selector));
  if (elements.length === 0) return;

  const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;

  elements.forEach((el) => {
    // init defaults
    el.style.setProperty('--gx', '0.5');
    el.style.setProperty('--gy', '0.5');
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');

    if (prefersReducedMotion) return;

    const onMove = (e: PointerEvent): void => {
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      const clampedX = Math.max(0, Math.min(1, x));
      const clampedY = Math.max(0, Math.min(1, y));

      el.style.setProperty('--gx', clampedX.toFixed(4));
      el.style.setProperty('--gy', clampedY.toFixed(4));

      const tiltX = (0.5 - clampedY) * (maxTiltDeg * 2);
      const tiltY = (clampedX - 0.5) * (maxTiltDeg * 2);

      el.style.setProperty('--rx', `${tiltX.toFixed(2)}deg`);
      el.style.setProperty('--ry', `${tiltY.toFixed(2)}deg`);
    };

    const onLeave = (): void => {
      el.style.setProperty('--gx', '0.5');
      el.style.setProperty('--gy', '0.5');
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
    };

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
  });
}


