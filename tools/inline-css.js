#!/usr/bin/env node

/**
 * Inline CSS Tool
 * 
 * Takes an HTML email file with <style> blocks and inlines all CSS
 * for maximum email client compatibility.
 * 
 * Usage:
 *   node tools/inline-css.js <input-file> [output-file]
 *   npm run inline <input-file> [output-file]
 * 
 * If no output file is specified, creates [input-file].inlined.html
 */

const fs = require('fs');
const path = require('path');
const juice = require('juice');

// Parse command line arguments
const args = process.argv.slice(2);

if (args.length === 0) {
  console.error('Error: No input file specified');
  console.log('Usage: node tools/inline-css.js <input-file> [output-file]');
  process.exit(1);
}

const inputFile = args[0];
const outputFile = args[1] || inputFile.replace(/\.html$/, '.inlined.html');

// Check if input file exists
if (!fs.existsSync(inputFile)) {
  console.error(`Error: Input file not found: ${inputFile}`);
  process.exit(1);
}

try {
  console.log(`Reading HTML from: ${inputFile}`);
  const html = fs.readFileSync(inputFile, 'utf8');
  
  console.log('Inlining CSS...');
  const inlinedHtml = juice(html, {
    removeStyleTags: false, // Keep style tags for media queries
    preserveMediaQueries: true,
    preserveFontFaces: true,
    preserveImportant: true,
    applyWidthAttributes: true,
    applyHeightAttributes: true,
    applyAttributesTableElements: true,
  });
  
  console.log(`Writing inlined HTML to: ${outputFile}`);
  fs.writeFileSync(outputFile, inlinedHtml, 'utf8');
  
  console.log('✓ CSS inlining complete!');
  console.log(`  Input:  ${inputFile} (${fs.statSync(inputFile).size} bytes)`);
  console.log(`  Output: ${outputFile} (${fs.statSync(outputFile).size} bytes)`);
  
} catch (error) {
  console.error('Error during CSS inlining:', error.message);
  process.exit(1);
}

