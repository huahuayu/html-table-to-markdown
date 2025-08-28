# Changelog

All notable changes to the Table to Markdown Chrome Extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.2] - 2025-08-29

### Changed

- Simplified popup by removing tabs permission dependency
- Removed status checking functionality from popup
- Streamlined popup to show only essential information: header, usage instructions, and GitHub link

### Removed

- `tabs` permission from manifest.json (no longer needed)
- Status indicator section from popup
- Complex popup JavaScript functionality

## [1.0.1] - 2025-08-26

### Added

- Extension popup with header, usage instructions, and GitHub link

## [1.0.0] - 2025-08-24

### 🎉 Initial Release

#### Added

- Core table detection functionality for all HTML tables on any webpage
- One-click copy button that appears on hover
- Automatic HTML to Markdown conversion with proper formatting
- Smart header detection (recognizes `<th>` elements and `<thead>` sections)
- Special character escaping (especially pipe characters)
- Support for dynamically loaded tables (AJAX/JavaScript)
- Clean, minimal UI with smooth animations
- Dark mode support (follows system preferences)
- Accessibility features (ARIA labels, keyboard navigation)
- High contrast mode support
- Reduced motion support for accessibility
- Comprehensive error handling
- Performance optimizations for smooth scrolling
- Works offline - no external dependencies

#### Technical Features

- Manifest V3 compliance for Chrome Web Store
- Memory-efficient DOM observation
- Hardware-accelerated animations
- Throttled scroll event handling
- Cross-browser compatibility (Chrome, Edge, Brave, Opera)

#### Security & Privacy

- No data collection or tracking
- No external API calls
- Minimal permissions (only clipboard write)
- Content Security Policy compliant
