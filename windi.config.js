import { defineConfig } from 'windicss/helpers';

export default defineConfig({
  attributify: true,
  important: 'body',
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        danger: 'var(--color-danger)',
        info: 'var(--color-info)'
      },
      textColor: {
        base: 'var(--color-text-base)',
        light: 'var(--color-text-light)',
        lighter: 'var(--color-text-lighter)',
        placeholder: 'var(--color-text-placeholder)'
      },
      borderColor: {
        base: 'var(--border-color-base)',
        light: 'var(--border-color-light)',
        lighter: 'var(--border-color-lighter)'
      },
      backgroundColor: {
        base: 'var(--background-color-base)'
      }
    }
  }
});
