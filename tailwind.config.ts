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
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
  daisyui: {
    themes: [
      {
        light: {
          "primary": "hsl(221.2 83.2% 53.3%)",
          "secondary": "hsl(215.4 16.3% 46.9%)",
          "accent": "hsl(210 40% 96%)",
          "neutral": "hsl(215.4 16.3% 46.9%)",
          "base-100": "hsl(0 0% 100%)",
          "base-200": "hsl(210 40% 96%)",
          "base-300": "hsl(214.3 31.8% 91.4%)",
          "base-content": "hsl(222.2 84% 4.9%)",
        },
        dark: {
          "primary": "hsl(217.2 91.2% 59.8%)",
          "secondary": "hsl(215 20.2% 65.1%)",
          "accent": "hsl(217.2 32.6% 17.5%)",
          "neutral": "hsl(215 20.2% 65.1%)",
          "base-100": "hsl(222.2 84% 4.9%)",
          "base-200": "hsl(217.2 32.6% 17.5%)",
          "base-300": "hsl(214.3 31.8% 91.4%)",
          "base-content": "hsl(210 40% 98%)",
        },
      },
    ],
  },
};

export default config; 