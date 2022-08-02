const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	content: [
		'./resources/views/**/*.blade.php',
		'./resources/js/**/*.{js,jsx,ts,tsx,vue}',
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Nunito', ...defaultTheme.fontFamily.sans],
			}
		},
	},
	safelist: [
		'font-bold'
	],
	plugins: [],
}