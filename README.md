###西门子会员项目

## 项目运行及构建

	项目更目录安装依赖包 npm install
	推荐使用cnpm

	开发模式运行 gulp watch/npm run watch 进行文件监听实时编译 

	项目构建   gulp build/npm run build

## 目录介绍
	
	dist 项目构建之后的目录  一般不提交
	src  项目源码
		|
		|__ img   项目所有图片
		|
		|__ js      项目所有js脚本
		|
		|__ scss    项目所有样式文件
		|
		|__ template 公公模版页面
		|
		|__ view   项目所有html文件




	node_modules 项目构建环境依赖包
	gulpfile.js gulp配置文件


## HTML模版介绍
	
	view生成的html 都是基于template文件夹下的公共模版来配置的


	### 示例如下

		index.html

		<!-- 公共底部开始 -->
			@@include('../template/header.html',{
			    "title" : "首页",
			    "cssFile" : ["../css/common.css","../css/common.css"],
			    "bodyClass" : "",
			    "showLoading" : false
			})
			

			####此部分为公共的头部
				#####注：模版内传参不能使用单引号  最后一项不能接逗号
		
				title 为当前页面的title （必传）
				cssFile 当前页面所需要加载的除了common的样式 以数组形式传递 （非必传）
				bodyClass 当前页面需要给body添加的类名  （非必传）
				showLoading 是否加载loading动画 默认为true (非必传)  
		<!-- 公共底部结束 -->

		<!-- 页面主题内容开始 -->

			<div style="padding:.4rem">
			    内容
			</div>

			<script type="text/javascript" src="@@static/js/lib/require.js" data-main="@@static/js/index/index.js"></script>

		<!-- 页面主题内容结束 -->


		<!-- 公共底部开始 -->
			@@include('../template/footer.html')
		<!-- 公共底部结束 -->



## js编写原则
	
	所有ajax调用都使用common里面提供的方法  不要直接使用 $.ajax 不利于后期管理
	请求openapi的接口统一使用 common.getApi


	页面脚本初始化运行 都在commom的init方法运行
	



## 模版引入静态资源
	

   前端模版使用artTemplate

   		例如：
   			<script type="text/html" id="tpl">
				<h1>{{title}}</h1>
				<ul>
				    {{each list as value i}}
				        <li>索引 {{i + 1}} ：{{value}}</li>
				    {{/each}}
				</ul>
   			</script>

   			<script type="text/javascript">
		   		var data = {
				    title: '标签',
				    list: ['文艺', '博客', '摄影', '电影', '民谣', '旅行', '吉他']
				};
				var html = template('test', data);
				document.getElementById('content').innerHTML = html
   			</script>
   

   路径前面添加 @@static  相对于src目录




# 注意事项
	所有公共模版  template文件夹下   建议使用.html文件 



#Promise 
		Promise.then(function(resp){
			//success code
		}).fail(function(error){
			//error code
		});

	具体查看 index.js
