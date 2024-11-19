import { Empty } from "antd"

/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                "purple-900": "#7338AC",
                "gray-900": "#636363",
                "red-900": "#E70C0C",
                "green-900": "#0ABF49",
                "blue-600": "#635AD9",
                "green-600": "#90C049",
                "red-500": "#ED4337",
            },
        },
    },
    plugins: [],
}
