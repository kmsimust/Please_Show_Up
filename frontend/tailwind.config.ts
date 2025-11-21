import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './app/**/*.css',
  ],
  prefix: 'tw-', // Prefix all Tailwind utilities with 'tw-' to avoid Bootstrap conflicts
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        'primary-dark': 'var(--primary-dark)',
        'primary-text': 'var(--primary-text)',
        'primary-faded': 'var(--primary-faded)',
        body: 'var(--body)',
        'body-light': 'var(--body-light)',
        'body-alt': 'var(--body-alt)',
        'body-dark': 'var(--body-dark)',
        'body-darker': 'var(--body-darker)',
        'body-outline': 'var(--body-outline)',
        text: 'var(--text)',
        muted: 'var(--muted)',
        faded: 'var(--faded)',
        error: 'var(--error)',
        'error-text': 'var(--error-text)',
        danger: 'var(--danger)',
        'danger-dark': 'var(--danger-dark)',
        'danger-text': 'var(--danger-text)',
        warning: 'var(--warning)',
        'warning-dark': 'var(--warning-dark)',
        'warning-text': 'var(--warning-text)',
        success: 'var(--success)',
        secondary: 'var(--secondary)',
        'secondary-dark': 'var(--secondary-dark)',
      },
    },
  },
  plugins: [],
} as Config

