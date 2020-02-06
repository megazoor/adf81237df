require(['jquery', 'jquery/ui', 'jquery/jquery.cookie'], function ($) {
    /* Dropdown Hover */
    !function (a, b, c) {
        var d = a();
        a.fn.dropdownHover = function (c) {
            return d = d.add(this.parent()), this.each(function () {
                function n(a) {
                    b.clearTimeout(l), b.clearTimeout(m), m = b.setTimeout(function () {
                        d.find(":focus").blur(), k.instantlyCloseOthers === !0 && d.removeClass("open"), b.clearTimeout(m), e.attr("aria-expanded", "true"), f.addClass("open"), e.trigger(i)
                    }, k.hoverDelay)
                }

                var l, m, e = a(this), f = e.parent(), g = {delay: 100, hoverDelay: 100, instantlyCloseOthers: !0},
                    h = {delay: a(this).data("delay"), hoverDelay: a(this).data("hover-delay"), instantlyCloseOthers: a(this).data("close-others")}, i = "show.bs.dropdown",
                    j = "hide.bs.dropdown", k = a.extend(!0, {}, g, c, h);
                f.hover(function (a) {
                    n(a)
                }, function () {
                    b.clearTimeout(m), l = b.setTimeout(function () {
                        e.attr("aria-expanded", "false"), f.removeClass("open"), e.trigger(j)
                    }, k.delay)
                }), e.hover(function (a) {
                    n(a)
                }), f.find(".parent").each(function () {
                    var d, c = a(this);
                    c.hover(function () {
                        b.clearTimeout(d), c.addClass("open")
                    }, function () {
                        d = b.setTimeout(function () {
                            c.removeClass("open")
                        }, 0)
                    })
                })
            })
        }
    }(jQuery, window);

    jQuery(document).ready(function ($) {

        $('.main-header-search-menu > .widget.block-static-block').remove();

        $(document).on('click', '.field.choice.related', function (e) {
            $(this).find('.checkbox').trigger('click');
        });

        $('.theme-popup-link').click(function () {
            openThemePopup($(this).attr('data-href'));
        });
        $('.theme-popup-close').click(function () {
            closeThemePopup($(this));
        });
        $(document).on('keyup', '.input-text:not("#password")', function (event) {
            var errorContainer = $(this).next('.mage-error');
            if (errorContainer.length) {
                errorContainer.fadeOut('100');
            }
        });

        $(document).on('click', '.minicart-items .action.edit', function (e) {
            e.preventDefault();
            window.location.href = $(this).attr('href');
        });

        // search button
        $('.header-search-button,.header-search-closebutton').on('click', function () {
            $('.main-header-search .block-search,.header-search-closebutton').toggle();
        });

        // nav menu item
        $('.nav-menu-button').on('click', function () {
            $(this).parent('.navigation-menu-container').toggleClass('active');
        });

        // mobile checkout aside close
        $(document).on('click', '.modal-custom.opc-sidebar + .modal-custom-overlay', function () {
            $('.modal-custom.opc-sidebar').find('.action-close').trigger('click');
        });

        // spinner
        $(document).on('click', '[data-toggle="spinner"]', function (e) {
            e.preventDefault();
            spinner($(this).attr('data-target'), $(this).attr('data-value'));
        });
        $(".qty").on("keypress keyup blur", function (event) {
            $(this).val($(this).val().replace(/[^\d].+/, ""));
            if ((event.which < 48 || event.which > 57)) {
                event.preventDefault();
            }
        });

        // cms menu
        if ($('.cms-menu--pages').length) {
            var dataTitle = $('.cms-page').attr('class').replace("cms-page ", "");
            $('.cms-menu > li[data-name=' + dataTitle + ']').addClass('active');
        }

        // cart buttons
        $('.cart-right-update').click(function () {
            $('[name="update_cart_action"]').trigger('click');
        });

        // open-close slider menus
        $('body').on('click', '.mobile-menu-button', function (e) {
            if ($('body').hasClass('navOpen')) {
                $('body').removeClass('navOpen');
            } else {
                $('body').addClass('navOpen');
            }
            $('.main-navigation').slideToggle();
        });

        $(document).on('click', '.mobile-filter-button', function (event) {
            $('body').toggleClass('filterOpen');
        });

        $('.mobile-links-button').click(function (event) {
            if ($('body').hasClass('linksOpen')) {
                $('body').removeClass('linksOpen');
            } else {
                $('body').addClass('linksOpen');
            }
        });

        $('.backdrop,.menu-account-links > a').click(function () {
            if ($('body').hasClass('navOpen')) {
                $('body').removeClass('navOpen');
            }
            if ($('body').hasClass('filterOpen')) {
                $('body').removeClass('filterOpen');
            }
            if ($('body').hasClass('linksOpen')) {
                $('body').removeClass('linksOpen');
            }
        });

        $(document).on('click', '.footer-menu-item__title', function (e) {
            if ($(window).width() < 768) {
                e.preventDefault();
                e.stopPropagation();
                $(this).parent().toggleClass('open');
                $(this).parent('.footer-menu-item').siblings('.footer-menu-item').removeClass('open');
                $('.main-navigation .open').removeClass('open');
            }
        });

        responsive();
        $(window).resize(responsive);
        window.addEventListener('orientationchange', responsive);

        function responsive() {
            if (window.matchMedia('(max-width: 767px)').matches) {

                if (!$('.columns .sidebar-main')[0]) {
                    if (!$('#dummyToolbar')[0]) {
                        $('.mobile-filter-button').hide();
                        $('.mobile-filter-button').after('<div id="dummyToolbar" style="width:110px;order:10;"></div>');
                    }
                }

                $('.navigation-menu-container').appendTo('nav.main-navigation');
                $('.minicart-container').insertAfter('.main-header-search-menu');

                if (!$('.main-navigation .parent-link').length) {
                    $('.main-navigation .parent').each(function () {
                        $("<span class='parent-link'></span>").insertAfter($(this).children('a'));
                    });
                }
                $('body').on('click', '.main-navigation ul li.parent > a', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    $(this).parent().siblings().removeClass('open');
                    $('.footer-menu-item').removeClass('open');
                    $(this).parent().toggleClass('open');
                });

                $('body').on('click', '.block-search .block-title', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    $(this).siblings('.block-content').toggleClass('open');
                    $('body').toggleClass('search-open');
                    $('.main-header-in').toggleClass('search-open');
                    if (!$('body').hasClass('search-open') == true) {
                        $('#algolia-autocomplete-container .aa-dropdown-menu').hide();
                    }
                });

                $(document).on('click', '.product-page-tabs-labels__item>a', function (e) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    $(this).parent('.product-page-tabs-labels__item').siblings('.product-page-tabs-labels__item').removeClass('active');
                    $(this).parent('.product-page-tabs-labels__item').toggleClass('active');
                    $(window).scrollTop($(this).offset().top - 60);
                    return false
                });

            } else if (window.matchMedia('(min-width: 768px)').matches) {

                $('.navigation-menu-container').insertAfter('.main-header-search-menu');
                $('.minicart-container').appendTo('.main-header-menu');

                if ($('.main-navigation .parent-link').length) {
                    $('.parent-link').remove();
                }
                jQuery('.main-navigation ul li.level0.parent > a').dropdownHover();

                $(window).on('scroll', function () {
                    if($('.main-header-logo').length){
                        var wSc = $(window).scrollTop();
                        var initVal = $('.main-header-logo').offset().top + $('.main-header-logo').height();
                        if (wSc >= initVal) {
                            $('.main-header-menu').addClass('sticky');
                        } else {
                            $('.main-header-menu').removeClass('sticky');
                        }
                    }
                });

                if (is_touch_device()) {
                    $('body').on('click', '.main-navigation ul li.parent > a', function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        return false
                    });
                    $('body').on('touchstart', '.main-navigation ul li.parent > a', function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        $(this).parent().siblings().removeClass('open');
                        $(this).parent().toggleClass('open');
                    });
                }
            }
        }
    });

    function is_touch_device() {
        return (('ontouchstart' in window)
            || (navigator.MaxTouchPoints > 0)
            || (navigator.msMaxTouchPoints > 0));
    }

    function openThemePopup(id) {
        var popupDiv = jQuery("[data-id='" + id + "']");
        popupDiv.addClass('active');
        setTimeout(function () {
            popupDiv.addClass('visible');
        }, 200)
    }

    function closeThemePopup(elem) {
        var popupDiv = elem.parents('.theme-popup');
        popupDiv.removeClass('visible');
        setTimeout(function () {
            popupDiv.removeClass('active');
        }, 200)
    }

    function spinner(id, increment) {
        var spinnerElement = jQuery('#' + id),
            minVal = parseInt(spinnerElement.attr('data-min')),
            increment = parseInt(increment),
            realVal = parseInt(spinnerElement.val());
        if (increment > 0) {
            spinnerElement.val(realVal + increment);
        } else {
            if (realVal > minVal) {
                spinnerElement.val(realVal + increment);
            }
        }

    }
});