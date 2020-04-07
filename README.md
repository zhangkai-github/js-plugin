# packaging-axios
1.创建一个js文件，里面为请求路径以及之后要调用的名称，例api/index.js
2.封装我们的axios
  import axios from 'axios';
  import qs from 'qs';
  var server = axios.create({
    自定义axios配置
  })
  如果你需要在请求后，或者接收到后端返回数据前做一些操作，可以自己通过axios.interceptors进行配置，例如：
  axios.interceptors.response.use(function(res){
      success打开遮罩等操作
  },function(fail){
      error
  })
  所有请求的必需字段都可以提前写在配置中，这样以后请求就不用了重复写了
3.注意最后要在main.js中全局引入一下，直接绑定在原型上即可全局使用
  import wxserver from './api/index'
  Vue.prototype.wxclaim = wxserver;
4.由于我们返回的是promise，所以我们需要链式调用，
  页面中调用：this.wxclaim.index.具体接口名称({data:_pars}).then(res=> 操作请求后的数据)
  对比一下封装前：
  var data2 = {name:xiaoming}
  //其他必备字段
  axios.post('https://******',data2).then(res)
  总结;1.集中管理请求地址，以后如果需要修改，我们就直接修改api/index里面的路径即可
       2.如果想在项目需要在所有请求前统一加遮罩，我们在myserver.js中配置一下，所有接口即完成改需求
       3.项目看起来更简洁，方便以后维护，
  第一次写，就先到这吧~
