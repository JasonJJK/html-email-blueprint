#!/usr/bin/env node

/**
 * Test Email Sender
 * 
 * Sends test emails via SMTP for real-world inbox testing.
 * Requires .env file with SMTP configuration.
 * 
 * Usage:
 *   node tools/send-test.js <email-file> [recipient-email]
 *   npm run test-send <email-file>
 * 
 * Environment variables required (in .env):
 *   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
 *   TEST_FROM_EMAIL, TEST_FROM_NAME
 *   TEST_TO_EMAIL (default recipient)
 */

const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Parse command line arguments
const args = process.argv.slice(2);

if (args.length === 0) {
  console.error('Error: No email file specified');
  console.log('Usage: node tools/send-test.js <email-file> [recipient-email]');
  process.exit(1);
}

const emailFile = args[0];
const recipientEmail = args[1] || process.env.TEST_TO_EMAIL;

// Validate environment variables
const requiredEnvVars = [
  'SMTP_HOST',
  'SMTP_PORT', 
  'SMTP_USER',
  'SMTP_PASS',
  'TEST_FROM_EMAIL',
];

const missingVars = requiredEnvVars.filter(v => !process.env[v]);
if (missingVars.length > 0) {
  console.error('Error: Missing required environment variables:');
  missingVars.forEach(v => console.error(`  - ${v}`));
  console.log('\nPlease create a .env file based on .env.example');
  process.exit(1);
}

if (!recipientEmail) {
  console.error('Error: No recipient email specified');
  console.log('Provide recipient as argument or set TEST_TO_EMAIL in .env');
  process.exit(1);
}

// Check if email file exists
if (!fs.existsSync(emailFile)) {
  console.error(`Error: Email file not found: ${emailFile}`);
  process.exit(1);
}

// Extract subject from HTML title tag or use filename
let emailHtml;
try {
  emailHtml = fs.readFileSync(emailFile, 'utf8');
} catch (error) {
  console.error(`Error reading file: ${error.message}`);
  process.exit(1);
}

const titleMatch = emailHtml.match(/<title>([^<]+)<\/title>/i);
const subject = titleMatch 
  ? titleMatch[1] 
  : `Test: ${path.basename(emailFile, '.html')}`;

// Create SMTP transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Email options
const mailOptions = {
  from: `"${process.env.TEST_FROM_NAME || 'Email Test'}" <${process.env.TEST_FROM_EMAIL}>`,
  to: recipientEmail,
  subject: subject,
  html: emailHtml,
};

console.log('Sending test email...');
console.log('─'.repeat(60));
console.log(`  From:    ${mailOptions.from}`);
console.log(`  To:      ${recipientEmail}`);
console.log(`  Subject: ${subject}`);
console.log(`  File:    ${emailFile}`);
console.log('─'.repeat(60));

// Send email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('❌ Error sending email:', error.message);
    process.exit(1);
  }
  
  console.log('✓ Email sent successfully!');
  console.log(`  Message ID: ${info.messageId}`);
  
  if (info.accepted.length > 0) {
    console.log(`  Accepted: ${info.accepted.join(', ')}`);
  }
  if (info.rejected.length > 0) {
    console.log(`  Rejected: ${info.rejected.join(', ')}`);
  }
  
  console.log('\nCheck your inbox to verify rendering!');
});

