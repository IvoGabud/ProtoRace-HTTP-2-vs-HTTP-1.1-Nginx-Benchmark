(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        const perfData = window.performance.timing;
        const domContentLoadedTime = perfData.domContentLoadedEventEnd - perfData.navigationStart;
        console.log('Script 3: DOM Content Loaded: ' + domContentLoadedTime + 'ms');

        const elementCount = document.querySelectorAll('*').length;
        console.log('Script 3: Total DOM elements: ' + elementCount);
    });
})();
