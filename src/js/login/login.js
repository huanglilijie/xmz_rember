define([
  '../lib/common'
],function (common) {
  var _page={
    init:function(){
      this.bindEvent();
    },
    Login:function(data){
      return common.callApi({
    		url:ajax+'Login',
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
        var data={
          tel:tel,
          pwd:pwd
        }
        if(tel==""|| pwd==""){
          return weui.topTips('请填写完整', 1500);
        }
        _this.Login(data).then(function(res){
          console.log(res)
          if(res.s==1){
            weui.toast(res.m, {
                duration: 2000,
                className: 'custom-classname',
                callback: function(){
                  window.location.href=url+'members.html';
                }
            });
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
