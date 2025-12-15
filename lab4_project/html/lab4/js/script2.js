(function() {
    'use strict';

    window.addEventListener('load', function() {
        const resources = performance.getEntriesByType('resource');
        console.log('Script 2: Total resources loaded: ' + resources.length);

        resources.forEach(function(resource) {
            if (resource.nextHopProtocol === 'h2') {
                console.log('Script 2: HTTP/2 detected for: ' + resource.name);
            }
        });
    });
})();
