const { override, addLessLoader, fixBabelImports } = require('customize-cra')
const theme = require('./modifyVars')

module.exports = override(
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