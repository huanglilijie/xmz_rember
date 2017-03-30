define([
  '../lib/common'
],function (common) {
	//ajax 访问方法
	common.callApi({
		url:'http://tcc.taobao.com/cc/json/mobile_tel_segment.htm',
		dataType:'jsonp',
		data:{
			tel:'15757192153'
		}
	}).then(function(res){
		console.log(res);
		common.hideLoading();
	}).fail(function(error){
		console.log(error);
	})
})
