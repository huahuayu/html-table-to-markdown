#!/bin/bash

# Table to Markdown - Build Script for Chrome Web Store
# This script creates a production-ready ZIP file for submission

echo "🚀 Building Table to Markdown Extension..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Extension name
EXTENSION_NAME="html-table-to-markdown"
BUILD_DIR="build"
ZIP_NAME="${EXTENSION_NAME}.zip"

# Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf $BUILD_DIR
rm -f $ZIP_NAME

# Create build directory
echo "📁 Creating build directory..."
mkdir -p $BUILD_DIR
mkdir -p $BUILD_DIR/icons

# Check if icons exist
if [ ! -f "icons/icon-128.png" ]; then
    echo -e "${YELLOW}⚠️  Warning: Icon files not found!${NC}"
    echo "Please generate icons first. See ICON_GENERATION.md for instructions."
    echo "Opening icon generator..."
    open generate_icons.html 2>/dev/null || xdg-open generate_icons.html 2>/dev/null
    echo -e "${RED}Build incomplete. Generate icons and run build again.${NC}"
    exit 1
fi

# Copy required files
echo "📋 Copying required files..."
cp manifest.json $BUILD_DIR/
cp content.js $BUILD_DIR/
cp styles.css $BUILD_DIR/
cp popup.html $BUILD_DIR/
cp popup.js $BUILD_DIR/
cp popup.css $BUILD_DIR/
cp -r icons/*.png $BUILD_DIR/icons/ 2>/dev/null || echo "Icons not found, skipping..."

# Verify required files
echo "✅ Verifying build..."
REQUIRED_FILES=("manifest.json" "content.js" "styles.css" "popup.html" "popup.js" "popup.css")
for file in "${REQUIRED_FILES[@]}"; do
    if [ ! -f "$BUILD_DIR/$file" ]; then
        echo -e "${RED}❌ Error: Required file $file is missing!${NC}"
        exit 1
    fi
done

# Create ZIP file
echo "📦 Creating ZIP file..."
cd $BUILD_DIR
zip -r ../$ZIP_NAME . -x "*.DS_Store" -x "__MACOSX/*"
cd ..

# Clean up build directory
rm -rf $BUILD_DIR

# Final verification
if [ -f "$ZIP_NAME" ]; then
    SIZE=$(du -h "$ZIP_NAME" | cut -f1)
    echo -e "${GREEN}✅ Build successful!${NC}"
    echo "📦 Package: $ZIP_NAME ($SIZE)"
    echo ""
    echo "Next steps:"
    echo "1. Upload $ZIP_NAME to Chrome Web Store"
    echo "2. Fill in store listing details"
    echo "3. Add screenshots (1280x800 or 640x400)"
    echo "4. Submit for review"
else
    echo -e "${RED}❌ Build failed!${NC}"
    exit 1
fi
