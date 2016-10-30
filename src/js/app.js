const $ = window.jQuery

window.addEventListener('scroll', () =>{
  var scrollvalue = $(window).scrollTop();
	$(".single-post .post-thumbnail img").css("top", scrollvalue / 20 + 50 + "%");
});
