/**
 * HTML Table to Markdown Converter - Chrome Extension
 * Version: 1.0.2
 * Author: Shiming
 * License: MIT
 * 
 * Converts HTML tables to Markdown format with one-click copy functionality.
 */

(function () {
    'use strict';

    // State management
    let currentCopyButton = null;
    let currentTable = null;
    let hoverTimeout = null;
    let scrollUpdateRequested = false;

    /**
     * Convert HTML table to Markdown format
     * @param {HTMLTableElement} table - The table element to convert
     * @returns {string} Markdown formatted table
     */
    function tableToMarkdown(table) {
        const rows = [];
        const tableRows = table.querySelectorAll('tr');

        if (tableRows.length === 0) return '';

        // Process each row
        tableRows.forEach((row) => {
            const cells = row.querySelectorAll('th, td');
            const rowData = [];

            cells.forEach(cell => {
                // Extract and clean text content
                let text = (cell.textContent || cell.innerText || '').trim();

                if (text) {
                    // Escape pipe characters
                    text = text.replace(/\|/g, '\\|');
                    // Normalize whitespace
                    text = text.replace(/[\r\n\t]+/g, ' ').replace(/\s+/g, ' ');
                    // Remove control characters
                    text = text.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
                }

                rowData.push(text);
            });

            if (rowData.length > 0) {
                rows.push('| ' + rowData.join(' | ') + ' |');
            }
        });

        if (rows.length === 0) return '';

        // Detect header row (contains th elements or is in thead)
        const firstRow = tableRows[0];
        const hasHeader = firstRow.querySelectorAll('th').length > 0 ||
            firstRow.parentElement.tagName === 'THEAD';

        // Insert separator after header row
        const cellCount = firstRow.querySelectorAll('th, td').length;
        const separator = '| ' + Array(cellCount).fill('---').join(' | ') + ' |';

        if (hasHeader && rows.length > 0) {
            rows.splice(1, 0, separator);
        } else if (rows.length > 0) {
            // Add separator after first row if no header detected
            rows.splice(1, 0, separator);
        }

        return rows.join('\n');
    }

    /**
     * Copy text to clipboard using the most compatible method
     * @param {string} text - Text to copy
     * @returns {Promise<boolean>} Success status
     */
    async function copyToClipboard(text) {
        try {
            // Try modern clipboard API first
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(text);
                return true;
            }

            // Fallback to older execCommand method
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.cssText = 'position:fixed;left:-9999px;top:-9999px';
            document.body.appendChild(textArea);
            textArea.select();

            try {
                const successful = document.execCommand('copy');
                return successful;
            } finally {
                document.body.removeChild(textArea);
            }
        } catch (err) {
            console.error('Failed to copy to clipboard:', err);
            return false;
        }
    }

    /**
     * Create the copy button element
     * @returns {HTMLElement} The button element
     */
    function createCopyButton() {
        const button = document.createElement('div');
        button.className = 'table-to-markdown-copy-btn';
        button.setAttribute('role', 'button');
        button.setAttribute('aria-label', 'Copy table as Markdown');
        button.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
      </svg>
      <span class="tooltip">Copy as Markdown</span>
    `;

        button.addEventListener('click', handleCopyClick);
        return button;
    }

    /**
     * Handle copy button click
     * @param {Event} e - Click event
     */
    async function handleCopyClick(e) {
        e.stopPropagation();
        e.preventDefault();

        if (!currentTable) return;

        const button = currentCopyButton;
        const markdown = tableToMarkdown(currentTable);
        const success = await copyToClipboard(markdown);

        // Show feedback
        const tooltip = button.querySelector('.tooltip');
        const originalText = tooltip.textContent;

        if (success) {
            button.classList.add('copied');
            tooltip.textContent = 'Copied!';
        } else {
            tooltip.textContent = 'Failed to copy';
        }

        // Reset feedback after 2 seconds
        setTimeout(() => {
            button.classList.remove('copied');
            tooltip.textContent = originalText;
        }, 2000);
    }

    /**
     * Position the copy button relative to the table
     * @param {HTMLElement} button - The button element
     * @param {HTMLTableElement} table - The table element
     */
    function positionCopyButton(button, table) {
        const rect = table.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

        // Skip if table has no dimensions
        if (rect.width === 0 || rect.height === 0) return;

        // Use absolute positioning for proper scroll behavior
        button.style.position = 'absolute';
        button.style.top = (rect.top + scrollTop - 10) + 'px';
        button.style.left = (rect.right + scrollLeft - 40) + 'px';
        button.style.zIndex = '999999';

        // Adjust position if button would be outside viewport
        const buttonLeft = rect.right + scrollLeft - 40;
        if (buttonLeft + 36 > window.innerWidth + scrollLeft) {
            button.style.left = (rect.left + scrollLeft - 46) + 'px';
        }

        const buttonTop = rect.top + scrollTop - 10;
        if (buttonTop < scrollTop + 10) {
            button.style.top = (scrollTop + 10) + 'px';
        }
    }

    /**
     * Remove the current copy button
     */
    function removeCopyButton() {
        if (currentCopyButton?.parentNode) {
            currentCopyButton.remove();
            currentCopyButton = null;
        }
        currentTable = null;
    }

    /**
     * Handle table hover event
     * @param {HTMLTableElement} table - The hovered table
     */
    function handleTableHover(table) {
        // Clear any pending timeout
        if (hoverTimeout) {
            clearTimeout(hoverTimeout);
            hoverTimeout = null;
        }

        // Remove existing button if it's for a different table
        if (currentTable && currentTable !== table) {
            removeCopyButton();
        }

        // Create and show new button
        if (!currentCopyButton || currentTable !== table) {
            currentTable = table;
            currentCopyButton = createCopyButton();
            document.body.appendChild(currentCopyButton);
            positionCopyButton(currentCopyButton, table);

            // Fade in effect
            requestAnimationFrame(() => {
                if (currentCopyButton) {
                    currentCopyButton.classList.add('visible');
                }
            });
        }
    }

    /**
     * Handle mouse leave from table
     * @param {Event} e - Mouse leave event
     */
    function handleTableLeave(e) {
        const relatedTarget = e.relatedTarget;

        // Keep button if mouse moved to it
        if (relatedTarget && currentCopyButton?.contains(relatedTarget)) {
            return;
        }

        // Remove button after delay
        hoverTimeout = setTimeout(removeCopyButton, 300);
    }

    /**
     * Handle mouse enter on copy button
     */
    function handleButtonEnter() {
        if (hoverTimeout) {
            clearTimeout(hoverTimeout);
            hoverTimeout = null;
        }
    }

    /**
     * Handle mouse leave from copy button
     * @param {Event} e - Mouse leave event
     */
    function handleButtonLeave(e) {
        const relatedTarget = e.relatedTarget;

        // Keep button if mouse moved back to table
        if (relatedTarget && currentTable?.contains(relatedTarget)) {
            return;
        }

        // Remove button after delay
        hoverTimeout = setTimeout(removeCopyButton, 300);
    }

    /**
     * Setup event listeners for a table
     * @param {HTMLTableElement} table - The table element
     */
    function setupTableListeners(table) {
        if (table.dataset.tableToMarkdown) return;

        table.dataset.tableToMarkdown = 'true';
        table.addEventListener('mouseenter', () => handleTableHover(table));
        table.addEventListener('mouseleave', handleTableLeave);
    }

    /**
     * Initialize the extension
     */
    function init() {
        // Setup existing tables
        document.querySelectorAll('table').forEach(setupTableListeners);

        // Detect new tables via mouseover
        document.addEventListener('mouseover', (e) => {
            const table = e.target.closest('table');
            if (table) {
                setupTableListeners(table);
            }
        }, { passive: true });

        // Handle button hover events
        document.addEventListener('mouseover', (e) => {
            if (currentCopyButton?.contains(e.target)) {
                handleButtonEnter();
            }
        }, { passive: true });

        document.addEventListener('mouseout', (e) => {
            if (currentCopyButton?.contains(e.target)) {
                const relatedTarget = e.relatedTarget;
                if (!currentCopyButton.contains(relatedTarget)) {
                    handleButtonLeave(e);
                }
            }
        }, { passive: true });

        // Handle window resize
        window.addEventListener('resize', () => {
            if (currentCopyButton && currentTable) {
                positionCopyButton(currentCopyButton, currentTable);
            }
        }, { passive: true });

        // Handle scroll with optimized updates
        window.addEventListener('scroll', () => {
            if (currentCopyButton && currentTable && !scrollUpdateRequested) {
                scrollUpdateRequested = true;
                requestAnimationFrame(() => {
                    scrollUpdateRequested = false;

                    if (currentCopyButton && currentTable) {
                        const rect = currentTable.getBoundingClientRect();
                        // Check if table is visible
                        if (rect.bottom > 0 && rect.top < window.innerHeight &&
                            rect.right > 0 && rect.left < window.innerWidth) {
                            positionCopyButton(currentCopyButton, currentTable);
                        } else {
                            removeCopyButton();
                        }
                    }
                });
            }
        }, { passive: true });

        // Observe DOM changes for dynamically added tables
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) { // Element node
                        if (node.tagName === 'TABLE') {
                            setupTableListeners(node);
                        } else if (node.querySelectorAll) {
                            node.querySelectorAll('table').forEach(setupTableListeners);
                        }
                    }
                });
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();