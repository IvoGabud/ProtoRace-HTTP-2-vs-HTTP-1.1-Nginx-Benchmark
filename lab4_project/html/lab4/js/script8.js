(function() {
    'use strict';

    window.addEventListener('load', function() {
        const resources = performance.getEntriesByType('resource');
        const protocols = {};

        resources.forEach(function(resource) {
            const protocol = resource.nextHopProtocol || 'unknown';
            protocols[protocol] = (protocols[protocol] || 0) + 1;
        });

        console.log('Script 8: Protocols used:');
        for (const protocol in protocols) {
            console.log('  - ' + protocol + ': ' + protocols[protocol] + ' resources');
        }
    });
})();
