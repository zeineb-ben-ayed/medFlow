import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Vos couleurs personnalisées en RGB
        'color-1': 'rgb(148, 68, 85)',
        'color-2': 'rgb(235, 221, 224)',
        'color-3': 'rgb(148, 68, 84)',
        'color-4': 'rgb(196, 151, 162)',
        'color-5': 'rgb(183, 127, 142)',
        'color-6': 'rgb(204, 164, 172)',
        'color-7': 'rgb(204, 168, 180)',
        'color-8': 'rgb(204, 156, 172)',
        'color-9': 'rgb(172, 103, 120)',
        'color-10': 'rgb(164, 94, 113)',
        'color-11': 'rgb(172, 108, 132)',
        
        // Variables pour shadcn
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;