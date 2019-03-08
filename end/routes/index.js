var express = require('express');
var router = express.Router();
var mongodb = require("mongodb-curd");
var dbBase = "greenbill";
var dbColl = "billlist";

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
//添加账单
router.post("/add", function(req, res, next) {
    var params = req.body;
    var name = params.name; //名字
    var icon = params.icon; //图标
    var price = params.price; //价格
    if (!name || !icon || !price) {
        res.send({ code: 2, msg: "完善信息" });
    } else {
        addList();
    }

    function addList() {
        mongodb.insert(dbBase, dbColl, params, function(result) {
            if (result) {
                res.send({ code: 0, msg: "添加成功" });
            } else {
                res.send({ code: 1, msg: "添加失败" })
            }
        })
    }
})

router.get("/list", function(req, res, next) {
    mongodb.find(dbBase, dbColl, {}, function(result) {
        if (result.length > 0) {
            res.send({ code: 0, data: result });
        } else {
            res.send({ code: 1, msg: "查找失败" })
        }
    })
})
module.exports = router;