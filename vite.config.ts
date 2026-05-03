import { sveltekit } from '@sveltejs/kit/vite';
import { enhancedImages } from '@sveltejs/enhanced-img'; // Adicione esta linha
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit(),
		enhancedImages()
	]
});
