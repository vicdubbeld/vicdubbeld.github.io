(function ($) {
  var $window = $(window),
    $body = $("body"),
    $sidebar = $("#sidebar");

  // Breakpoints.
  breakpoints({
    xlarge: ["1281px", "1680px"],
    large: ["981px", "1280px"],
    medium: ["737px", "980px"],
    small: ["481px", "736px"],
    xsmall: [null, "480px"],
  });

  // Hack: Enable IE flexbox workarounds.
  if (browser.name == "ie") $body.addClass("is-ie");

  // Play initial animations on page load.
  $window.on("load", function () {
    window.setTimeout(function () {
      $body.removeClass("is-preload");
    }, 100);
  });

  // Forms.

  // Hack: Activate non-input submits.
  $("form").on("click", ".submit", function (event) {
    // Stop propagation, default.
    event.stopPropagation();
    event.preventDefault();

    // Submit form.
    $(this).parents("form").submit();
  });

  // Sidebar.
  if ($sidebar.length > 0) {
    var $sidebar_a = $sidebar.find("a");

    $sidebar_a
      .addClass("scrolly")
      .on("click", function () {
        var $this = $(this);

        // External link? Bail.
        if ($this.attr("href").charAt(0) != "#") return;

        // Deactivate all links.
        $sidebar_a.removeClass("active");

        // Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
        $this.addClass("active").addClass("active-locked");
      })
      .each(function () {
        var $this = $(this),
          id = $this.attr("href"),
          $section = $(id);

        // No section for this link? Bail.
        if ($section.length < 1) return;

        // Scrollex.
        $section.scrollex({
          mode: "middle",
          top: "-20vh",
          bottom: "-20vh",
          initialize: function () {
            // Deactivate section.
            $section.addClass("inactive");
          },
          enter: function () {
            // Activate section.
            $section.removeClass("inactive");

            // No locked links? Deactivate all links and activate this section's one.
            if ($sidebar_a.filter(".active-locked").length == 0) {
              $sidebar_a.removeClass("active");
              $this.addClass("active");
            }

            // Otherwise, if this section's link is the one that's locked, unlock it.
            else if ($this.hasClass("active-locked"))
              $this.removeClass("active-locked");
          },
        });
      });
  }

  // Scrolly.
  $(".scrolly").scrolly({
    speed: 1000,
    offset: function () {
      // If <=large, >small, and sidebar is present, use its height as the offset.
      if (
        breakpoints.active("<=large") &&
        !breakpoints.active("<=small") &&
        $sidebar.length > 0
      )
        return $sidebar.height();

      return 0;
    },
  });

  // Spotlights.
  $(".spotlights > section")
    .scrollex({
      mode: "middle",
      top: "-10vh",
      bottom: "-10vh",
      initialize: function () {
        // Deactivate section.
        $(this).addClass("inactive");
      },
      enter: function () {
        // Activate section.
        $(this).removeClass("inactive");
      },
    })
    .each(function () {
      var $this = $(this),
        $image = $this.find(".image"),
        $img = $image.find("img"),
        x;

      // Assign image.
      $image.css("background-image", "url(" + $img.attr("src") + ")");

      // Set background position.
      if ((x = $img.data("position"))) $image.css("background-position", x);

      // Hide <img>.
      $img.hide();
    });

  // Features.
  $(".features").scrollex({
    mode: "middle",
    top: "-20vh",
    bottom: "-20vh",
    initialize: function () {
      // Deactivate section.
      $(this).addClass("inactive");
    },
    enter: function () {
      // Activate section.
      $(this).removeClass("inactive");
    },
  });
  // // Movement animation to happen
  // const inner = document.querySelector(".inner");
  // // Item to animate
  // const title = document.querySelector(".title");

  // // Moving animation Event
  // inner.addEventListener("mousemove", (e) => {
  //   let xAxis = (window.innerWidth / 2 - e.pageX) / 25;
  //   let yAxis = (window.innerHeight / 2 - e.pageY) / 25;
  //   inner.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
  // });

  // // Animate in
  // inner.addEventListener("mouseenter", (e) => {
  //   // Popout
  //   title.style.transform = "translateZ(200px) rotateZ(-45deg)";
  // });

  // // Animate out
  // inner.addEventListener("mouseleave", (e) => {
  //   title.style.transform = "translateZ(0px) rotateZ(0deg)";
  // });
})(jQuery);
