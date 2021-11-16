module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        'spin-slow': 'wiggle 20s linear infinite',
      },
      keyframes: {
        wiggle: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      },


      height: {
        192: '192px',
        260: '260px',
      },
      width: {
        192: '192px',
        260: '260px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
