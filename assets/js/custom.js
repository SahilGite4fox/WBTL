$(document).ready(function () {

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



  // Sticky Header

  $(window).on("scroll", function () {
    $("header").toggleClass("stickyHead", $(this).scrollTop() > 0);
  });





  // Hamburger Menu
  $(".mobile_Menu > a").on("click", function () {
    $(".mobile_MenuContent").toggleClass("active");
    $("body").toggleClass("menu-open");

    if (!$(".menu-overlay").length) {
      $("header").append('<div class="menu-overlay"></div>');
    }
  });

  $(document).on("click", ".menu-overlay, .mobile_Menu_close", function () {
    $(".mobile_MenuContent").removeClass("active");
    $("body").removeClass("menu-open");
    $(".menu-overlay").remove();
  });



  function bindMobileDropdown() {
    if (window.matchMedia('(max-width: 950px)').matches) {
      $('.mobile_MenuContent li > a.d-flex').off('click').on('click', function (e) {
        e.preventDefault();

        const $dropdown = $(this).next('.dropdown');

        if ($dropdown.hasClass('open')) {
          // Collapse
          $dropdown.removeClass('open');
          $dropdown.css('height', $dropdown[0].scrollHeight + 'px'); // Set to current height first
          requestAnimationFrame(() => {
            $dropdown.css('height', '0');
          });
        } else {
          // Expand
          const fullHeight = $dropdown[0].scrollHeight + 'px';
          $dropdown.addClass('open');
          $dropdown.css('height', fullHeight);
        }

        // Optional: close others
        $('.dropdown').not($dropdown).removeClass('open').css('height', '0');
      });
    } else {
      // Unbind the dropdown click handler on wider screens
      $('.mobile_MenuContent li > a.d-flex').off('click');
      $('.dropdown').removeClass('open').css('height', ''); // Reset state
    }
  }

  // Run on page load
  bindMobileDropdown();

  // Run again on window resize
  $(window).on('resize', function () {
    bindMobileDropdown();
  });


  // Lazy Loading
  $("img, iframe").attr("loading", "lazy");



});
