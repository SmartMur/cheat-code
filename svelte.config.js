import autoAdapter from '@sveltejs/adapter-auto';
import netlifyAdapter from '@sveltejs/adapter-netlify';
import vercelAdapter from '@sveltejs/adapter-vercel';
import nodeAdapter from '@sveltejs/adapter-node';

import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const multiAdapter = (adapters) => {
  return {
    async adapt(argument) {
      await Promise.all(
        adapters.map((item) =>
          Promise.resolve(item).then((resolved) => resolved.adapt(argument))
        )
      );
    },
  };
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: multiAdapter([
      autoAdapter(),
      netlifyAdapter(),
      vercelAdapter({ runtime: 'nodejs22.x' }),
      nodeAdapter(),
    ]),
    alias: {
      '$/*': 'src/*',
    },
  },
};

export default config;
