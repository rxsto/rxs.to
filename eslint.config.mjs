import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist/**', 'node_modules/**', '.wrangler/**', '.compare/**', '.next/**', 'components/arc/**'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['app/**', 'components/**'],
    rules: {
      'no-restricted-imports': ['error', { patterns: [
        { group: ['**/shared/cv/*'], message: 'Import the CV through shared/cv (its index).' },
        { group: ['**/tools/**'], message: 'tools/ is Node-only.' },
      ] }],
    },
  },
);
