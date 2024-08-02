import type { Config } from 'tailwindcss'
const defaultTheme = require('tailwindcss/defaultTheme');

const config: Config = {
  mode: 'jit',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      sans: ['"Manrope"', ...defaultTheme.fontFamily.sans]
    }
  }
}

export default config

