/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './src/**/*.{ js, jsx, ts, tsx, html }',
        './src/*.{ js, jsx, ts, tsx }',
        './public/*.{ html }',
        './*.{ js, jsx, ts, tsx, html }',
        'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {
            borderRadius: {
                'def': '5px'
            },
            colors: {
                'pink': '#FF5391',
                'yellow': '#FFD600',
                'purple': '#A500F2',
                'main-blue': '#6C63FF',
                'dark-blue': '#564FCC',
                'gray': '#23272A',
                'dark-gray': '#181818',
            },
            fontFamily: {
                sans: ['Montserrat', 'sans-serif'],
                serif: ['Abyssinica SIL', 'serif']
            },
            maxWidth: {
                'def': '1180px'
            },
            transitionDuration: {
                DEFAULT: '400ms',
            },
        },
    },
}