// src/lib/stores/theme.ts
import { writable } from "svelte/store";
import { browser } from "$app/environment";

type Override = boolean | null; // null => follow system
type Resolved = "light" | "dark";

function systemIsDark(): boolean {
  if (!browser) return false;
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
}

function resolve(override: Override): Resolved {
  const dark = override === null ? systemIsDark() : override;
  return dark ? "dark" : "light";
}

function applyResolved(resolved: Resolved) {
  if (!browser) return;
  const root = document.documentElement;
  root.classList.toggle("dark", resolved === "dark");
  root.style.colorScheme = resolved;
}

function createThemeStore() {
  const { subscribe, set, update } = writable<Override>(null);

  // Keep UI in sync with OS while in "system" mode
  if (browser) {
    applyResolved(resolve(null));

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      // Only react to OS changes if override is still null
      let current: Override = null;
      const unsub = subscribe((v) => (current = v));
      unsub();
      if (current === null) applyResolved(resolve(null));
    };

    mq.addEventListener?.("change", onChange);
  }

  return {
    subscribe,

    /** Session-only: toggles between light/dark.
     * If no override yet (null), it toggles opposite of current system.
     */
    toggle: () => {
      update((ovr) => {
        const currentResolved = resolve(ovr);
        const nextOverride = currentResolved === "dark" ? false : true;
        applyResolved(resolve(nextOverride));
        return nextOverride;
      });
    },

    /** Optional: go back to system-following in this session */
    resetToSystem: () => {
      set(null);
      applyResolved(resolve(null));
    },

    /** If you need it in code: get current resolved mode */
    getResolved: (): Resolved => resolve(null) // used only if you really need it elsewhere
  };
}

export const themeOverride = createThemeStore();