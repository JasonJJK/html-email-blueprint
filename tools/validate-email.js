#!/usr/bin/env node

/**
 * Email HTML Validator
 * 
 * Validates HTML email files against email-specific requirements:
 * - No external stylesheets
 * - No JavaScript
 * - Table-based structure
 * - Proper DOCTYPE and meta tags
 * - 600px max width adherence
 * 
 * Usage:
 *   node tools/validate-email.js <file-or-glob>
 *   npm run validate <file>
 */

const fs = require('fs');
const path = require('path');
const { HtmlValidate } = require('html-validate');

// Custom email-specific validation rules
const emailRules = {
  extends: ['html-validate:recommended'],
  rules: {
    // Relax some standard web rules for email
    'require-sri': 'off',
    'no-inline-style': 'off', // Required for email
    'attribute-boolean-style': 'off',
    'no-trailing-whitespace': 'off',
    
    // Strict rules for email
    'no-deprecated': 'error',
    'element-required-attributes': 'error',
    'element-permitted-content': 'error',
  },
  elements: [
    'html5',
  ],
};

// Parse command line arguments
const args = process.argv.slice(2);

if (args.length === 0) {
  console.error('Error: No input file(s) specified');
  console.log('Usage: node tools/validate-email.js <file-or-pattern>');
  process.exit(1);
}

const htmlvalidate = new HtmlValidate(emailRules);
let hasErrors = false;
let filesChecked = 0;

// Check each file argument
for (const fileArg of args) {
  if (!fs.existsSync(fileArg)) {
    console.error(`Error: File not found: ${fileArg}`);
    hasErrors = true;
    continue;
  }
  
  filesChecked++;
  console.log(`\nValidating: ${fileArg}`);
  console.log('─'.repeat(60));
  
  const html = fs.readFileSync(fileArg, 'utf8');
  
  // Custom email-specific checks
  const emailErrors = [];
  const emailWarnings = [];
  
  // Check 1: Must have DOCTYPE
  if (!html.match(/<!DOCTYPE html>/i)) {
    emailErrors.push('Missing <!DOCTYPE html> declaration');
  }
  
  // Check 2: No external stylesheets
  if (html.match(/<link[^>]+rel=["']stylesheet["']/i)) {
    emailErrors.push('External stylesheets not allowed in email HTML');
  }
  
  // Check 3: No JavaScript
  if (html.match(/<script/i) || html.match(/\son\w+\s*=/i)) {
    emailErrors.push('JavaScript not allowed in email HTML');
  }
  
  // Check 4: No forms
  if (html.match(/<form/i) || html.match(/<input/i)) {
    emailErrors.push('Form elements not supported in email HTML');
  }
  
  // Check 5: Must have required meta tags
  if (!html.match(/<meta charset/i)) {
    emailWarnings.push('Missing <meta charset="utf-8"> tag');
  }
  if (!html.match(/<meta name=["']viewport["']/i)) {
    emailWarnings.push('Missing viewport meta tag');
  }
  
  // Check 6: Should use table-based layout
  const tableCount = (html.match(/<table/gi) || []).length;
  const divCount = (html.match(/<div/gi) || []).length;
  if (divCount > tableCount) {
    emailWarnings.push(`More divs (${divCount}) than tables (${tableCount}) - consider table-based layout`);
  }
  
  // Check 7: Recommended max-width
  const widthMatches = html.match(/width[:"'\s=]+(\d+)/gi);
  if (widthMatches) {
    widthMatches.forEach(match => {
      const width = parseInt(match.match(/\d+/)[0]);
      if (width > 650) {
        emailWarnings.push(`Found width > 650px (${width}px) - emails should be max 600-650px wide`);
      }
    });
  }
  
  // Run html-validate
  const report = htmlvalidate.validateString(html);
  
  // Display custom email errors
  if (emailErrors.length > 0) {
    hasErrors = true;
    console.log('❌ Email-Specific Errors:');
    emailErrors.forEach(err => console.log(`   - ${err}`));
  }
  
  // Display custom email warnings
  if (emailWarnings.length > 0) {
    console.log('⚠️  Email-Specific Warnings:');
    emailWarnings.forEach(warn => console.log(`   - ${warn}`));
  }
  
  // Display html-validate results
  const hasHtmlErrors = report.results && report.results.some(r => r.errorCount > 0);
  if (hasHtmlErrors) {
    hasErrors = true;
    console.log('\n❌ HTML Validation Errors:');
    report.results.forEach(result => {
      result.messages.forEach(msg => {
        if (msg.severity === 2) { // Only show errors, not warnings
          console.log(`   [ERROR] Line ${msg.line}:${msg.column} - ${msg.message}`);
        }
      });
    });
  }
  
  // Summary for this file
  const htmlErrorCount = report.results ? report.results.reduce((sum, r) => sum + r.errorCount, 0) : 0;
  if (emailErrors.length === 0 && htmlErrorCount === 0) {
    console.log('✓ Validation passed!');
  } else {
    console.log(`\n✗ Validation failed with ${emailErrors.length + htmlErrorCount} error(s)`);
  }
}

console.log('\n' + '='.repeat(60));
console.log(`Checked ${filesChecked} file(s)`);

if (hasErrors) {
  console.log('❌ Validation failed - please fix errors above');
  process.exit(1);
} else {
  console.log('✓ All files passed validation!');
  process.exit(0);
}

