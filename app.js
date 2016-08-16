const Server = require('./server.js')
const port = (process.env.PORT || 8080)
const app = Server.app()

if (process.env.NODE_ENV !== 'production') {
    const webpack = require('webpack')
    const webpackDevMiddleware = require('webpack-dev-middleware')
    const webpackHotMiddleware = require('webpack-hot-middleware')
    const config = require('./webpack.dev.config.js')
    const compiler = webpack(config)

    app.use(webpackHotMiddleware(compiler))
    app.use(webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: config.output.publicPath
    }))
}
var express = require('express');
var cheerio = require('cheerio');
var superagent = require('superagent');
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    // res.header("X-Powered-By",' 3.2.1')
    res.header("Set-Cookie", 'SERVERID=ebcde74858922aec8aaf8fb40aed6036|1471326286|1471326279;Path=/')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
app.get('/index', function (req, res, next) {
    superagent.get('https://cnodejs.org/')
        .end(function (err, sres) {
            if (err) {
                return next(err);
            }
            var $ = cheerio.load(sres.text);
            var items = [];
            $('#topic_list .cell').each(function (idx, element) {
                var $element = $(element).find('.topic_title');
                var $element2 = $(element).find('.last_active_time');
                items.push({
                    title: $element.attr('title'),
                    href: $element.attr('href'),
                    text: $element2.text()
                });
            });


            res.send(items);
        });
});

app.listen(port)
console.log(`Listening at http://localhost:${port}`)
