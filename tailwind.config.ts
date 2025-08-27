import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      borderRadius: { xl: "1rem", "2xl": "1.25rem" },
      colors: {
        bg: "var(--bg)",
        text: "var(--text)",
        muted: "var(--muted)",
        card: "var(--card)",
        border: "var(--border)",
        primary: "var(--primary)",
        "primary-600": "var(--primary-600)",
        "primary-300": "var(--primary-300)",
        accent: "var(--accent)",
        success: "var(--success)",
        warning: "var(--warning)",
        error: "var(--error)"
      },
      boxShadow: { premium: "var(--shadow-color)" }
    }
  },
  plugins: []
};
export default config;
