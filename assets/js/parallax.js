/**
 * aThemes Blocks Parallax v2
 */
document.addEventListener("DOMContentLoaded", function() {

  var parallax = document.querySelectorAll('.athemes-blocks-block-container-bg-effect-parallax');

  if ( parallax.length > 0 ) {

    window.addEventListener('scroll', function() {
      botigaParallax();
    });

    window.addEventListener('resize', function() {
      botigaParallax();
    });

    window.addEventListener('load', function() {
      botigaParallax();
    });

  }

  var botigaParallax = function() {

    for( var i = 0; i < parallax.length; i++ ) {
  
      var parallaxWrapper = parallax[i],
          wrapperRect     = parallaxWrapper.getBoundingClientRect(),
          wrapperHeight   = wrapperRect.height,
          wrapperTop      = wrapperRect.top,
          wrapperBottom   = wrapperRect.bottom,
          winHeight       = window.innerHeight;

      if ( wrapperTop < winHeight && wrapperBottom > 0 ) {

        var parallaxImage = parallaxWrapper.querySelector('.athemes-blocks-background-image');

        if ( ! parallaxImage ) {
          return;
        }

        var imageRect   = parallaxImage.getBoundingClientRect(),
            imageHeight = imageRect.height,
            heightDiff  = wrapperHeight - imageHeight,
            speed       = 0.5,
            offset      = 0;

        var heightRatio  = winHeight + wrapperHeight,
            topRatio     = (wrapperTop - winHeight) * -1,
            outsideRatio = (((topRatio / heightRatio) - 0.5) * speed) + 0.5;

        offset = ((imageHeight + wrapperHeight) * outsideRatio) - imageHeight;

        parallaxImage.style = 'transform: translate3d(0, ' + offset + 'px, 0);';

      }

    }

  };

});
