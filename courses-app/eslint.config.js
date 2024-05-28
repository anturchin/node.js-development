import prettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
	{
		ignores: ['node_modules/**'],
	},
	{
		files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
		},
		plugins: {
			prettier: prettierPlugin,
		},
		rules: {
			'prettier/prettier': [
				'error',
				{
					singleQuote: true,
					trailingComma: 'all',
					useTabs: true,
					semi: true,
					bracketSpacing: true,
					printWidth: 100,
					endOfLine: 'auto',
				},
			],
			'no-console': 'off',
			'no-unused-vars': 'warn',
		},
	},
	prettier,
];
