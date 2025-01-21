import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: 'index.html',
			precompress: false
		}),
		alias: {
			$services: 'src/services',
			'@': 'src',
			'~/static': 'static',
			'~/firebase.json': 'firebase.json',
			'~/tailwind.theme.json': 'tailwind.theme.json'
		}
	},
	preprocess: [
		preprocess({
			postcss: true
		})
	],
	vitePlugin: {
		experimental: {
			inspector: {
				// change shortcut
				toggleKeyCombo: 'meta-shift',
				// hold and release key to toggle inspector mode
				holdMode: true,
				// show or hide the inspector option
				showToggleButton: 'never'
				// inspector position
				// toggleButtonPos: 'bottom-left',
			}
		}
	}
};

export default config;
