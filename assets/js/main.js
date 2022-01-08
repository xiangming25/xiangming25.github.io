function toggleMenu() {
  const width = $(document).width();
  if (width > 768) return
  var nav = $(".site-header-nav").eq(0);
  if (nav.hasClass('site-header-nav-show')) {
    nav.removeClass('site-header-nav-show')
  } else {
    nav.addClass('site-header-nav-show')
  }
}

$('#headerNavContainer').on('click', function (e) {
  e.stopPropagation()
})

function closeMenu() {
  var nav = $(".site-header-nav").eq(0);
  nav.removeClass('site-header-nav-show')
}

jQuery(function() {
  // 回到顶部
  function toTop () {
    var $toTop = $(".gotop");

    $(window).on("scroll", function () {
      if ($(window).scrollTop() >= $(window).height()) {
        $toTop.css("display", "block").fadeIn();
      } else {
        $toTop.fadeOut();
      }
    });

    $toTop.on("click", function (evt) {
      var $obj = $("body,html");
      $obj.animate({
        scrollTop: 0
      }, 240);

      evt.preventDefault();
    });
  }

  toTop();
});
