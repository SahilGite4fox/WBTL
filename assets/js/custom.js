$(document).ready(function () {

  // Sticky Header
  $(window).on("scroll", function () {
    $("header").toggleClass("stickyHead", $(this).scrollTop() > 0);
  });


  // Hamburger menu toggle
  $('.hambergerMenu').on('click', function () {
    $('.headNav > nav').toggleClass('active');
    $('body').toggleClass('menu-open');

    if (!$('.menu-overlay').length) {
      $('header').append('<div class="menu-overlay"></div>');
    }
  });

  // Close menu
  $(document).on('click', '.HamClose, .menu-overlay', function () {
    $('.headNav > nav').removeClass('active');
    $('body').removeClass('menu-open');
    $('.menu-overlay').remove();
  });

  // Accordion for sub-menus in mobile
  function bindAccordion() {
    if (window.innerWidth <= 1100) {
      $('.hasSub-menu > a').off('click').on('click', function (e) {
        e.preventDefault();

        const $parent = $(this).parent('.hasSub-menu');
        const $submenu = $parent.find('.sub-menu').first();
        const isOpen = $parent.hasClass('open');

        // Close all others
        $('.hasSub-menu.open').not($parent).each(function () {
          const $thisSub = $(this).find('.sub-menu');
          $(this).removeClass('open');
          $thisSub.css('height', $thisSub[0].scrollHeight + 'px');
          requestAnimationFrame(() => {
            $thisSub.css('height', '0');
          });
        });

        if (isOpen) {
          $submenu.css('height', $submenu[0].scrollHeight + 'px');
          requestAnimationFrame(() => {
            $submenu.css('height', '0');
            $parent.removeClass('open');
          });
        } else {
          $submenu.css('height', '0');
          $parent.addClass('open');
          requestAnimationFrame(() => {
            $submenu.css('height', $submenu[0].scrollHeight + 'px');
          });
        }
      });
    } else {
      $('.hasSub-menu > a').off('click');
      $('.sub-menu').removeAttr('style');
      $('.hasSub-menu').removeClass('open');
    }
  }

  // Initial bind
  bindAccordion();

  // Rebind on resize
  $(window).on('resize', function () {
    bindAccordion();
  });







  // Select File Code
  $('#myfile').on('change', function () {
    if (this.files.length > 0) {
      $('#fileNameText').text(this.files[0].name);
    } else {
      $('#fileNameText').text('Choose File');
    }
  });



  // Slick Sliders

  // Products Slider
  $('.productContSlider').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    centerMode: true,
    centerPadding: '0px',
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          centerMode: false,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        }
      },
    ]
  });

  // CareerSlick Sliders

  $('.psCareerSlideBox').slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    centerMode: true,
    centerPadding: '0px',
  });

  // Home Banner Slider
  $('.hmBannerImg').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    fade: true,
    asNavFor: '.hmBannerTitle'
  });

  $('.hmBannerTitle').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: '.hmBannerImg',
    dots: false,
    arrows: false,
    fade: true,
    centerMode: true,
    focusOnSelect: true
  });


  // Product Details Slider
  function initProductSlider($tab) {
    const $mainSlider = $tab.find('.productDetailSliderMain');
    const $thumbs = $tab.find('.productDetailSliderSub img');

    // Initialize main slider if not already done
    if (!$mainSlider.hasClass('slick-initialized')) {
      $mainSlider.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        dots: false
      });

      // Sync slider change to thumbnails
      $mainSlider.on('afterChange', function (event, slick, currentSlide) {
        $thumbs.removeClass('active');
        $thumbs.eq(currentSlide).addClass('active');
      });
    } else {
      // If already initialized, just refresh it
      $mainSlider.slick('setPosition');
    }

    // Set first thumbnail as active
    $thumbs.removeClass('active');
    $thumbs.eq(0).addClass('active');

    // On thumbnail click
    $thumbs.off('click').on('click', function () {
      const index = $(this).index();
      $mainSlider.slick('slickGoTo', index);
      $thumbs.removeClass('active');
      $(this).addClass('active');
    });
  }

  // Initial run on first visible tab
  initProductSlider($('.tab-content.active'));

  // Tab switching
  $(".tabBtn").click(function () {
    const tab_id = $(this).data("id");

    $(".tabBtn, .tab-content").removeClass("active");
    $(this).addClass("active");
    const $newTab = $("#" + tab_id).addClass("active");

    // Reinitialize slick and sync for the new tab
    initProductSlider($newTab);
  });




  // AOS Initialize
  AOS.init({
    once: false,
    mirror: false,
    offset: 50,
    duration: 800,
    easing: 'ease-in-out',
  });



});
