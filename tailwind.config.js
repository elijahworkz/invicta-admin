module.exports = {
  content: [
     './public/**/*.html',
     './resources/js/**/*.{js,jsx,ts,tsx,vue}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      white: 'var(--el-color-white)',
      black: 'var(--el-color-black)',
      primary: 'var(--el-color-primary)',
      success: 'var(--el-color-success)',
      warning: 'var(--el-color-warning)',
      danger: 'var(--el-color-danger)',
      error: 'var(--el-color-error)',
      info: 'var(--el-color-info)',
      'primary-back': 'var(--color-primary-back)',
      'secondary-back': 'var(--color-secondary-back)'
    },
    extend: {},
  },
  plugins: [],
}