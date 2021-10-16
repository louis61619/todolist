const path = require('path')

const resolve = (dir) => path.resolve(__dirname, dir)

module.exports = {
  webpack: {
    alias: {
      '@': resolve('src')
      // mock: resolve('mock')
    },

    configure: (webpackConfig) => {
      // 反加載ModuleScopePlugin這個插件
      const scopePluginIndex = webpackConfig.resolve.plugins.findIndex(
        ({ constructor }) => constructor && constructor.name === 'ModuleScopePlugin'
      )

      webpackConfig.resolve.plugins.splice(scopePluginIndex, 1)

      // 將.mock路徑加入到編譯中
      const oneOfRule = webpackConfig.module.rules.find((rule) => rule.oneOf)
      if (oneOfRule) {
        const tsxRule = oneOfRule.oneOf.find(
          (rule) => rule.test && rule.test.toString().includes('tsx')
        )

        const newIncludePaths = [
          // relative path to my yarn workspace library
          path.resolve(__dirname, './mock')
        ]
        if (tsxRule) {
          if (Array.isArray(tsxRule.include)) {
            tsxRule.include = [...tsxRule.include, ...newIncludePaths]
          } else {
            tsxRule.include = [tsxRule.include, ...newIncludePaths]
          }
        }
      }
      return webpackConfig
    }
  }
}
