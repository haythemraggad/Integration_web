console.log('Build verification script running...');
console.log('Node version:', process.version);
console.log('NPM version:', process.env.npm_package_version);
console.log('Current directory:', process.cwd());
console.log('Directory contents:');

const fs = require('fs');
try {
  const files = fs.readdirSync('.');
  console.log(files);
  
  // Check tailwindcss exists
  console.log('\nChecking node_modules:');
  if (fs.existsSync('./node_modules/tailwindcss')) {
    console.log('✅ tailwindcss found in node_modules');
  } else {
    console.log('❌ tailwindcss NOT found in node_modules');
  }
  
  // Check if css directory exists
  console.log('\nChecking css directory:');
  if (fs.existsSync('./css')) {
    console.log('✅ css directory found');
    const cssFiles = fs.readdirSync('./css');
    console.log('CSS files:', cssFiles);
  } else {
    console.log('❌ css directory NOT found');
  }
  
  console.log('\nBuild verification completed');
} catch (error) {
  console.error('Error during verification:', error);
}
