const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        text: "#f6f5f8",
        "text-2": "#9e9e9e",
        background: "#0c0912",
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
