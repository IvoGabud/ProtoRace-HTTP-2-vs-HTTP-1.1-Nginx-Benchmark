(function() {
    'use strict';

    window.addEventListener('load', function() {
        setTimeout(function() {
            const perfData = window.performance.timing;

            if (perfData.loadEventEnd && perfData.navigationStart) {
                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                console.log('Script 1: Page Load Time: ' + pageLoadTime + 'ms');
            }

            if (perfData.domainLookupEnd && perfData.domainLookupStart) {
                console.log('Script 1: DNS Lookup: ' + (perfData.domainLookupEnd - perfData.domainLookupStart) + 'ms');
            }

            if (perfData.connectEnd && perfData.connectStart) {
                console.log('Script 1: TCP Connection: ' + (perfData.connectEnd - perfData.connectStart) + 'ms');
            }
        }, 0);
    });
})();
