$(document).ready(function () {
	$('.menu_top').mouseover(
		function () { 
			$(this).children('.menu_sub').css('visibility','visible').show(); 
		}
	);
	$('.menu_top').mouseout(
		function () { $(this).children('.menu_sub').hide(); }
	);
	$('.memberlist').click(
		function () { 
			$(this).children('.memberurls').each(function () {
				if ($(this).css('display') == 'none') $(this).show();
				else $(this).hide();
			});
		}
	);
});
