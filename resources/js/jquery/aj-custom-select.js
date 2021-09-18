(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// Node/CommonJS
		factory(require('jquery'));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {

    $.fn.ajCustomSelect = function() {

	return this.each(function() {

        var $this = $(this), numberOfOptions = $this.children('option').length;
    
        $this.addClass('select-hidden'); 
        $this.wrap('<div class="cs-select"></div>');
        $this.after('<div class="select-styled"></div>');

        var $styledSelect = $this.next('div.select-styled');
	if ( $this.val() && $this.val() != "0" ) {
		$styledSelect.text($this.children('option[value="'+$this.val()+'"]').text());
	} else {
		$styledSelect.text($this.children('option').eq(0).text()).addClass('placeholder');
	}
    
        var $list = $('<ul />', {
            'class': 'select-options'
        }).insertAfter($styledSelect);
    
        for (var i = 0; i < numberOfOptions; i++) {
            $('<li />', {
                text: $this.children('option').eq(i).text(),
                rel: $this.children('option').eq(i).val()
            }).appendTo($list);
        }
    
        var $listItems = $list.children('li');
    
        $styledSelect.click(function(e) {
            e.stopPropagation();
            $(this).toggleClass('active');
        });
    
        $listItems.click(function(e) {
            e.stopPropagation();
            
	    const wrapper = $(e.currentTarget).parents('.cs-select');
	    let selectStyled = wrapper.find('.select-styled');
	    selectStyled.text(e.currentTarget.textContent).removeClass('active');

//            $styledSelect.text($(this).text()).removeClass('active');
//            $this.val($(this).attr('rel'));
        
            if(e.currentTarget.textContent === $this.children('option').eq(0).text()){
                selectStyled.addClass('placeholder');
            } else {
                selectStyled.removeClass('placeholder');
            }
        });
    
        $(document).click(function() {
            $('.select-styled.active').removeClass('active');
        });

	});
    };

}));
$('select.aj-custom-select').ajCustomSelect();