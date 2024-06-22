import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        luxtix: {
          1: "#1B1A17",
          2: "#F0A500",
          3: "#E45826",
          4: "#E6D5B8",
          5: "#986B2D",
          6: "#E5BF67",
          7: "#CCC8C3",
        },
      },
    },
  },
  plugins: [],
};
export default config;
