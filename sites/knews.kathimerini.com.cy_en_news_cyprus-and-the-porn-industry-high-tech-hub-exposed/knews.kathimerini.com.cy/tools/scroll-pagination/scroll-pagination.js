(function($) {

	$.fn.scrollPagination = function(options) {
		
		var settings = { 
			template: '', // template
			nop     : 10, // The number of posts per scroll to be loaded
			offset  : 0, // Initial offset, begins at 0 in this case
			error   : 'No More Posts!', // When the user reaches the end this is the message that is
			                            // displayed. You can change this if you want.
			xparams : {},										
			delay   : 500, // When you scroll down the posts will load after a delayed amount of time.
			               // This is mainly for usability concerns. You can alter this as you see fit
			scroll  : true // The main bit, if set to false posts will not load as the user scrolls. 
			               // but will still load if the user clicks.
		}
		
		// Extend the options so they work with the plugin
		if(options) {
			$.extend(settings, options);
		}
		
		// For each so that we keep chainability.
		return this.each(function() {	
			
			// Some variables 
			$this = $(this);
			$settings = settings;
			var offset = $settings.offset;
			var busy = false; // Checks if the scroll action is happening 
			                  // so we don't run it multiple times
			
			// Custom messages based on settings
			if($settings.scroll == true) $initmessage = 'Scroll for more or click here';
			else $initmessage = 'Click for more';
			
			// Append custom messages and extra UI
			//$this.append('<div class="content"></div><div class="loading-bar">'+$initmessage+'</div>');
			$("#nav").html('<div class="loading-bar">'+$initmessage+'</div>');
			
			function getData() {
				// Post data to ajax.php
				$.post('modules/ws_mod_wnp_01/pages/'+$settings.template+'/show_morearticles.php', {
					action        : 'scrollpagination',
				    number        : $settings.nop,
				    offset        : offset,
					xparams	   : $settings.xparams,
					    
				}, function(data) {
					// Change loading bar content (it may have been altered)
					$("#nav").find('.loading-bar').html($initmessage);
						
					// If there is no data returned, there are no more posts to be shown. Show error
					console.log('Data:'+data+'--');
					if ((data == "")||(!data)) { 
						$("#nav").find('.loading-bar').html($settings.error).fadeOut(2000);	
					} else {
						// Offset increases
					    //offset = offset+$settings.nop; 
					    offset = offset+1; 
						    
						// Append the data to the content div
					   	//$this.find('.content').append(data);
					   	$this.append(data).find('.art_rec_hide').fadeIn(1000).removeClass("art_rec_hide");
						
						//hash = '#pagenum='+offset;
						//window.location.hash = hash;
						
						// No longer busy!	
						busy = false;
					}	
				});
			}	
			
			getData(); // Run function initially
			
			// If scrolling is enabled
			if($settings.scroll == true) {
				// .. and the user is scrolling
				$(window).scroll(function() {
					
					// Check the user is at the bottom of the element
					if($(window).scrollTop() + $(window).height() > $this.height() && !busy) {
						
						// Now we are working, so busy is true
						busy = true;
						
						// Tell the user we're loading posts
						$("#nav").find('.loading-bar').html('Loading Posts');
						
						// Run the function to fetch the data inside a delay
						// This is useful if you have content in a footer you
						// want the user to see.
						setTimeout(function() {
							
							getData();
							
						}, $settings.delay);
							
					}	
				});
			}
			
			// Also content can be loaded by clicking the loading bar/
			$("#nav").find('.loading-bar').click(function() {
			
				if(busy == false) {
					busy = true;
					getData();
				}
			
			});
		});
	}
})(jQuery);
