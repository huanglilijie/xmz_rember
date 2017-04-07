define([
  '../lib/common'
],function (common) {
  var _page={
    init:function(){
      this.bindEvent();
      $(".title").html(common.getQueryString().title+"报名通道")
    },
    SaveUserApply:function(activityid,tel,name){//西家厨房报名
      return common.callApi({
    		url:ajax+'SaveUserApply',
        type:'post',
    		dataType:'json',
        data:{
          activityid:activityid,
          tel:tel,
          name:name
        }
    	})
    },
    bindEvent:function(){
      var _this=this;
      var _query=common.getQueryString();
      $(".login_primary").click(function() {
        var tel=$(".tel").val();
        var name=$(".userName").val();
        if(tel==""|| name==""){
          return weui.topTips('信息请填写完整哦', 2000);
        }
        _this.SaveUserApply(_query.activityid,tel,name).then(function(res) {
          console.log(res)
          if(res.s==1){
              weui.toast('报名成功', 3000);
          }else{
            weui.topTips(res.m, 3000);
          }
        }).fail(function(error){
          console.log(error)
        })
      })
    }
  }
  _page.init();
})
