/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./projects.html",
    "./src/**/*.{html,js,ts}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#090d16',
          card: '#111827',
          hover: '#1f293d',
          border: '#1e293b'
        },
        brand: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          400: '#38bdf8',
          500: '#06b6d4',
          600: '#0284c7',
          700: '#0369a1',
          accent: '#6366f1',
          emerald: '#10b981'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -5px rgba(6, 182, 212, 0.4)',
        'glow-indigo': '0 0 25px -5px rgba(99, 102, 241, 0.4)',
        '3d-card': '0 20px 40px -15px rgba(0, 0, 0, 0.7)'
      }
    }
  },
  plugins: []
}
