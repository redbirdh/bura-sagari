var express = require('express');
//var router = express.Router();

module.exports.toggle = function(req, res, next) {
    if (req.params.state) {
        if(req.params.state == "start") {
            // タイマー開始通知
            console.log("start !");
            res.send('ok');
        }else if(req.params.state == "finish") {
            // タイマー終わり通知
            console.log("finish !");
            res.send('ok');
        }
    } else {
        console.log("ないです");
        res.send('ng');
    }
};

