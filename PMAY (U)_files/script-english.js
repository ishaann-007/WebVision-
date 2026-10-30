$(document).ready(function() {

    "use strict";

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    if ($('#process_under_pmay').length !== 0) {
        $.ajax({
            method: 'GET',
            url: APP_URL + '/api/en/processes',
            success: function(data) {
                if (data) {
                    $('#process_under_pmay').html('');
                    $('#process_under_pmay').html(data);
                }
            }
        });
    }

    if ($('#beneficiary-wrapp').length !== 0) {
        $.ajax({
            method: 'GET',
            url: APP_URL + '/api/en/beneficiaries',
            success: function(data) {
                if (data) {
                    $('#beneficiary-wrapp').html('');
                    $('#beneficiary-wrapp').html(data);
                }
            }
        });
    }

    if ($('#partner_slider').length !== 0) {
        $.ajax({
            method: 'GET',
            url: APP_URL + '/getpartnerslider',
            success: function(data) {
                if (data) {
                    $('#partner_slider').html('');
                    $('#partner_slider').html(data);
                }
            }
        });
    }

    if ($('#count1').length !== 0 || $('#count2').length !== 0 || $('#count3').length !== 0) {
        $.ajax({
            method: 'GET',
            url: APP_URL + '/angikaarapi',
            success: function(data) {
                if (data) {
                    var arraydata = data.split('*');
                    $('#count1').html(arraydata[0]);
                    $('#count2').html(arraydata[1]);
                    $('#count3').html(arraydata[2]);
                    $('#count4').html(arraydata[3]);
                    $('#count5').html(arraydata[4]);
                    $('#count6').html(arraydata[5]);
                    $('#count7').html(arraydata[6]);
                    $('#count8').html(arraydata[7]);
                    $('#count9').html(arraydata[8]);
                    $('#count10').html(arraydata[9]);
                    $('#count11').html(arraydata[10]);
                    $('#count12').html(arraydata[11]);
                }
            }
        });
    }

    if ($('#home-slider').length !== 0) {
        $('#home-slider').carousel({ 
            interval: false,
            // autoplay: true,
            // autoplayTimeout: 100,
            // autoplayHoverPause: true
        });
    }

    if ($('#content-slider').length !== 0) {
        $('#content-slider').lightSlider({
            loop: true,
            keyPress: true
        });
    }

    if ($('#image-gallery').length !== 0) {
        $('#image-gallery').lightSlider({
            gallery: true,
            item: 1,
            thumbItem: 9,
            slideMargin: 0,
            speed: 1000,
            auto: true,
            loop: true,
            onSliderLoad: function() {
                $('#image-gallery').removeClass('cS-hidden');
            }
        });
    }

    if ($('.tabset0').length !== 0) {
        $('.tabset0').pwstabs({
            tabsPosition: 'vertical',
            responsive: true,
            effect: 'scale'
        });
    }

    if ($('.lightbox-image').length !== 0) {
        $('.lightbox-image').fancybox();
    }

    if ($('.masonry-gallery').length > 0 || $('.masonry-grid').length > 0 || $('.masonry-grid-fitrows').length > 0) {
        $(window).on('load', function() {
            $('.masonry-gallery').fadeIn();
            var $container = $('.masonry-gallery').isotope({
                itemSelector: '.isotope-item',
                layoutMode: 'masonry',
                transitionDuration: '0.6s',
                filter: "*"
            });
            $('.masonry-grid').isotope({
                itemSelector: '.masonry-grid-item',
                layoutMode: 'masonry'
            });
            $('.masonry-grid-fitrows').isotope({
                itemSelector: '.masonry-grid-item',
                layoutMode: 'fitRows'
            });
            $('.masonry-filter').on('click', 'li a', function() {
                var filterValue = $(this).attr('data-filter');
                $(".masonry-filter").find("a.active").removeClass("active");
                $(this).parent().addClass("active");
                $container.isotope({ filter: filterValue });
                return false;
            });
        });
    }

    if ($('.masonry-filters').length !== 0) {
        $('.masonry-filters').each(function(i, buttonGroup) {
            var $buttonGroup = $(buttonGroup);
            var $grid = $buttonGroup.next('.grid');
            $grid.imagesLoaded(function() {
                $grid.isotope({
                    itemSelector: '.grid-item',
                    layoutMode: 'packery'
                })
            });
            $buttonGroup.on('click', 'li', function() {
                var $this = $(this);
                var filterValue = $this.attr('data-filter');
                $grid.isotope({ filter: filterValue });
                $buttonGroup.find('.active').removeClass('active');
                $this.addClass('active');
            });
        });
    }

    if ($(".popup-img").length > 0 || $(".mfp-iframe").length > 0 || $(".mfp-img-single").length > 0) {
        $(".popup-img").magnificPopup({
            type: "image",
            gallery: {
                enabled: true,
            }
        });
        $(".mfp-img-single").magnificPopup({
            type: "image",
            gallery: {
                enabled: false,
            }
        });
        $('.mfp-iframe').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            preloader: false,
            fixedContentPos: false
        });
        $('.mfp-youtube, .mfp-vimeo, .mfp-gmaps').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false,
            iframe: {
                patterns: {
                    youtube: {
                        src: '//www.youtube.com/embed/%id%?autoplay=1&rel=0'
                    }
                }
            }
        });
        $('.mfp-youtube, .mfp-vimeo').on('click', function(e) {
            return false;
        });
        $('.ulockd_music_icon').on('click', function() {
            $('.music_icon_frame').fadeToggle('1500');
        });
    }

    if ($('#lightgallery').length !== 0) {
        $('#lightgallery').lightGallery();
    }

    if ($('#basicSlider').length !== 0) {
        $('#basicSlider').multislider({
            continuous: true,
            duration: 2000
        });
    }

    if ($('#exampleSlider').length !== 0) {
        $('#exampleSlider').multislider({
            interval: 6000,
            slideAll: true,
            duration: 3000
        });
    }

    if ($('#exampleSlider1').length !== 0) {
        $('#exampleSlider1').multislider({
            interval: 6000,
            slideAll: true,
            duration: 3000
        });
    }

    if ($('#exampleSlider2').length !== 0) {
        $('#exampleSlider2').multislider({
            continuous: true,
            interval: 6000,
            slideAll: true,
            duration: 3000
        });
    }

    if ($('#exampleSlider3').length !== 0) {
        $('#exampleSlider3').multislider({
            interval: 6000,
            slideAll: true,
            duration: 3000
        });
    }

    if ($('#exampleSlider4').length !== 0) {
        $('#exampleSlider4').multislider({
            interval: 6000,
            slideAll: true,
            duration: 3000
        });
    }

    if ($('#exampleSlider5').length !== 0) {
        $('#exampleSlider5').multislider({
            interval: 6000,
            slideAll: true,
            duration: 3000
        });
    }
});

$('.dropdown-menu a.dropdown-toggle').on('click', function(e) {
    if (!$(this).next().hasClass('show')) {
        $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
    }
    var $subMenu = $(this).next(".dropdown-menu");
    $subMenu.toggleClass('show');
    $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function(e) {
        $('.dropdown-submenu .show').removeClass("show");
    });
    return false;
});

function preloaderLoad() {
    if ($('.preloader').length) {
        $('.preloader').delay(200).fadeOut(300);
    }
    $(".preloader_disabler").on('click', function() {
        $("#preloader").hide();
    });
}

function wowAnimation() {
    var wow = new WOW({
        animateClass: 'animated',
        mobile: true,
        offset: 0
    });
    wow.init();
}

function scrollToTop() {
    $(window).scroll(function() {
        if ($(this).scrollTop() > 600) {
            $('.scrollToHome').fadeIn();
        } else {
            $('.scrollToHome').fadeOut();
        }
    });
    $('.scrollToHome').on('click', function() {
        $('html, body').animate({ scrollTop: 0 }, 800);
        return false;
    });
}

window.onscroll = function() {
    myFunction()
};

var header = document.getElementById("myHeader");
var sticky = header.offsetTop;

function myFunction() {
    if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
}

function getstatecitydistrictval() {
    $("#overlay").fadeIn(300);
    var state = $('#state_name').val();
    var city_wise = $('#city_wise').val();
    var elements = document.getElementsByClassName("btn clickk");
    for (var i = 0; i < elements.length; i++) {
        var uri = elements[i].href;
        if (uri.indexOf("?") > 0) {
            var clean_uri = uri.substring(0, uri.indexOf("?"));
            clean_uri = clean_uri + '?component=' + city_wise;
            elements[i].href = clean_uri;
        }
    }
    if (state != '') {
        var district = $('#district_name').val();
        var city = $('#city_name').val();
        $.ajax({
            method: 'POST',
            data: { state: state, district: district, city: city, city_wise: city_wise },
            url: APP_URL + '/angikaarapistatewisedata',
            success: function(data) {
                if (data) {
                    var arraydata = data.split('*');
                    $('#count1').html(arraydata[0]);
                    $('#count2').html(arraydata[1]);
                    $('#count3').html(arraydata[2]);
                    $('#count4').html(arraydata[3]);
                    $('#count5').html(arraydata[4]);
                    $('#count6').html(arraydata[5]);
                    $('#count7').html(arraydata[6]);
                    $('#count8').html(arraydata[7]);
                    $('#count9').html(arraydata[8]);
                    $('#count10').html(arraydata[9]);
                    $('#count11').html(arraydata[10]);
                    $('#count12').html(arraydata[11]);
                }
            }
        }).done(function() {
            setTimeout(function() {
                $("#overlay").fadeOut(300);
            }, 500);
        });
    } else {
        $.ajax({
            method: 'GET',
            url: APP_URL + '/angikaarapi?component=' + city_wise,
            success: function(data) {
                if (data) {
                    var arraydata = data.split('*');
                    $('#count1').html(arraydata[0]);
                    $('#count2').html(arraydata[1]);
                    $('#count3').html(arraydata[2]);
                    $('#count4').html(arraydata[3]);
                    $('#count5').html(arraydata[4]);
                    $('#count6').html(arraydata[5]);
                    $('#count7').html(arraydata[6]);
                    $('#count8').html(arraydata[7]);
                    $('#count9').html(arraydata[8]);
                    $('#count10').html(arraydata[9]);
                    $('#count11').html(arraydata[10]);
                    $('#count12').html(arraydata[11]);
                }
            }
        }).done(function() {
            setTimeout(function() {
                $("#overlay").fadeOut(300);
            }, 500);
        });
    }
}