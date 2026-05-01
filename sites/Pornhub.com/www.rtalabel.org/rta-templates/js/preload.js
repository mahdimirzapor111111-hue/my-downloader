<!-- ImageReady Preload Script (menu3.psd) -->
function newImage(arg) {
	if (document.images) {
		rslt = new Image();
		rslt.src = arg;
		return rslt;
	}
}
function changeImages() {
	if (document.images && (preloadFlag == true)) {
		for (var i=0; i<changeImages.arguments.length; i+=2) {
			document[changeImages.arguments[i]].src = changeImages.arguments[i+1];
		}
	}
}
var preloadFlag = false;
function preloadImages() {
	if (document.images) {
		home_over = newImage("images/menu-over_01.gif");
		howto_over = newImage("images/menu-over_02.gif");
		faq_over = newImage("images/menu-over_03.gif");
        awards_over = newImage("images/menu-over_04.gif");
		news_over = newImage("images/menu-over_05.gif");
		parents_over = newImage("images/menu-over_06.gif");
        partners_over = newImage("images/menu-over_07.gif");
		contact_over = newImage("images/menu-over_08.gif");
		preloadFlag = true;
	}
}
<!-- End Preload Script -->
