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
      var Coupons = this.GetUserCoupons(2);
			var Coupons_deadtime=this.GetUserCoupons(-1);
			var _aa = [Coupons,Coupons_deadtime];
			Promise.all(_aa).then(function (res) {
			    console.log(res);
			    var htmls = template('inner',{
			    	Coupons:res[0].d,
			    	Coupons_deadtime:res[1].d
			    });
          $("#continer").html(htmls)
			}).fail(function (err) {
			    weui.alert(res.m);
			})
    },
    GetUserCoupons:function(state){//获取用户优惠券
      return common.callApi({
    		url:ajax+'GetUserCoupons',
        type:'post',
    		dataType:'json',
        data:{
          state:state
        }
    	})
    },
    bindEvent:function(){
      var _this=this;

    }
  }
  _page.init();
})
