"use strict";
var chalk_1 = require('chalk');
var path_1 = require('path');
var express = require('express');
var watch_1 = require('./watch');
var data_1 = require('./data');
var view_1 = require('./view');
var Server = (function () {
    function Server(settings) {
        this.app = express();
        this.http = require('http').Server(this.app);
        this.io = require('socket.io')(this.http);
        this.view = new view_1.View('hbs');
        this.settings = settings;
        this.root = this.settings.src;
        this.data = new data_1.Data();
        this.db = this.data.all(this.settings);
        this.globals = settings.globals;
        this.setup();
        this.start();
    }
    Server.prototype.setup = function () {
        var _this = this;
        this.app.use('/dist', express.static(path_1.join(__dirname, '..', 'www/dist')));
        this.app.use('/api', require('json-server').router(this.db));
        this.app.get('/', function (req, res) {
            var customStylesheet = _this.settings.customStylesheet;
            var data = {};
            if (customStylesheet.length) {
                data.customStylesheet = customStylesheet;
            }
            var indexFile = path_1.join(__dirname, '..', 'www/index.html');
            var view = _this.view.asText(indexFile, data);
            res.send(view);
        });
        this.app.get('/:type/:name', function (req, res) {
            var type = req.params.type;
            var name = req.params.name;
            var item = _this.db[type].find(function (x) { return x.name === name; });
            var demoFile = path_1.join(__dirname, '..', 'www/demo.html');
            var data = { item: item, globals: _this.globals };
            var view = _this.view.asText(demoFile, data);
            res.send(view);
        });
    };
    Server.prototype.eventEmit = function (event, name) {
        var viewData = this.data.all(this.settings);
        viewData.name = name;
        this.io.emit(event, viewData);
    };
    Server.prototype.start = function () {
        var port = process.env.PORT || 9095;
        this.http.listen(port, function () {
            console.log("Listening at " + chalk_1.cyan("http://127.0.0.1:" + port));
        });
    };
    Server.prototype.watch = function () {
        var _this = this;
        var dirsToWatch = [
            path_1.join(this.root, 'pages'),
            path_1.join(this.root, 'patterns'),
            path_1.join(this.root, 'overviews'),
            path_1.join(this.root, 'components')
        ];
        var watcher = new watch_1.Watch(dirsToWatch);
        watcher.getWatcher()
            .on('change', function (filePath) {
            var name = path_1.basename(filePath).split('.').slice(0, -1).join('');
            if (name === 'README' || name === 'context') {
                name = filePath.split('/').slice(-2)[0];
            }
            _this.eventEmit('change', name);
            watcher.eventLog('Changed', filePath);
        });
    };
    return Server;
}());
exports.Server = Server;
