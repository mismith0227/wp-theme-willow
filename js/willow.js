window.onscroll = function (e) {
	var scrollvalue = jQuery(window).scrollTop();
	jQuery(".single-post .post-thumbnail img").css("top", scrollvalue / 20 + 50 + "%");
}
