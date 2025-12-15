(function() {
    'use strict';

    window.addEventListener('load', function() {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Script 1: Page Load Time: ' + pageLoadTime + 'ms');

        console.log('Script 1: DNS Lookup: ' + (perfData.domainLookupEnd - perfData.domainLookupStart) + 'ms');
        console.log('Script 1: TCP Connection: ' + (perfData.connectEnd - perfData.connectStart) + 'ms');
    });
})();
