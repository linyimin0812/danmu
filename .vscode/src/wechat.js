var wechat = require('wechat');
var config = {
    token: 'linyimin',
    appid: 'wxbae20bf9373ef4da',
    encodingAESKey: 'KNOtjsJtvYOJJ7Emm1EUqxoSq3MdHik7K76aFCqGVBg',
    checkSignature: true // 可选，默认为true。由于微信公众平台接口调试工具在明文模式下不发送签名，所以如要使用该测试工具，请将其设置为false 
};

// 保存所有的用户输入信息
var data = [];

// 当前输入信息的条数
var i = 0;

app.use(express.query());
// 获取微信端输入数据
app.use('/weixin', wechat(config, function (req, res, next) {
    // 微信输入信息都在req.weixin上 
    var message = req.weixin;
    if(message.MsgType == "text"){
        data[i++] = message.Content;
        res.reply("信息发送成功");
    }else{
        res.reply("当前信息只支持文本信息，请重新输入");
    }
}));

app.use("/getWeixinData", function(req, res){
    res.json({datum: data});
    data = [];
    i = 0;
});