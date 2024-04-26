/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      	colors: {
          	Montserrat: ['"Montserrat"', 'tahoma', 'sans-serif'],
				primary: '#45c3d2'
			}
    }
  },
  plugins: []
}
