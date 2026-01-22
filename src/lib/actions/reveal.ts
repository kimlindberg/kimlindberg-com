// src/lib/actions/reveal.ts
type RevealParams = {
  delay?: number;     // ms
  duration?: number;  // ms
  y?: number;         // px
};

export function reveal(node: HTMLElement, params: RevealParams = {}) {
  const delay = params.delay ?? 0;
  const duration = params.duration ?? 450;
  const y = params.y ?? 6;

  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  if (reduce) return;

  node.style.opacity = "0";
  node.style.transform = `translateY(${y}px)`;
  node.style.willChange = "opacity, transform";

  const t = window.setTimeout(() => {
    node.style.transition = `opacity ${duration}ms ease, transform ${duration}ms ease`;
    node.style.opacity = "1";
    node.style.transform = "translateY(0)";
  }, delay);

  return {
    destroy() {
      window.clearTimeout(t);
    }
  };
}