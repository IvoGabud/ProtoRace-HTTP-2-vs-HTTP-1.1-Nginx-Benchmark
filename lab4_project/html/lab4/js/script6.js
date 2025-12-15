(function() {
    'use strict';

    window.addEventListener('load', function() {
        const scripts = document.querySelectorAll('script[src]');
        console.log('Script 6: Total JS files: ' + scripts.length);

        scripts.forEach(function(script, index) {
            console.log('Script 6: JS ' + (index + 1) + ': ' + script.src);
        });
    });
})();
