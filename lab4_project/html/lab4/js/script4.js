(function() {
    'use strict';

    let imagesLoaded = 0;
    const images = document.querySelectorAll('img');

    function imageLoadHandler() {
        imagesLoaded++;
        console.log('Script 4: Image loaded (' + imagesLoaded + '/' + images.length + ')');
    }

    window.addEventListener('load', function() {
        images.forEach(function(img) {
            if (img.complete) {
                imageLoadHandler();
            } else {
                img.addEventListener('load', imageLoadHandler);
            }
        });
    });
})();
