function toggleMenu() {
  var nav = $(".site-header-nav").eq(0);
  if (nav.hasClass('site-header-nav-show')) {
    nav.removeClass('site-header-nav-show')
  } else {
    nav.addClass('site-header-nav-show')
  }
}

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


$(function() {
  $('.geopattern').each(function(){
    $(this).geopattern($(this).data('pattern-id'));
  });
});
