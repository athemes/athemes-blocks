/**
 * aThemes Blocks Parallax v2
 */
;(function( $ ) {

  'use strict';

  var botigaParallax = function() {

    var $window   = $(window),
        $parallax = $('.athemes-blocks-block-container-bg-effect-parallax'),
        winHeight = $window.height();

    $parallax.each( function() {

      var wrapper       = this,
          $wrapper      = $(this),
          wrapperRect   = wrapper.getBoundingClientRect(),
          wrapperHeight = wrapperRect.height,
          wrapperTop    = wrapperRect.top,
          wrapperBottom = wrapperRect.bottom;

      if ( wrapperTop < winHeight && wrapperBottom > 0 ) {

        $wrapper.find('> .athemes-blocks-background-image').each(function () {

          var image       = this,
              $image      = $(this),
              imageRect   = image.getBoundingClientRect(),
              imageHeight = imageRect.height,
              heightDiff  = wrapperHeight - imageHeight,
              speed       = 0.5,
              offset      = 0;

          var heightRatio  = winHeight + wrapperHeight,
              topRatio     = (wrapperTop - winHeight) * -1,
              outsideRatio = (((topRatio / heightRatio) - 0.5) * speed) + 0.5;

          offset = ((imageHeight + wrapperHeight) * outsideRatio) - imageHeight;

          $image.css('transform', 'translate3d(0, ' + offset + 'px, 0)');

        });

      }

    });

  };

  $(window).bind('scroll resize load', function () {
    botigaParallax();
  });

  $(document).ready( function() {
    botigaParallax();
  });

})( jQuery );