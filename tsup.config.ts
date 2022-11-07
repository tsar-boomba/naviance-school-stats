import { defineConfig } from 'tsup';

export default defineConfig((opts) => ({
	entry: ['./src/sw.ts'],
	platform: 'browser',
	outDir: 'dist',
	format: 'esm',
	bundle: true,
	minify: !opts.watch,
	clean: false,
	dts: false,
	splitting: false,
}));
