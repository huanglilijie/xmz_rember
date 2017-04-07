define([
  '../lib/common',
  './date'
],function (common,date_box) {
  console.log(date_box)
  var _page={
    init:function(){
      this.bindEvent();
      this.GetUserinfo().then(function(res){
          console.log(res)
          if(res.s==1){
            var htmls = template('user_tml',res.d);
            $("#user_info").html(htmls);
          }
      }).fail(function(error){
        console.log(error)
      });
    },
    GetUserinfo:function(data){//获取用户信息
      return common.callApi({
    		url:ajax+'GetUserinfo',
        type:'get',
    		dataType:'json'
    	})
    },
    GetUserSign:function(){//获取签到记录
      return common.callApi({
    		url:ajax+'GetUserSign',
        type:'get',
    		dataType:'json'
    	})
    },
    SaveUserSign:function(){
      return common.callApi({
    		url:ajax+'SaveUserSign',
        type:'POST',
    		dataType:'json'
    	})
    },
    bindEvent:function(){
      var _this=this;
      $("#user_info").on('click',".qiandao",function(){
        $(".qiandao_mask").show();
        $(".date_box").html(date_box);
        _this.GetUserSign().then(function(res){
          console.log(res)
          if(res.s==1){
            for(var i=0; i<res.d.length;i++){
              console.log(res.d[i].day)
              $("td").each(function(){
                var flg=$(this).text();
                if(flg==res.d[i].day){
                  $(this).addClass("today")
                }
              });
            }
          }
        }).fail(function(error) {
          console.log(error)
        })
      })
      // 签到
      $(".qiandao_btn").click(function(){
        _this.SaveUserSign().then(function(res){
          console.log(res)
          if(res.s==1){
            weui.toast('签到成功', {
                duration: 2000,
                className: 'custom-classname',
                callback: function(){
                  $(".qiandao_mask").hide();
                }
            });
          }else{
            weui.topTips(res.m, 2000);
          }
        }).fail(function(error) {
          console.log(error)
        })
      })
      // 关闭签到
      $(".close").click(function() {
        $(".qiandao_mask").hide();
      })
    }
  }
  _page.init();
})
