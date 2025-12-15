(function() {
    'use strict';

    window.addEventListener('load', function() {
        const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
        console.log('Script 5: Total CSS files: ' + stylesheets.length);

        stylesheets.forEach(function(sheet, index) {
            console.log('Script 5: CSS ' + (index + 1) + ': ' + sheet.href);
        });
    });
})();
