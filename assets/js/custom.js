$(document).ready(function () {

  

  // Tab Section
  $(".tabBtn").click(function () {
    var tab_id = $(this).data("id");

    $(".tabBtn, .tab-content").removeClass("active");
    $(this).addClass("active");
    $("#" + tab_id).addClass("active");

    // Reinitialize Slick slider inside the active tab
    $("#" + tab_id).find(".webStoriesSlider").slick("setPosition");
  });


  

// Slick Sliders

$('.productContSlider').slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: false,
  autoplaySpeed: 2000,
  centerMode: true,
  centerPadding: '0px',
});



  // AOS Initialize
  AOS.init({
    once: false,
    mirror: false,
    offset: 50,
    duration: 800,
    easing: 'ease-in-out',
  });


  $('.popup-youtube').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false,

    callbacks: {
      open: function () {
        $('html, body').addClass('no-scroll');
      },
      close: function () {
        $('html, body').removeClass('no-scroll');
      }
    }
  });




  // Sticky Header

  $(window).on("scroll", function () {
    $("header").toggleClass("stickyHead", $(this).scrollTop() > 0);
  });



  // Code to handle floating lable

  // Function to toggle 'active' class based on value or focus

  function toggleFloatingLabel($element) {
    const hasValue = $element.val() !== '' && (!$element.is('select') || $element.find('option:selected').val() !== '');
    const isFocused = $element.is(':focus');
    const $label = $element.siblings('.floating-label');

    $label.toggleClass('active', hasValue || isFocused);

    // 👇 Apply color change if it's a <select>
    if ($element.is('select')) {
      $element.toggleClass('has-value', hasValue);
    }
  }

  // Event handler for focus, blur, and change

  function handleFloatingLabel(event) {
    toggleFloatingLabel($(this));
  }

  // Apply event handlers to inputs and selects

  $('.floating-labelInp').on('focus blur change', 'input, select', handleFloatingLabel);

  // Check initial state on page load

  $('.floating-labelInp input, .floating-labelInp select').each(function () {
    toggleFloatingLabel($(this));
  });

  // Code to handle file type floating lable and file name

  // Function to update the file name and toggle the floating label

  function updateFileName(inputElement) {
    var fileName = $(inputElement).val().split('\\').pop();
    var $label = $(inputElement).next('.file-option').find('.floating-label');
    var $fileNameSpan = $(inputElement).next('.file-option').find('.file-name');

    if (fileName) {
      $fileNameSpan.text(fileName); // Update the file name display
      $label.addClass('active'); // Float the label
    } else {
      $fileNameSpan.text(' '); // Set default text
      $label.removeClass('active'); // Reset the label
    }
  }




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
