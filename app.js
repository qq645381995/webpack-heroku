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
var cookieParser = require('cookie-parser');
var querystring = require('querystring');
var http = require('http');
var Cookies = require("cookies")
var url = require('url');
var ck = '';
app.use(cookieParser());
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header('Access-Control-Allow-Credentials', true);//告诉客户端可以在HTTP请求中带上Cookie
    // res.header("X-Powered-By", ' 3.2.1')
    res.header("X-Powered-By", 'PHP/5.2.5')
    res.header("Content-Type", "application/json;charset=utf-8");
    // res.header("Content-Type", "text/html");
    res.header("Pragma", "no-cache");
    // res.header("Set-Cookie", 'SERVERID=c40443f9636cc324fbdb5c25c09256b6|1471397374|1471397213;Path=/')
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
app.get('/get', function (req, res, next) {
    getCk(req, res, next);
});
function getCk(req, res, next) {
    superagent.get('http://www.bjbus.com/home/index.php')
        .end(function (err, sres) {
            if (err) {
                return next(err);
            }
            console.log(111, sres.header['set-cookie'])
            ck = sres.header['set-cookie'];
            // var a = url.parse('http://example.com:8080/one?a=index&t=article&m=default');
            var obj = { name: "一介布衣", url: "http://yijiebuyi.com" };
            var param = querystring.stringify(sres.header['set-cookie'], ';');

            ck = ck.join('').replace('path=/', '').replace('Path=/', '');
            res.send(sres.header);
        });
}
app.get('/bj', function (req, res, next) {
    console.log(req);
    console.log(req.query);
    superagent.get('http://www.bjbus.com/home/ajax_search_bus_stop_token.php?act=busTime&selBLine=1&selBDir=5276138694316562750&selBStop=1')
        .withCredentials()
        .set('X-Requested-With', 'XMLHttpRequest')
        // .set('Cookie', 'PHPSESSID=4a1b39ebfed819523e27ee4f728dfdaf; SERVERID=ebcde74858922aec8aaf8fb40aed60362;')
        // .set('Cookie', ck)
        .set('Cookie', 'PHPSESSID=056407d382622455fe967c07d973efa7;SERVERID=b6e721ca8fa8f1065ade14ce5cd80b3a|1471708800|1471536000')
        .set('user-agent', 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36')
        .end(function (err, sres) {
            if (err) {
                return next(err);
            }
            // console.log(111,JSON.parse(sres.text).html)
            console.log(sres.text);
            if (sres.text == 'timeout') {
                return res.send(sres);
            }
            // var d=Object.parse(sres);
            res.send(sres);
        });
});
app.listen(port)
console.log(`Listening at http://localhost:${port}`)
