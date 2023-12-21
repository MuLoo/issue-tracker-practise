import type { Config } from 'tailwindcss'

const config: Config = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}'
	],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
				'gradient-card-bg': 'linear-gradient(145deg, #ff6b6b, #d43636);'
			},
			boxShadow: {
				'custom-shadow': '2px 3px 3px #ba2f2f,2px 3px 3px #ff4949;'
			}
		}
	},
	plugins: [
		require('@tailwindcss/typography') // 可以为 HTML 提供精美的排版默认设置，比如从markdown渲染而来的html
	]
}
export default config
