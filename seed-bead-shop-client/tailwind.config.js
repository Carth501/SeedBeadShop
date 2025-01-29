/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
	theme: {
	  	extend: {
			colors: {
				'blue': '#1fb6ff',
				'gray': '#8492a6',
			},
			fontFamily: {
				sans: ['Graphik', 'sans-serif'],
				serif: ['Merriweather', 'serif'],
			},
			spacing: {
			'8xl': '96rem',
			'9xl': '128rem',
			},
			borderRadius: {
			'4xl': '2rem',
			},
	  	}
	},
  }