module.exports = {
    devServer: {
        proxy: {
            '/apis': {     //这里最好有一个 /
                target: 'http://localhost:3030',  // 后台接口域名
                changeOrigin: true,  //是否跨域
                pathRewrite: {
                    '^/apis': ''
                }
            }
        }
    }
}