/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html','./src/**/*.{ts,tsx}'],
  theme: { extend: {
    colors: {
      brand: { 50:'#EEF4FF', 100:'#DCE8FF', 200:'#C2D6FF', 300:'#9DBBFF', 400:'#6E98FF', 500:'#3F76FF', 600:'#2A5EEB', 700:'#1F4AC4', 800:'#1C3E9C', 900:'#162F73' },
      ink: { DEFAULT:'#0F1B3D', 2:'#4A5677', 3:'#7C87A6' },
      paper: '#F5F8FF', mist: '#F1F3F7', line: '#C9DAFF'
    },
    fontFamily: { ui: ['Inter','"IBM Plex Sans Arabic"','"Noto Sans SC"','system-ui','sans-serif'], disp: ['"Lora"','"Amiri"','"Noto Serif SC"','Georgia','serif'] },
    boxShadow: { card:'0 1px 0 rgba(31,74,196,.05), 0 10px 30px -18px rgba(31,74,196,.35)', soft:'0 2px 10px -4px rgba(31,74,196,.25)' },
    borderRadius: { xl2:'18px' }
  } },
  plugins: []
}
