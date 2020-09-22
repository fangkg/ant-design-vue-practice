module.exports = {
    // 选项
    css: {
        loaderOptions: {
            // 这里配置的选项会传递给css-loader
            less: {
                javascriptEnabled: true
            }
        }
    },
    chainWebpac: config => {
        const svgRule = config.module.rule("svg")
        // 清除已有loader 防止后面loader附加在该规则现有的loader之后
        svgRule.uses.clear()
        // 添加要替换的loader
        svgRule.use("vue-svg-loader").loader("vue-svg-loader")
    },
    devServer: {
        proxy: {
            "/api": {
                target: "http://localhost:3000",
                bypass: function(req, res) {
                    if (req.headers.accept.indexOf("html") !== -1) {
                        console.log('skipping proxy for browser request.')
                        return "/index.html"
                    } else if (Process.env.MOCK !== "none") {
                        const name = req.path.split("/api/")[1].split("/").join("-");
                        const mock = require(`/mock/${name}`);
                        const result = mock(req.method);
                        delete require.cache[require.resolve(`./mock/${name}`)]
                        return res.send(result);
                    }
                }
            }
        }
    }
}