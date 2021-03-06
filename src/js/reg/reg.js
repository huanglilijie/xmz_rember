define([
  '../lib/common'
],function (common) {
  var _page={
    init:function(){
      this.bindEvent();
    },
    Reg:function(data){
      return common.callApi({
    		url:ajax+'Reg',
        type:'post',
    		dataType:'json',
    		data:data
    	})
    },
    bindEvent:function(){
      var _this=this;
      $(".login_primary").click(function() {
        var tel=$(".user_name").val();
        var pwd=$(".password").val();
        var re_pwd=$(".passAgain").val();
        var data={
          tel:tel,
          pwd:pwd,
          re_pwd:re_pwd
        }
        if(tel==""|| pwd=="" || re_pwd==""){
          return weui.topTips('请填写完整', 1500);
        }
        _this.Reg(data).then(function(res){
          console.log(res)
          if(res.s==1){
            weui.toast(res.m, {
                duration: 2000,
                className: 'custom-classname',
                callback: function(){
                  window.location.href=url+'login.html';
                }
            });
          }else if(res.s==3){
            //有优惠券
          }else{
            weui.topTips(res.m, 1500);
          }
        }).fail(function(error) {
          console.log(error)
        })
      })
    }
  }
  _page.init();
})
