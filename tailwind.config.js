/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,jsx,ts,tsx}",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#6366F1",
                primaryDark: "#4F46E5",

                secondary: "#8B5CF6",

                background: "#F8FAFC",

                card: "#FFFFFF",

                textPrimary: "#0F172A",

                textSecondary: "#64748B",

                border: "#E2E8F0",
            },
        },
    },
    plugins: [],
};