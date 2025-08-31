/**
 * Table to Markdown Extension Popup Script
 * Simple version - no tabs permission needed
 */

document.addEventListener('DOMContentLoaded', function () {
    // Simple popup initialization
    console.log('HTML Table to Markdown popup loaded');
    
    // Handle feedback button click
    const feedbackBtn = document.getElementById('feedbackBtn');
    if (feedbackBtn) {
        feedbackBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get extension version from manifest
            const versionElement = document.querySelector('.version');
            const version = versionElement ? versionElement.textContent : 'Unknown';
            
            // Get browser info
            const browserInfo = getBrowserInfo();
            
            // Create pre-filled issue body
            const issueTitle = encodeURIComponent('[Feedback] ');
            const issueBody = encodeURIComponent(
                `## Description\n` +
                `<!-- Please describe your feedback, bug report, or feature request here -->\n\n\n` +
                `## Steps to Reproduce (if applicable)\n` +
                `1. \n` +
                `2. \n` +
                `3. \n\n` +
                `## Expected Behavior\n` +
                `<!-- What did you expect to happen? -->\n\n\n` +
                `## Actual Behavior\n` +
                `<!-- What actually happened? -->\n\n\n` +
                `## Environment\n` +
                `- Extension Version: ${version}\n` +
                `- Browser: ${browserInfo.name} ${browserInfo.version}\n` +
                `- OS: ${browserInfo.os}\n` +
                `- URL (if specific to a website): \n\n` +
                `## Additional Context\n` +
                `<!-- Add any other context, screenshots, or information about the problem here -->\n`
            );
            
            // Open GitHub issue page with pre-filled content
            const issueUrl = `https://github.com/huahuayu/html-table-to-markdown/issues/new?title=${issueTitle}&body=${issueBody}`;
            chrome.tabs.create({ url: issueUrl });
        });
    }
});

/**
 * Get browser information
 * @returns {Object} Browser name, version, and OS
 */
function getBrowserInfo() {
    const userAgent = navigator.userAgent;
    let browserName = 'Chrome';
    let browserVersion = '';
    let os = 'Unknown OS';
    
    // Detect browser
    if (userAgent.includes('Edg/')) {
        browserName = 'Edge';
        browserVersion = userAgent.match(/Edg\/([0-9.]+)/)?.[1] || '';
    } else if (userAgent.includes('OPR/') || userAgent.includes('Opera/')) {
        browserName = 'Opera';
        browserVersion = userAgent.match(/(?:OPR|Opera)\/([0-9.]+)/)?.[1] || '';
    } else if (userAgent.includes('Chrome/')) {
        browserVersion = userAgent.match(/Chrome\/([0-9.]+)/)?.[1] || '';
    }
    
    // Detect OS
    if (userAgent.includes('Windows')) {
        os = 'Windows';
    } else if (userAgent.includes('Mac')) {
        os = 'macOS';
    } else if (userAgent.includes('Linux')) {
        os = 'Linux';
    } else if (userAgent.includes('Android')) {
        os = 'Android';
    }
    
    return {
        name: browserName,
        version: browserVersion,
        os: os
    };
}
