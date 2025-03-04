const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        text: "#f6f5f8",
        background: "#0c0912",
        primary: "#523f79",
        secondary: "#807be4",
        accent: "#FFB433",
        "accent-2": "#FFA700",
      },
    },
  },
  plugins: [],
});
