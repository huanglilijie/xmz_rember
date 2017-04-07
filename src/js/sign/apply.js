define([
  '../lib/common'
],function (common) {
  var _page={
    init:function(){
      this.bindEvent();
      this.GetApply().then(function(res) {
        console.log(res)
        if(res.s==1){
          var htmls=template("inner",res.d);
          $("#content").html(htmls)
        }
      }).fail(function(error) {
        console.log(error)
      })
    },
    GetApply:function(){//获取报名主题
      return common.callApi({
        url:ajax+'GetApply',
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
