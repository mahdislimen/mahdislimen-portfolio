/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        // Surfaces: deep navy → charcoal
        night: {
          DEFAULT: '#060A14', // page background
          900: '#0A1020',     // section band
          800: '#0E1629',     // card
          700: '#141E36',     // raised card / hover
          600: '#1C2847',     // input / chip
        },
        line: 'rgba(148, 163, 184, 0.14)',
        'line-strong': 'rgba(148, 163, 184, 0.28)',
        // Text
        fg: '#E7ECF6',
        muted: '#9AA7BD',
        faint: '#7A879F', // ≥ 5:1 on night / night-800 (WCAG AA for small text)
        // Accents
        electric: { DEFAULT: '#4C8DFF', soft: 'rgba(76, 141, 255, 0.12)', 300: '#8DB6FF' },
        violet: { DEFAULT: '#8B6CFF', soft: 'rgba(139, 108, 255, 0.12)', 300: '#B9A6FF' },
        signal: { DEFAULT: '#2DD4BF', soft: 'rgba(45, 212, 191, 0.12)' }, // "deterministic / live" accent, used sparingly
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      maxWidth: { prose: '65ch', shell: '72rem' },
      borderRadius: { '2xl': '1rem', '3xl': '1.5rem' },
      boxShadow: {
        card: '0 1px 0 0 rgba(255,255,255,0.04) inset, 0 20px 40px -24px rgba(0,0,0,0.6)',
        glow: '0 0 0 1px rgba(76,141,255,0.35), 0 10px 40px -12px rgba(76,141,255,0.35)',
      },
    },
  },
  plugins: [],
}
