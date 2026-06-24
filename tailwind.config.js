/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}",
        "./features/**/*.{js,jsx,ts,tsx}",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                background: "#F8FAFC",
                card: "#FFFFFF",
                primary: "#6366F1",
                textPrimary: "#0F172A",
                textSecondary: "#64748B",
                border: "#E2E8F0",
            },
        },
    },
    plugins: [],
};