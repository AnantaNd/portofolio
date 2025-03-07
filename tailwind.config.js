const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  // content: ["./src/**/*.{js,jsx,ts,tsx}"],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./storybook/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        text: "#ffffff",
        "text-2": "#b0b0b0",
        background: "#141221",
        primary: "#523f79",
        secondary: "#807be4",
        tenary: "#01A9F4",
        accent: "#FFB433",
        "accent-2": "#FFA700",
      },
      keyframes: {
        "glass-break": {
          "0%": { transform: "scale(1)", opacity: 1 },
          "100%": { transform: "scale(0.9)", opacity: 0 },
        },
      },
      animation: {
        "glass-break": "glass-break 0.5s ease-out forwards",
      },
    },
  },
  plugins: [],
});
