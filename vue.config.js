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