import type {Config} from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {},
    plugins: [
        require('daisyui'),
        require('@tailwindcss/typography'),
    ],
    safelist: [
        'prose','h-full', 'h-max', 'textarea', 'textarea-bordered', 'bg-white',
        'w-max', 'w-full', 'h-2/3','object-cover', 'container', 'flex'
    ],
    daisyui: {
        themes: [
            "light",
            "dark",
            "cupcake",
            "bumblebee",
            "emerald",
            "corporate",
            "synthwave",
            "retro",
            "cyberpunk",
            "valentine",
            "halloween",
            "garden",
            "forest",
            "aqua",
            "lofi",
            "pastel",
            "fantasy",
            "wireframe",
            "black",
            "luxury",
            "dracula",
            "cmyk",
            "autumn",
            "business",
            "acid",
            "lemonade",
            "night",
            "coffee",
            "winter",
            "dim",
            "nord",
            "sunset",
        ],
    },
} satisfies Config;
