define([
  '../lib/common',
  '../lib/swiper.min'
],function (common,Swiper) {
  var mySwiper1 = new Swiper('#header',{
	  freeMode : true,
	  slidesPerView : 'auto',
  });

  var mySwiper2 = new Swiper('#banner',{
	  autoplay:5000,
	  visibilityFullFit : true,
	  loop:true,
	  pagination : '.pagination',
  });
})
