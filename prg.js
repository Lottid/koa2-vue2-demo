'use strict';
var path = require('path');

const Koa = require('koa');
const koaRouter = require('koa-router');
const koaBody = require("koa-body");
const staticFiles = require('koa-static');
const co = require('co');
var logger = require('koa-logger');


var os = require('os');
var fs = require('fs');

const app = new Koa();
const router = koaRouter();

app.use(koaBody({
    multipart: true,
    formLimit: '50mb',
    jsonLimit: '50mb',
    formidable: {
        uploadDir: __dirname + '/public/upload',
        keepExtensions: true
    }
}));
app.use(staticFiles(__dirname + '/public'));
app.use(staticFiles(__dirname + '/static'));
app.use(logger());

var getList = require("./server/get.js");
// app.use(getList.index);
app.use(getList.router.routes()).use(getList.router.allowedMethods());



var routers = require("./server/router.js");
// console.log(routers);
app.use(routers.router.routes()).use(routers.router.allowedMethods());


// app.use(function* pageNotFound(next) {
//     yield next;
//     if (404 == this.status) {
//     	this.redirect('/404');
//     };
// });
console.log('message')
//////////////////////////////

app.listen(3000, () => console.log('Koa start at 3000...'));
