var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var checkuser = require('./modules/checkUser.js');
var app = express();

app.set('view engine','jade');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(session({
  secret:"mima"
}));

//系统的根目录
app.get('/',function(req,res){
  res.render("index");
})

app.post('/sign_in',function(req,res){
  checkuser(req.body,function(result,user){
    if(result){
      req.session.user = user;
      res.redirect('/map')
    }else{
      res.redirect('/')
    }
  })
})

//系统主页面，地图显示页面
app.get('/map',function(req,res){
  var user = req.session.user;
  console.log(user);
  if(user){
    res.render('WEBGIS',{data:user});
  }else{
    res.redirect('/')
  }
})


app.listen(3000);
console.log('WEBGIS服务器已经启动！');
// module.exports = app;