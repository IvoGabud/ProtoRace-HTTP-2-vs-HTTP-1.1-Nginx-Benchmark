(function() {
    'use strict';

    window.addEventListener('load', function() {
        const perfData = window.performance.timing;
        const resources = performance.getEntriesByType('resource');

        const http2Resources = resources.filter(r => r.nextHopProtocol === 'h2');
        const isHTTP2 = http2Resources.length > 0;

        console.log('=== Script 10: FINAL PERFORMANCE SUMMARY ===');
        console.log('HTTP/2 Active: ' + (isHTTP2 ? 'YES' : 'NO'));
        console.log('Total Resources: ' + resources.length);
        console.log('HTTP/2 Resources: ' + http2Resources.length);
        console.log('Page Load Time: ' + (perfData.loadEventEnd - perfData.navigationStart) + 'ms');
        console.log('DOM Interactive: ' + (perfData.domInteractive - perfData.navigationStart) + 'ms');
        console.log('==========================================');

        const header = document.querySelector('header');
        if (header) {
            const badge = document.createElement('div');
            badge.className = 'protocol-badge';
            badge.classList.add(isHTTP2 ? 'http2' : 'http1');
            badge.textContent = isHTTP2 ? 'HTTP/2' : 'HTTP/1.x';
            header.appendChild(badge);
        }
    });
})();
