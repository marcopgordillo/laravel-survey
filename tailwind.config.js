const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
    "./resources/**/*.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Nunito', ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        'fade-in-down': {
          'from': {
            transform: 'translateY(-0.75rem)',
            opacity: 0,
          },
          'to': {
            transform: 'translateY(0)',
            opacity: 1,
          },
        },
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.2s ease-in-out both'
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
