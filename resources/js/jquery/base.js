$(window).ready(function() {
	$.ajaxSetup({
		beforeSend: function(xhr, settings) {
			console.log('ajax-start');
			// if ( settings.url.match(/^https:\/\/(beta.|dev.|dev2.|business.)*peopletail.com/ig) ) {
				xhr.setRequestHeader('X-CSRF-TOKEN', $('meta[name="csrf-token"]').attr('content'));
			// }
			if ( $(settings.context).hasClass('ajax-on-el') ) {
				settings.cancel = true;
				return false;
			}
			$(settings.context).addClass('ajax-on-el');
		}
	});
	$(document).ajaxStart(function() {
		$('body').addClass('ajax-on');
	}).ajaxStop(function() {
		$('body').removeClass('ajax-on');
	}).ajaxSuccess(function(e, request, settings, data) {
		// if ( ! settings.url.match(/^https:\/\/(beta.|dev.|dev2.|business.)*peopletail.com/ig) ) {
		// 	// do nothing
		// } else 
		if ( data.redirect ) {
			window.location = data.redirect;
		} else {
			var target = $(settings.context);
			$.each(data,function(i,d){
				if ( ! Object.keys($.fn).includes(i) ) return;
				$.each(d,function(j,k) { $(j)[i](k); });
			});
			if ( target.attr('data-ajax-event') ) {
				$(document).trigger(target.attr('data-ajax-event'),data);
			} else {
				target.trigger('done',data);
			}
			$.each(data.notify,function(i,d) { $.notify({ message: d },{ type: i }); });
			$(settings.context).removeClass('ajax-on-el');
		}
	}).ajaxError(function(e, jqXHR, settings, thrownError) {
		if ( settings.cancel ) return true;  // canceled by beforeSend

		var data;
		try {
			data = JSON.parse(jqXHR.responseText);
		} catch(e) {
			// do nothing
			data = false;
		}
		if ( data && data.errors ) { // && jqXHR.status == 422 ) {
			$.each(data.errors,function(i,d) { $.notify({ message: d},{ type: 'danger' }) });
		} else {
			$.notify({ message: 'System error encountered.  Please try again later' }, { type: 'danger' });
		}
		$(settings.context).removeClass('ajax-on-el');
	});
});

$.notifyDefaults({
	placement: {
		from: "top",
		align: "center"
	},
	delay: 3000
});
