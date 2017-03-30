define([
  '../lib/common'
],function (common) {
	$(".giftNav ul li").on('click',function(){
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
})
