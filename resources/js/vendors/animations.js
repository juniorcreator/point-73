function generate_animations() {
	wm_animations = document.querySelectorAll('.wm_animation');
	scroll_array = {};
	for (var i = 0; i < wm_animations.length; i++) {
		scroll_array[i] = {};
		wm_animations[i].setAttribute('id', 'wm-animation-' + i);
		scroll_array[i]['hide'] = true;
		scroll_array[i]['type'] = wm_animations[i].getAttribute('data-animation-type');
		scroll_array[i]['duration'] = wm_animations[i].getAttribute('data-animation-duration');
		if ( scroll_array[i]['type'] == 'fall' ) {
			var computedStyle = getComputedStyle(wm_animations[i]);
			top_margin = parseInt(computedStyle.top, 10);
			scroll_array[i]['scroll'] = ( wm_animations[i].getBoundingClientRect().top ) - ( window.innerHeight )  + ( wm_animations[i].offsetHeight * 0.85 ) - ( top_margin );
		} else {
			scroll_array[i]['scroll'] = ( wm_animations[i].getBoundingClientRect().top ) - ( window.innerHeight )  + ( wm_animations[i].offsetHeight * 0.85 );
		} 		 		 		 
	}
	return scroll_array;
}


$(document).ready(
	function(){
	setTimeout(function(){
animations = generate_animations();
console.log(animations);
check_animations();
	},3000);
});

function check_animations() {
	for ( var i = 0; i < Object.keys(animations).length; i++) {
		if ( ( $(this).scrollTop() > animations[i]['scroll'] ) && ( animations[i]['hide'] ) ) {
			animations[i]['hide'] = false;
			if ( ! animations[i]['duration'] ) {
				duration = false
			} else {
				duration = animations[i]['duration'];
			}
			go_animation( i, animations[i]['type'], duration );
		}
		
	}
}

if ( !(window.innerWidth < 1170) ) {
$( window ).scroll(check_animations);

}


function go_animation(id, type, duration = false){

	if ( type == 'fall' ) {

		$('#wm-animation-'+id).animate({opacity:1,top:'0px'}, (duration)*1,'swing');

	} else if ( type == 'opacity' ) {

		$('#wm-animation-'+id).animate({opacity:1}, (duration)*1,'linear');
	} else if ( type == 'height' ) {
		var need_height = $('#wm-animation-'+id).attr('data-animation-height');
		$('#wm-animation-'+id).animate({height: need_height + 'px'}, (duration)*1,'linear');
	} else if ( type == 'width' ) {
		var need_width = $('#wm-animation-'+id).attr('data-animation-width');
		$('#wm-animation-'+id).animate({width: need_width}, (duration)*1,'linear');
	} else if ( type == 'left' ) {
		$('#wm-animation-'+id).animate({opacity:1,left:'0px'}, (duration)*1,'linear');
	} else if ( type == 'right' ) {
		$('#wm-animation-'+id).animate({opacity:1,right:'0px'}, (duration)*1,'linear');
	} else if ( type == 'numbers' ) {
		$('#wm-animation-'+id).animate({opacity:1,top:'0px'}, (duration)*1,'swing');
		      $('.sales-instrument__item span').spincrement({
        thousandSeparator: "",
        duration: 4000
      });
	}
}