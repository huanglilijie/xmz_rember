define([
  '../lib/common'
],function (common) {
	$("#continer").on('click','.giftNav ul li',function(){
		$('.effList').hide();
		$('.aluseList').hide();
		$('.overList').hide();
		$(this).siblings().removeClass('giftAct');
		$(this).addClass('giftAct');
		if($(this).index()==0){
			$('.effList').show();
		}else if($(this).index()==1){
			$('.aluseList').show();
		}else{
			$('.overList').show();
		}
	})
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
      var Donations = this.GetUserDonations(2);
      var Donations_use = this.GetUserDonations(0);
			var Donations_deadtime=this.GetUserDonations(-1);
			var _aa = [Donations,Donations_use,Donations_deadtime];
			Promise.all(_aa).then(function (res) {
			    console.log(res);
			    var htmls = template('inner',{
			    	Donations:res[0].d,
			    	Donations_use:res[1].d,
            Donations_deadtime:res[2].d
			    });
          $("#continer").html(htmls)
			}).fail(function (err) {
			    weui.alert(res.m);
			})
    },
    GetUserDonations:function(state){//获取用户优惠券
      return common.callApi({
    		url:ajax+'GetUserDonations',
        type:'post',
    		dataType:'json',
        data:{
          state:state
        }
    	})
    },
    ExchangeDonations:function(sn){
      return common.callApi({
    		url:ajax+'ExchangeDonations',
        type:'post',
    		dataType:'json',
        data:{
          sn:sn
        }
    	})
    },
    bindEvent:function(){
      var _this=this;
      $("#continer").on('click','.toGift',function(){
        var sn=$(".giftNum").val();
        if(sn==""){
          return weui.topTips('请输入兑换码', 2000);
        }
        console.log(sn)
        _this.ExchangeDonations(sn).then(function(res){
            console.log(res)
            if(res.s==1){
              weui.toast('领取成功', {
                  duration: 2000,
                  className: 'custom-classname',
                  callback: function(){
                    window.location.reload();
                  }
              });
            }else{
              weui.topTips(res.m, 2000)
            }
        }).fail(function(error) {
          console.log(error)
        })
      })
    }
  }
  _page.init();
})
