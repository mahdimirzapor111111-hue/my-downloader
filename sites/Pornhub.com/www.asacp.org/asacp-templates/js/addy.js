function donothing() {}

function mlink(name,subject) {
	var a = '@';
	var m = 'mai';
	var d = '.';
	var s = '?sub'
	var j = 'ject=';
	var t = 'lto:';
	var addy = name + a + 'asacp' + d + 'org';
	var href = m + t + addy + s + j + subject;
	return href;
}

function mredirect(name,subject) {
	var link = mlink(name,subject);
	window.location = link;
}

