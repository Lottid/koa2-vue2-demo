'use strict';
var mysql = require('mysql'),
    wrapper = require('co-mysql'),
    config = require("../base.js").database;

function query(sql) {
    console.log(sql);
    if (!sql) return ;
    var pool = mysql.createPool(config),
        client = wrapper(pool);

    return client.query(sql).then(function(rows) {
        pool.end();
        return rows;
    }).catch(function(error) {
        pool.end();
        return error;
    });
}

exports.query = query;
