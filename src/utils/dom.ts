// ===================================
// DOM Utilities
// ===================================

/**
 * Creates an HTML element from a string template
 */
export function createElement(html: string): HTMLElement {
  const template = document.createElement('template');
  template.innerHTML = html.trim();
  return template.content.firstElementChild as HTMLElement;
}

/**
 * Query selector with type safety
 */
export function $(selector: string, parent: Document | HTMLElement = document): HTMLElement | null {
  return parent.querySelector(selector);
}

/**
 * Query selector all with type safety
 */
export function $$(selector: string, parent: Document | HTMLElement = document): NodeListOf<HTMLElement> {
  return parent.querySelectorAll(selector);
}

/**
 * Add event listener with type safety
 */
export function on<K extends keyof HTMLElementEventMap>(
  element: HTMLElement | null,
  event: K,
  handler: (e: HTMLElementEventMap[K]) => void
): void {
  element?.addEventListener(event, handler);
}

/**
 * Delegate event handling
 */
export function delegate(
  parent: HTMLElement,
  selector: string,
  event: string,
  handler: (e: Event, target: HTMLElement) => void
): void {
  parent.addEventListener(event, (e: Event) => {
    const target = (e.target as HTMLElement).closest(selector) as HTMLElement;
    if (target) {
      handler(e, target);
    }
  });
}

/**
 * Animate counter from 0 to target
 */
export function animateCounter(element: HTMLElement, target: number, duration: number = 2000): void {
  let current = 0;
  const increment = target / (duration / 16);
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target.toString();
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current).toString();
    }
  }, 16);
}

/**
 * Intersection Observer for scroll animations
 */
export function observeElements(
  elements: NodeListOf<HTMLElement> | HTMLElement[],
  callback: (entry: IntersectionObserverEntry) => void,
  options: IntersectionObserverInit = {}
): IntersectionObserver {
  const defaultOptions: IntersectionObserverInit = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    ...options
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        callback(entry);
      }
    });
  }, defaultOptions);
  
  elements.forEach(el => observer.observe(el));
  return observer;
}

