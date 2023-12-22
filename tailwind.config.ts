import type { Config } from "tailwindcss";
let colors = require("tailwindcss/colors");

delete colors["lightBlue"];
delete colors["warmGray"];
delete colors["trueGray"];
delete colors["coolGray"];
delete colors["blueGray"];

colors = { ...colors, ...{ transparent: "transparent" } };

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ...colors,
        white: "#f5f5f5",
        primary: "#0095f6",
        gray26: "#262626",
        grayActive: "#1a1a1a",
        grayF14: "#ffffff14",
        grayA8: "#a8a8a8",
        gray1A: "#1a1a1acc",
      },
      spacing: {
        nav: "244px",
        mbNav: "72px",
        ten: "10px",
        content: "975px",
        post: "768px",
        maxPost: "1152px",
      },
      fontFamily: {
        poppins: ["var(--font-poppins)"],
        satisfy: ["var(--font-satisfy)"],
      },
    },
    fontSize: {
      ten: "10px",
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
    },
  },
  plugins: [require("tailwindcss-animated")],
};
export default config;
