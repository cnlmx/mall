module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      unitToConvert: 'px',
      viewportWidth: 375,
      viewportHeight: 667,
      unitPrecision: 7,
      viewportUnit: 'vw',
      // selectorBlackList: ['ignore', 'tab-bar'],
      selectorBlackList: ['ignore'],
      minPixelValue: 1
    }
  }
}
