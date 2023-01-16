/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    textColor: theme => theme('colors'),
    textColor: {
      '333':'#333',
      '#409eff':'#409eff',
      '3a77fd':'#3a77fd'
    },
    fontSize: {
      '12': '12px'
    },
    colors:{
      'primary':'#3bacfb',
      'blur7' : '#3a77fd'
    },
    borderRadius:{
      's':'5px',
    },
    boxShadow:{
      s:"0 5px 10px rgba(204, 204, 204, 0.8 )",
      ssm: '0 13px 30px  rgba(29, 102, 189, 0.2)'
    },
    margin:{
      13:'3.25rem',
    },
    
  
    extend: {
      spacing: {
        '54':'13.5rem',
        '26':'6.5rem'
      }
      
    },
    
  },
  plugins: [],
}
