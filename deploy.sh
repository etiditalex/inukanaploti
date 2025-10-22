#!/bin/bash

# Build and export the static site
echo "Building the website..."
npm run build
npm run export

# Create a temporary directory for deployment
mkdir -p deploy
cp -r out/* deploy/

# Create a simple index.html redirect for GitHub Pages
cat > deploy/index.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Inuka na Ploti</title>
    <meta http-equiv="refresh" content="0; url=./index.html">
</head>
<body>
    <p>Redirecting to <a href="./index.html">Inuka na Ploti</a>...</p>
</body>
</html>
EOF

echo "Deployment files ready in ./deploy directory"
echo "Upload the contents of ./deploy to your GitHub Pages repository"
