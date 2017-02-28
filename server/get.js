'use strict';
const path = require('path');
const koaRouter = require('koa-router');
const router = koaRouter();

var render = require('./render');


// router.get('/index', async (ctx, next) => {
//     ctx.body = await render('index.html');
// });
// router.get('/', async (ctx, next) => {
//     ctx.body = await render('index.html');
// });
router.get('/list', async (ctx, next) => {
    ctx.body = await render('2.html');
});
// router.get('/upload', async (ctx, next) => {
//     ctx.body = await render('3.html');
// });
router.get('/', async (ctx, next) => {
	ctx.redirect('/static/index.html');
});
/**
 * [404]
 */
router.get('/404', async (ctx, next) => {
	ctx.body = await render('404.html');
});

exports.router = router;
