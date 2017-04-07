define([
  '../lib/common'
],function (common) {
  var _page={
    init:function(){
      this.bindEvent();
      template.helper('time', function (ns) {
				function formatDate(now) {
					var year=now.getFullYear();
					var month=now.getMonth()+1;
					var date=now.getDate();
					var hour=now.getHours();
					var minute=now.getMinutes();
					var second=now.getSeconds();
					return year+"-"+month+"-"+date;
				}
				var d=new Date(ns*1000);
				return formatDate(d);
			});
      this.GetWelfare().then(function(res) {
        console.log(res)
          if(res.s==1){
            var htmls=template("inner",res);
            $("#content").html(htmls)
          }else{

          }
      }).fail(function(error) {
        console.log(error)
      })
    },
    GetWelfare:function(){//获取我的福利
      return common.callApi({
    		url:ajax+'GetWelfare',
        type:'post',
    		dataType:'json'
    	})
    },
    bindEvent:function(){
      var _this=this;

    }
  }
  _page.init();
})
