/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        rainbow:
          "linear-gradient(45deg, #ff0000, #ff8c00, #ff0, #008000, #00f, #4b0082, #8a2be2)",
      }),
    },
  },
  plugins: [],
};
