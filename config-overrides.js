const { override, addLessLoader, fixBabelImports, addDecoratorsLegacy } = require('customize-cra')
const theme = require('./modifyVars')

module.exports = override(
  addDecoratorsLegacy(),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: theme
    },
  }),
  fixBabelImports('import', {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true
  })
)