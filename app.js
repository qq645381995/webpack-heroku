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
app.use(cookieParser());
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    // res.header("X-Requested-With", "XMLHttpRequest");
    req.headers['X-Requested-With'] = 'XMLHttpRequest';
    req.headers['id'] = '1111';
    // res.header("X-Powered-By",' 3.2.1')
    res.header("X-Powered-By", 'PHP/5.2.5')
    // res.header("Content-Type", "application/json;charset=utf-8");
    res.header("Content-Type", "text/html");
    res.header("Pragma", "no-cache");
    // console.log(res, req);
    // res.header("Set-Cookie", 'SERVERID=c40443f9636cc324fbdb5c25c09256b6|1471336606|1471335256;Path=/')
    // res.cookie('PHPSESSID','9198dbdb158d741af6c4a681522f2081')

    // req.header('Cookie', ['PHPSESSID=9198dbdb158d741af6c4a681522f2081', 'Hm_lvt_2c630339360dacc1fc1fd8110f283748=1470975513,1470975810,1471314458','m_lpvt_2c630339360dacc1fc1fd8110f283748=1471327119', 'SERVERID=ebcde74858922aec8aaf8fb40aed6036|1471327490|1471327111'])

    // document.cookie='PHPSESSID=9198dbdb158d741af6c4a681522f2081';
    // document.cookie='Hm_lvt_2c630339360dacc1fc1fd8110f283748=1470975513,1470975810,1471314458';
    // document.cookie='m_lpvt_2c630339360dacc1fc1fd8110f283748=1471327119';
    // document.cookie='SERVERID=ebcde74858922aec8aaf8fb40aed6036|1471327490|1471327111';
    // req.cookies = cookieParser(req.headers.cookie);
    // req.cookies = 'PHPSESSID=9198dbdb158d741af6c4a681522f2081';
    // res.header("Set-Cookie", ['PHPSESSID=98b1d002f647d731a667d2f9e646b8a9', 'Hm_lvt_2c630339360dacc1fc1fd8110f283748=1470975513,1470975810,1471314458', 'Hm_lpvt_2c630339360dacc1fc1fd8110f283748=1471335267', 'SERVERID=b6e721ca8fa8f1065ade14ce5cd80b3a|1471339701|1471339701;Path=/'])
    // PHPSESSID=6d87199b94af44791ea1ec1d5f99d0f2; Hm_lvt_2c630339360dacc1fc1fd8110f283748=1470975513,1470975810,1471314458; Hm_lpvt_2c630339360dacc1fc1fd8110f283748=1471338245; SERVERID=c40443f9636cc324fbdb5c25c09256b6|1471340827|1471340827
    // res.header("Set-Cookie", ['PHPSESSID=6d87199b94af44791ea1ec1d5f99d0f2', 'Hm_lvt_2c630339360dacc1fc1fd8110f283748=1470975513,1470975810,1471314458', 'Hm_lpvt_2c630339360dacc1fc1fd8110f283748=1471338245', 'SERVERID=c40443f9636cc324fbdb5c25c09256b6|1471340827|1471340827'])
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

app.get('/bj', function (req, res, next) {
    // PHPSESSID=844a68c5202ddbdc3a654ad5107e391f; Hm_lvt_2c630339360dacc1fc1fd8110f283748=1470975513,1470975810,1471314458; Hm_lpvt_2c630339360dacc1fc1fd8110f283748=1471335267; SERVERID=c40443f9636cc324fbdb5c25c09256b6|1471335393|1471335256;
    // console.log(req, res);
    // res.header("Set-Cookie", ['PHPSESSID=98b1d002f647d731a667d2f9e646b8a9', 'Hm_lvt_2c630339360dacc1fc1fd8110f283748=1470975513,1470975810,1471314458', 'Hm_lpvt_2c630339360dacc1fc1fd8110f283748=1471335267', 'SERVERID=b6e721ca8fa8f1065ade14ce5cd80b3a|1471339701|1471339701;Path=/'])
    // req.header("X-Requested-With", "XMLHttpRequest");
    // req.headers['X-Requested-With'] = 'XMLHttpRequest';
    // req.headers['id'] = '1111';
    superagent.get('http://www.bjbus.com/home/ajax_search_bus_stop_token.php?act=getLineDirOption&selBLine=503')
        // .set("Cookie", ['PHPSESSID=844a68c5202ddbdc3a654ad5107e391f', 'Hm_lvt_2c630339360dacc1fc1fd8110f283748=1470975513,1470975810,1471314458', 'Hm_lpvt_2c630339360dacc1fc1fd8110f283748=1471335267','SERVERID=c40443f9636cc324fbdb5c25c09256b6|1471336606|1471335256;Path=/'])
        .set('X-Requested-With','XMLHttpRequest')
        .end(function (err, sres) {
            if (err) {
                return next(err);
            }
            res.send(sres);
        });
});
var request = require('request');
app.get('/bj2', function (req, res, next) {
    var reques = request.defaults({ jar: true })
    var j = request.jar();
    j.setCookie('PHPSESSID=9198dbdb158d741af6c4a681522f2081')
    var r = request.defaults({ jar: j });
    request.cookie('PHPSESSID=9198dbdb158d741af6c4a681522f2081')
    reques.cookie('PHPSESSID=9198dbdb158d741af6c4a681522f2081')
    reques('http://www.bjbus.com/home/ajax_search_bus_stop_token.php?act=getLineDirOption&selBLine=7', function (error, response, body) {
        res.send(response);
    })
});
var requestify = require('requestify');
app.get('/bj3', function (req, res, next) {
    requestify.request('http://www.bjbus.com/home/ajax_search_bus_stop_token.php?act=getLineDirOption&selBLine=7', {
        method: 'GET',
        cookies: {
            mySession: 'some cookie value'
        },
    }).then(function (response) {
        // response.getBody();
        // response.body;
        res.send(response);
    });
});
app.listen(port)
console.log(`Listening at http://localhost:${port}`)
