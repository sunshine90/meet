var koa = require('koa');
var serve = require('koa-static');
var route = require('./config/route');
var parse = require('co-body');
var path = require('path');

//http://cnpmjs.org/package/koa-bodyparser
var bodyParser = require('koa-bodyparser');

//https://www.npmjs.com/package/koa-session
var session = require('koa-session');

var app = koa();

//session keys
app.keys = ['keys'];
app.use(session(app));

app.use(function *(){
    this.session.a = this.session.a?this.session.a+1:1;
    console.log(this.session.a);
})

//app.use(session(app));

// body parser
app.use(bodyParser());

// static-allocation
app.use(serve(path.join(__dirname, '/static')));

route.init(app);
// listen port
app.listen(3000);

console.log('listen on 3000');