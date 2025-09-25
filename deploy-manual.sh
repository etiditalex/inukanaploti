#!/bin/bash

# Manual deployment script for GitHub Pages
echo "🚀 Starting manual deployment..."

# Build the project
echo "📦 Building project..."
npm run build

# Check if out directory exists
if [ ! -d "out" ]; then
    echo "❌ Build failed - no 'out' directory found"
    exit 1
fi

echo "✅ Build completed successfully!"
echo "📁 Output directory: ./out"
echo ""
echo "🔧 Next steps:"
echo "1. Go to your repository settings"
echo "2. Go to Pages settings"
echo "3. Select 'Deploy from a branch'"
echo "4. Choose 'gh-pages' branch"
echo "5. Or upload the 'out' folder contents manually"
