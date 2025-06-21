/**
 * Simple theme utilities using CSS classes
 */
export const theme = {
  /**
   * Get current theme
   */
  get: (): "light" | "dark" => {
    if (typeof window === "undefined") return "light";
    return document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
  },

  /**
   * Set theme
   */
  set: (theme: "light" | "dark" | "system"): void => {
    if (typeof window === "undefined") return;

    const root = document.documentElement;

    // Remove existing theme classes
    root.classList.remove("dark", "light");

    if (theme === "system") {
      // Let CSS media query handle it
      localStorage.removeItem("theme");
    } else {
      // Add specific theme class
      root.classList.add(theme);
      localStorage.setItem("theme", theme);
    }
  },

  /**
   * Toggle between light and dark
   */
  toggle: (): void => {
    const current = theme.get();
    theme.set(current === "dark" ? "light" : "dark");
  },

  /**
   * Initialize theme on page load
   */
  init: (): void => {
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem("theme") as "light" | "dark" | null;

    if (stored) {
      theme.set(stored);
    } else {
      // Use system preference
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      theme.set(prefersDark ? "dark" : "light");
    }

    // Listen for system theme changes
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        if (!localStorage.getItem("theme")) {
          theme.set(e.matches ? "dark" : "light");
        }
      });
  },
};
