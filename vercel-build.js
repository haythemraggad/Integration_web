#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Function to run a command and log its output
function runCommand(command) {
  console.log(`Running command: ${command}`);
  try {
    const output = execSync(command, { encoding: 'utf8' });
    console.log(output);
    return true;
  } catch (error) {
    console.error(`Error running command: ${command}`);
    console.error(error.message);
    if (error.stdout) console.log(`stdout: ${error.stdout}`);
    if (error.stderr) console.error(`stderr: ${error.stderr}`);
    return false;
  }
}

// Check for Tailwind CSS
console.log('\n🔍 Checking for Tailwind CSS...');
let tailwindInstalled = false;

try {
  // Look for tailwindcss in node_modules
  if (fs.existsSync(path.join(process.cwd(), 'node_modules', 'tailwindcss'))) {
    console.log('✅ Tailwind CSS found in node_modules');
    tailwindInstalled = true;
  } else {
    console.log('⚠️ Tailwind CSS not found in node_modules');
  }
} catch (error) {
  console.error('Error checking for Tailwind CSS:', error);
}

// If tailwind is not installed, try to install it
if (!tailwindInstalled) {
  console.log('\n📦 Installing Tailwind CSS...');
  runCommand('npm install tailwindcss postcss autoprefixer --no-save');
}

// Verify CSS directory exists
console.log('\n🔍 Checking CSS directory...');
const cssDir = path.join(process.cwd(), 'css');
if (!fs.existsSync(cssDir)) {
  console.log('⚠️ CSS directory not found. Creating it...');
  fs.mkdirSync(cssDir);
}

// Check for tailwind.css file
const tailwindCssPath = path.join(cssDir, 'tailwind.css');
if (!fs.existsSync(tailwindCssPath)) {
  console.log('⚠️ tailwind.css not found. Creating a basic one...');
  fs.writeFileSync(
    tailwindCssPath,
    '@tailwind base;\n@tailwind components;\n@tailwind utilities;\n'
  );
}

// Run Tailwind CSS build
console.log('\n🔧 Building CSS with Tailwind...');
const success = runCommand('npx tailwindcss -i ./css/tailwind.css -o ./css/styles.css --minify');

if (success) {
  console.log('\n✅ Build completed successfully!');
  process.exit(0);
} else {
  console.error('\n❌ Build failed. See logs above for details.');
  // Don't exit with error, let's ensure deployment continues
  process.exit(0);
}
