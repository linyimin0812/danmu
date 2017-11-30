var express = require("express")
var wechat = require('wechat');
var config = require("./config");

var app = express();
var config = {
    token: config.token,
    appid: config.appid,
    encodingAESKey: config.encodingAESKey,
    checkSignature: true 
};

// 保存所有的用户输入信息
var data = [];

// 当前输入信息的条数
var i = 0;

app.use(express.query());
// 获取微信端输入数据
app.use("*", function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use('/weixin', wechat(config, function (req, res, next) {
    // 微信输入信息都在req.weixin上 
    var message = req.weixin;
    if(message.Content != "【收到不支持的消息类型，暂无法显示】"){
        data[i++] = message.Content;
	console.log(data);
	console.log(message)
        res.reply("信息发送成功");
    }else{
        res.reply("当前信息只支持文本信息，请重新输入");
    }
}));
app.use("/getWeixinData", function(req, res){
    res.json({datum: data});
    //data = [];
    //i = 0;
});


app.use("/static", express.static("./"));
app.listen(80);
console.log("listen for port 80");
