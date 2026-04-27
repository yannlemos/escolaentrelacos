import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    // Replace the default adapter with adapter-static
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: '404.html', // Recommended for Single Page App behavior
      precompress: false,
      strict: true
    }),
    paths: {
      // Set to your repo name if not a custom domain or root site
      base: process.env.NODE_ENV === 'production' ? '/yannlemos' : '',
    }
  }
};

export default config;
