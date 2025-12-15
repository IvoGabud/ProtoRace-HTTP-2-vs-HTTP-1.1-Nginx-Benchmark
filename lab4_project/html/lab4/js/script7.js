(function() {
    'use strict';

    window.addEventListener('load', function() {
        const resources = performance.getEntriesByType('resource');
        let totalTransferSize = 0;

        resources.forEach(function(resource) {
            totalTransferSize += resource.transferSize || 0;
        });

        console.log('Script 7: Total transfer size: ' + (totalTransferSize / 1024).toFixed(2) + ' KB');
        console.log('Script 7: Average resource time: ' +
            (resources.reduce((sum, r) => sum + r.duration, 0) / resources.length).toFixed(2) + 'ms');
    });
})();
