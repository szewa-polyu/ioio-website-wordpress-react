//jQuery(document).ready(function($) {
console.log("portfolioJS Loaded")

trying()
function trying() {
  if (!$(".portfolio-item").size()) {
    console.log("wait for dom")
    window.requestAnimationFrame(trying);
  } else {
    portfolioJS()
  }
}

  function portfolioJS() {

    // Porfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({itemSelector: '.portfolio-item', layoutMode: 'fitRows'});

    $('#portfolio-flters li').on('click', function() {
      $("#portfolio-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');

      portfolioIsotope.isotope({filter: $(this).data('filter')});
    });

  }
