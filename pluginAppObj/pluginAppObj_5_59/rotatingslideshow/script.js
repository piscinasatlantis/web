x5engine.boot.push(function(){
	
	var slideShow = $('#pluginAppObj_5_59 #slideShow'),
		ul = slideShow.find('ul'),
		li = ul.find('li'),
		cnt = li.length,
        app_id = 'pluginAppObj_5_59';

	// As the images are positioned absolutely, the last image will be shown on top.
	// This is why we force them in the correct order by assigning z-indexes:
	
	updateZindex();

	if(Modernizr.csstransforms3d){
	
		// Modern browsers with support for css3 transformations
	
		// Binding a custom event. the direction and degrees parameters
		// are passed when the event is triggered later on in the code.
	
		slideShow.bind('rotateContainer',function(e,direction,degrees){
            
			// Enlarging the slideshow and photo:
			
			slideShow.animate({
				width		: '90%',
				height		: '110%',
				marginTop	: '-5%',
				marginLeft	: '-5%',
			},'fast',function(){
				
				if(direction == 'next'){
				
                    $('#' + app_id + ' #slideShow li:nth-child(2)').css('rotate', '-90deg');
                    
					$('#' + app_id + ' #slideShow li:nth-child(2)').animate({
                        rotate: '0deg'
                        },{duration: 600, queue:false});
                    
                    $('#' + app_id + ' #slideShow li:first').animate({
                        rotate: '90deg'
                        },{duration: 600, queue:false});
                    
					$('#' + app_id + ' #slideShow li:first').fadeOut('slow',function(){
						$(this).remove().appendTo(ul).show();
						updateZindex();
					});
				}
				else {
					
                    $('#' + app_id + ' #slideShow li:last').css('rotate', '90deg');
                    
					$('#' + app_id + ' #slideShow li:last').animate({
                        rotate: '0deg'
                        },{duration: 600, queue:false});
                    
                    $('#' + app_id + ' #slideShow li:first').animate({
                        rotate: '-90deg'
                        },{duration: 600, queue:false});
					
					var liLast = $('#' + app_id + ' #slideShow li:last').hide().remove().prependTo(ul);
					updateZindex();
					liLast.fadeIn('slow');
				}
				
				// Rotating the slideShow. css('rotate') gives us the
				// current rotation in radians. We are converting it to
				// degress so we can add 90 or -90 to rotate it to its new value.
				
				slideShow.animate({
					width		: '80%',
                    height		: '100%',
					marginTop	: '0%',
					marginLeft	: '0%',
				},'fast');
			});
		});
		
		// By triggering the custom events below, we can 
		// show the previous / next images in the slideshow.
		
		slideShow.bind('showNext',function(){
			slideShow.trigger('rotateContainer',['next',90]);
		});
		
		slideShow.bind('showPrevious',function(){
			slideShow.trigger('rotateContainer',['previous',-90]);
		});
	}
	
	else{
		
		// Fallback for Internet Explorer and older browsers
		
		slideShow.bind('showNext',function(){
			$('#' + app_id + ' #slideShow li:first').fadeOut('slow',function(){
				$(this).remove().appendTo(ul).show();
				updateZindex();
			});
		});
		
		slideShow.bind('showPrevious',function(){
			var liLast = $('#' + app_id + ' #slideShow li:last').hide().remove().prependTo(ul);
			updateZindex();
			liLast.fadeIn('slow');
		});
	}
	
	// Listening for clicks on the arrows, and
	// triggering the appropriate event.
	
	$('#' + app_id + ' #previousLink').click(function(){
		if(slideShow.is(':animated')){
			return false;
		}
		
		slideShow.trigger('showPrevious');
		return false;
	});
	
	$('#' + app_id + ' #nextLink').click(function(){
		if(slideShow.is(':animated')){
			return false;
		}
		
		slideShow.trigger('showNext');
		return false;
	});
	
	// This function updates the z-index properties.
	function updateZindex(){
		
		// The CSS method can take a function as its second argument.
		// i is the zero-based index of the element.
		
		ul.find('li').css('z-index',function(i){
			return cnt-i;
		});
	}

});