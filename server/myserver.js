import axios from 'axios';
import qs from 'qs';

var server = axios.create({
    baseURL:'http://*****',
    timeout:30000,
})

function sendServer(){
    this.server = server;
}
// 绑定事件
sendServer.prototype.parseRouter = function(name,urlob){
    var ob = this[name] = {};
    console.log('打印一下哈')
    console.log(ob)
    console.log(this[name])
    Object.keys(urlob).forEach(item=>{
        console.log(item)
        ob[item] = this.serverMes.bind(this,name,item,urlob[item])
    })
}
// 发送请求
sendServer.prototype.serverMes = function(moduleName,name,url,config){
    var config = config || {};
    var data = config.data || {};
    var type = config.type || 'post';
    var success = config.success || function(){};
    // 请求前处理
    function beforeFn(res){
        console.log('请求前')
        return res;
    }
    // 请求后处理
    function defaultFn(response){
        console.log('请求后');
        return response;
    }
    var state={
        get:function(){
            var newUrl = url + '?' + qs.stringify(data);
            return server.get(newUrl).then(beforeFn).then(defaultFn)
        },
        post:function(){
            return server.post(url,data).then(beforeFn).then(defaultFn)
        }
    }
    return state[type]();
}   

export default new sendServer;