// tailwind.config.js
import scrollbarHide from 'tailwind-scrollbar-hide';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        '3d-illustration': "url('path/to/3d-illustration.png')",
      },
    },
  },
  plugins: [
    scrollbarHide,
  ],
};
