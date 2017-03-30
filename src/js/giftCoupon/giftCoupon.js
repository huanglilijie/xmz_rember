define([
  '../lib/common'
],function (common) {
	$(".reg").on('click',function(){
		$('.coumask').show();
		$('.giftCou').show();
	})
	$(".toCode").on('click',function(){
		$('.codemask').show();
		$('.smCode').show();
	})
	$(".close").on('click',function(){
		$('.mask').hide();
	})
	$(".togift").on('click',function(){
		$('.mask').hide();
		$('.coumask').show();
		$('.giftCou').show();
	})

})
