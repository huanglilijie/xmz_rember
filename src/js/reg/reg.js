define([
  '../lib/common'
],function (common) {
  common.Mock.mock('login', {
      's|-1-1': 1,
      'd': {},
      'm': '提示',
      'url':''
    });
  var _page={
    init:function(){
      this.bindEvent();
      this.Reg().then(function(res) {
        console.log(res)
      }).fail(function(){
        console.log("ajax error")
      })
    },
    Reg:function(data){
      return common.callApi({
    		url:ajax+'Reg',
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
        _this.Reg(data)
      })
    }
  }
  _page.init();
})
