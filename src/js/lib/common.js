define([
	'./zepto.min',
	'./template.min',
	'./es6-promise',
	'./fastclick',
	'./mock'
],function (a,template,Promise,FastClick,Mock) {
	$(function(){
		//消除移动端点击延迟
		FastClick.attach(document.body);
	})
	window.Promise = Promise;
	return {
		callApi:function(options){
			var _this = this;
			var _opt={};
			options=options||{};
			options.data=options.data||{};
			if(!options.url){
				console.error("请求参数缺失");
				return false;
			}
			return new Promise(function(resolve,reject){
				_opt={
					url:options.url,
					type:options.type||'get',
					dataType:options.dataType||'json',
					data:options.data,
					xhrFields:{
						withCredentials:true
					},
					success:function(res){
						options.success && options.success(res);
						resolve(res);
					},
					error:function(error){
						_this.ajaxError();
						options.error && options.error(error);
						reject(error);
					}
				}
				if(options.dataType==='jsonp'){
					_opt.jsonp='callback';
				}
				$.ajax(_opt);
			})
		},
		/**
		 * 隐藏页面初始化的loading动画
		 */
		hideLoading:function(){
			var _loadBox = document.getElementById('LoadingBox');
			if(_loadBox){
				_loadBox.style.display = 'none'
			}
			return this;
		},
		//获取浏览器参数
		getQueryString:function(url) {
			if (url) {
				url = url.substr(url.indexOf("?") + 1);
			}
			var result = {}, queryString = url || location.search.substring(1),
			re = /([^&=]+)=([^&]*)/g, m;

			while (m = re.exec(queryString)) {
				result[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
			}
			if(!isEmptyObj(result)){
				for (var prop in result) {
					if (result.hasOwnProperty(prop)) {
						result[prop] = escapeQuery(result[prop]);
					}
				}
			}
			return result;
		},
		/**
		 * 网络加载错误渲染空页面
		 */
		ajaxError : function(){
			this.hideLoading()
		},
		FastClick: FastClick,
		Mock:Mock
	}

	function escapeQuery(str) { //参数处理
		if(!str){
	 		return "";
	 	}
	 	var _isObj = false;
		if ( typeof str != "string" ) {
			try{
				str = JSON.stringify(str);
				_isObj = true;
			}catch(e){
			}
		}
		var obj = {
			'<': '&lt;',
			'>': '&gt;'
		};
		str = str.replace( /(\<|\>)/ig, function ( s, t ) {
			return obj[ t ];
		});
		if(_isObj){
			try{
				str = JSON.parse(str);
			}catch(e){}
		}
		return str;
	}
	function isEmptyObj(obj){ //判断是否为空对象
		if (obj) {
            var flag = true;
            for (var key in obj) {
            	if (obj.hasOwnProperty(key)) {
            		flag = false;
            		break;
            	}
            }
            return flag;
        }else {
            return true;
        }
	}

})
