module.exports = {
    content: [
        './src/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{ts,tsx,js,jsx,mdx}',
    ],
    theme: {
        extend: {},
    },
    plugins: [require('@tailwindcss/typography')],
};
