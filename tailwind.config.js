/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.jsx", "./src/**/*.js", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        Green: "#4ADE80",
        DarkGreen: "#1B9146",
        background:"#eff2f5",
        "chat-bg": "#F2EFE9",
      },
    },
  },
  plugins: [],
};
