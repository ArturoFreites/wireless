/** @type {import('eslint').Linter.Config} */
module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json'
    },
    plugins: ['@typescript-eslint', 'import'],
    extends: [
        'next',
        'next/core-web-vitals',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript'
    ],
    rules: {
        // ✅ Previene errores por diferencias de mayúsculas/minúsculas (sensible en Linux y Vercel)
        'import/no-unresolved': 'error',
        'import/no-extraneous-dependencies': 'error',
        'import/no-duplicates': 'error',
        'import/no-named-as-default': 'off', // útil con Next.js
        // Opcional: fuerza orden alfabético
        'import/order': ['warn', { 'alphabetize': { order: 'asc' } }]
    },
    settings: {
        'import/resolver': {
            typescript: {
                project: './tsconfig.json'
            }
        }
    }
}
