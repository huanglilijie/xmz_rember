define([
  '../lib/common'
],function (common) {
	$('.outListUl > li').on('click',function(){
		$(this).siblings().removeClass('outLiAct')
		$(this).addClass('outLiAct');
	})
})
