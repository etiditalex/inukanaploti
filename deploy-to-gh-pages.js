#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting manual deployment to GitHub Pages...\n');

try {
  // Step 1: Build the project
  console.log('📦 Building Next.js project...');
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build completed successfully!\n');

  // Step 2: Check if out directory exists
  if (!fs.existsSync('./out')) {
    throw new Error('❌ Build failed - no "out" directory found');
  }

  // Step 3: List contents of out directory
  console.log('📁 Build output contents:');
  const outContents = fs.readdirSync('./out');
  outContents.forEach(item => {
    const itemPath = path.join('./out', item);
    const stats = fs.statSync(itemPath);
    if (stats.isDirectory()) {
      console.log(`  📁 ${item}/`);
    } else {
      console.log(`  📄 ${item}`);
    }
  });

  console.log('\n🎉 Manual deployment preparation complete!');
  console.log('\n📋 Next steps:');
  console.log('1. Go to your GitHub repository settings');
  console.log('2. Navigate to Pages settings');
  console.log('3. Select "Deploy from a branch"');
  console.log('4. Choose "gh-pages" branch or upload the "out" folder contents');
  console.log('\n🌐 Your site will be available at: https://etiditalex.github.io/inukanaploti');

} catch (error) {
  console.error('❌ Deployment failed:', error.message);
  process.exit(1);
}
