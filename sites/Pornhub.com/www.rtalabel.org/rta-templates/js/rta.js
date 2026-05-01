/* ajax check of a url's contents for the RTA label using jquery */
/* have to run this through a local script to get foreign domains */
rtalabel = 'RTA-5042-1996-1400-1577-RTA';
domainpat = /^\s*(https*:\/\/|)(.*?:.*?@|)([a-zA-Z0-9][a-zA-Z0-9-]*\.)*[a-zA-Z0-9][a-zA-Z0-9-]*\.[a-zA-Z]{2,4}/;

/* does an XMLHTTPRequest to check a url for the RTA label */
function show_rtacheck_results() {
	var url = jQuery("#url").val();
	// var rc_response = jQuery("#recaptcha_response_field").val();
	var rc_response = jQuery("#g-recaptcha-response").val();
	// var rc_challenge = jQuery("#recaptcha_challenge_field").val();
	if (url.match(/^ *$/)) {
		alert("no url to check!");
	} else if (url.match(/[^ ] [^ ]/)) {
		alert("malformed url: spaces in the url");
	} else if (!url.match(domainpat)) {
		alert("malformed url: no domain found!");
	} else if (rc_response == '') { // || rc_challenge == '') {
		alert("no recaptcha found!");
	} else {
		jQuery("#rtacheck").html("Checking: please wait...");
		jQuery.post(
			"/ajax_handlers/rtachecker+ssl+rc2.php",
			{ 
			  url: url,
			  // recaptcha_response_field : rc_response,
			  // recaptcha_challenge_field : rc_challenge,
			  'g-recaptcha-response': rc_response
			},
			function (html) {
				// Recaptcha.reload();
				msg = "<li><b>" + url + ":</b><br>" + html;
				jQuery("#rtacheck").html(msg);
			}
		);
	}
	return false;
}

/* does an XMLHTTPRequest to check a url for the RTA label */
function save_rta_email(submitform) {
	var email = jQuery("#email").val();
	var apps = jQuery("#apps").val();
	var email_confirm = jQuery("#email_confirm").val();
	if (!email.match(/[a-zA-Z0-9_][a-zA-Z0-9_\-\.]*@[a-zA-Z0-9\-][a-zA-Z0-9\-\.]*\.[a-zA-Z]{2,4}/)) {
		alert("Invalid email address!");
	} else if (email != email_confirm) {
		alert("Emails don't match!");
		return false;
	} else {
		jQuery("#confirm_rta_email").html("saving email ...");
		jQuery.get(
			"/ajax_handlers/rtaemail.php",
			{ email : email, apps : apps },
			function (html) {
				msg = "<b>" + html + "</b>";
				jQuery("#confirm_rta_email").html(msg);
				if (submitform != false) window.location=submitform;
			}
		);
	}
	return false;
}

/* 
   use in form action to prevent form from being processed 
   eg <form action="javascript: donothing();">
*/
function donothing() {
}

