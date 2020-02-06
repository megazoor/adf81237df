require(['jquery', 'jquery/ui', 'jquery/jquery.cookie', 'jquery/jquery-storageapi', 'Magento_Customer/js/customer-data'], function ($) {
    jQuery(document).ready(function ($) {

        $('.main-navigation li.products-toggle').on('mouseover', function (event) {
            $(this).addClass('open');
        });
        $('.main-navigation li.products-toggle').on('mouseleave', function (event) {
            $(this).removeClass('open');
        });

        $(window).on('scroll', function(){
        	var wH = $(window).height();
        	var docH = $('html').height();
        	var bV = wH - 100;
        	var scPos = $(window).scrollTop();
        	var opVal = 0;
        	if (scPos >= bV) {
        		var curr = scPos - bV;
        		$('#scroll-to-top').css('visibility', 'visible');
        		opVal = curr / docH;
        		if (opVal >=1) {
        			opVal = 1;
        		}
        	} else {
        		$('#scroll-to-top').css('visibility', 'hidden');
        	}
        	$('#scroll-to-top').css('opacity', opVal);
        });

    });

});