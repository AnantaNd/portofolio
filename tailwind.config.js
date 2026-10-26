const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./storybook/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        text: "#F3F4F6",
        "text-2": "#9CA3AF",
        background: "#030014", // Deep void / event horizon black
        primary: "#4F46E5", // Deep cosmic violet
        secondary: "#8B5CF6", // Nebula purple
        tenary: "#06B6D4", // Cosmic cyan photon
        accent: "#F97316", // Accretion disk incandescent orange
        "accent-2": "#F59E0B", // Supernova gold
        void: "#050212",
        "event-horizon": "#0c051f",
      },
      keyframes: {
        "black-hole-pulse": {
          "0%, 100%": { transform: "scale(1) rotate(0deg)", opacity: "0.85" },
          "50%": { transform: "scale(1.05) rotate(180deg)", opacity: "1" },
        },
        "star-twinkle": {
          "0%, 100%": { opacity: "0.2" },
          "50%": { opacity: "0.9" },
        },
      },
      animation: {
        "black-hole": "black-hole-pulse 24s ease-in-out infinite",
        "star-twinkle": "star-twinkle 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
});
