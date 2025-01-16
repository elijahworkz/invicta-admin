module.exports = {
	content: [
		'./resources/views/**/*.blade.php',
		'./resources/js/**/*.{js,jsx,ts,tsx,vue}',
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Nunito'],
			}
		},
	},
	safelist: [
		'font-bold',
		{
			pattern: /w-.+/,
		}
	],
	plugins: [],
}