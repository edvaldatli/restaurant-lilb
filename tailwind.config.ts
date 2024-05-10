import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "request-green": "rgb(62, 96, 83)",
        "request-orange": "rgb(193, 103, 87)",
        "request-red": "rgb(186, 35, 41)"
      },
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'] // Ensure 'Roboto' is the name used in your font import
      }
    },
  },
  plugins: [],
};
export default config;
