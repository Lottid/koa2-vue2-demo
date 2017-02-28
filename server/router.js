'use strict';
const path = require('path');
const koaRouter = require('koa-router');
const router = koaRouter();

var render = require('./render');
var config = require("../base.js");
const fs = require('fs');
// function* index() {
//     this.body = yield render('index.html');
// }
// router.get('/index', async (ctx, next) => {
//     ctx.body = await render('index.html');
// });
// router.get('/list', async (ctx, next) => {
//     ctx.body = await render('2.html');
// });
// router.get('/upload', async (ctx, next) => {
//     ctx.body = await render('3.html');
// });

//////////////////////////////

var query = require("./content.js");

router.get('/api/dataget', async function(ctx, next) {
    console.log(ctx.query);
    var res;
    var select = "SELECT * FROM test.people where id = " + ctx.query.id + ";";
    res = await query.query(select);
    if (res !== null || res !== undefined || res !== '') {
        ctx.body = res;
    } else {
        ctx.body = 'res';
    }

});
router.post('/api/datapost', async function(ctx, next) {
    var res,
        reqBody = ctx.request.body,
        reqMethod = ctx.request.method;
    if (reqMethod == null || reqMethod == undefined || reqMethod == '') {
        ctx.body = 'error';
    }
    var insert = "INSERT INTO test.people (name, age) VALUES ('" + reqBody.name + "', '" + reqBody.age + "');"
    res = await query.query(insert);
    if (res !== null || res !== undefined || res !== '') {
        ctx.body = res;
    } else {
        console.log('here');
        ctx.body = 'error';
    }
});

router.post('/api/uploadAction', function(ctx, next) {
    console.log(ctx.request.body.files.file);
    ctx.redirect('/static/index.html');
});
router.post('/api/upload', async function(ctx, next) {
    var reqImgs = ctx.request.body.images,
        imgObj = [];
    // for (var i = 0; i < reqImgs.length; i++) {
    //     //过滤data:URL
    //     var base64Data = reqImgs[i].base64.replace(/^data:image\/\w+;base64,/, ""),
    //         name = reqImgs[i].name,
    //         lastName = name.split('.')[0]+Date.now() +'.'+name.split('.')[1],
    //         res = {};
    //         res.name = lastName;
    //     var dataBuffer = new Buffer(base64Data, 'base64');
    //     fs.writeFile(config.rootPath +"/public/upload/"+lastName, dataBuffer, function(err) {
    //         if(err){
    //             console.log(err);
    //         }else{
    //             res.flag = "succress";
    //             console.log( "保存成功！");
    //         }
    //     });
    //     imgObj.push(res);
    // }
    
    for (var i = 0; i < reqImgs.length; i++) {
        await saveImg(reqImgs[i]).then(function (message) {
            console.log(message);
            imgObj.push(message)
        }, function (error) {
            console.log(error);
        });
    }
    ctx.body = JSON.stringify(imgObj);
    
});
function saveImg(reqImg) {
    return new Promise(function (resolve, reject) {
        var base64Data = reqImg.base64.replace(/^data:image\/\w+;base64,/, ""),
            name = reqImg.name,
            lastName = name.split('.')[0]+Date.now() +'.'+name.split('.')[1],
            res = {};
            res.name = lastName;
        var dataBuffer = new Buffer(base64Data, 'base64');
        fs.writeFile(config.rootPath +"/public/upload/"+lastName, dataBuffer, function(err) {
            if (err) {
                reject(error);
            } else {
                res.flag = "succress";
                resolve(res);
            }
        });
    });
}

exports.router = router;
