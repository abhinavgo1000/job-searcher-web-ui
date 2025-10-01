
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
    baseDirectory: import.meta.dirname, // Or specify your base directory
});

const eslintConfig = [
    ...compat.config({
        extends: ['next'],
        settings: {
            next: {
                rootDir: './', // Adjust if Next.js isn't in your root directory
            },
        },
    }),
    {
        // Add custom rules or override existing ones here
        rules: {
            'indent': ['error', 4],
            'quotes': ['error', 'single']
        }
    },
];

export default eslintConfig;
