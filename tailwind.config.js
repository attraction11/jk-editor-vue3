module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        headerThemeButtonBg: '#1e6fff',
        headerThemeButtonHoverBg: '#175ceb',
        headerIconHoverBg: '#f3f5f7',
        headerButtonBg: '#f3f5f7',
        headerButtonHoverBg: '#e9ebed'
      },
      width: {
        26: '108px'
      }
    }
  },
  plugins: []
}
