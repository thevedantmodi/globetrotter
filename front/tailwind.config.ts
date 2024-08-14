import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    'node_modules/daisyui/dist/**/*.js',
    'node_modules/react-daisyui/dist/**/*.js',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        'light': {
          'primary': '#6b7a99',
          'primary-focus': '#e8ecef',
          'primary-content': '#ffffff',
          'secondary': '#7997a8',
          'secondary-focus': '#d7dee4',
          'secondary-content': '#ffffff',
          'accent': '#c8e4ff',
          'accent-focus': '#9fb5ca',
          'accent-content': '#ffffff',
          'neutral': '#3b424e',
          'neutral-focus': '#2a2e37',
          'neutral-content': '#ffffff',
          'base-100': '#ffffff',
          'base-200': '#f9fafb',
          'base-300': '#ced3d9',
          'base-content': '#1e2734',
          'info': '#1c92f2',
          'success': '#009485',
          'warning': '#ff9900',
          'error': '#ff5724',
          '--rounded-box': '1rem',
          '--rounded-btn': '.5rem',
          '--rounded-badge': '1.9rem',
          '--animation-btn': '.25s', '--animation-input': '.2s',
          '--btn-text-case': 'uppercase', '--navbar-padding': '.5rem',
          '--border-btn': '1px',
        },
        'dark': {
          'primary': '#4a637a',           // Darker shade of the primary color
          'primary-focus': '#324b5e',     // Focused state for primary
          'primary-content': '#e5e8ea',   // Content color for primary elements
          'secondary': '#617a8a',         // Darker shade of the secondary color
          'secondary-focus': '#4b6575',   // Focused state for secondary
          'secondary-content': '#e5e8ea', // Content color for secondary elements
          'accent': '#4b7c99',            // Darker, more muted accent color
          'accent-focus': '#34627a',      // Focused state for accent
          'accent-content': '#e5e8ea',    // Content color for accent elements
          'neutral': '#232830',           // Dark neutral background
          'neutral-focus': '#1b1f24',     // Even darker focus for neutral
          'neutral-content': '#e5e8ea',   // Light content color against dark neutral
          'base-100': '#181a1f',          // Dark base color
          'base-200': '#20232a',          // Slightly lighter base color
          'base-300': '#2c2f36',          // Lighter yet still dark base color
          'base-content': '#c7ccd1',      // Light content color for text and icons
          'info': '#2094f3',              // Slightly muted info color
          'success': '#00a293',           // Slightly darker success color
          'warning': '#ff8c00',           // Muted, darker warning color
          'error': '#ff4d2e',             // Darker error color
        }
      }
    ]
  }
} satisfies Config

export default config