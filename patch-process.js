const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'components', 'cinematic', 'ProcessCinematic.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// Normalize line endings
content = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

const oldText = ` initial={{ opacity: 0 }}
 animate={inView ? { opacity: 1 } : { opacity: 0 }}
 transition={{ duration: 0.5, delay: reduced ? 0 : 0.5 + i * 0.12 }}`;

const newText = ` initial={{ opacity: 0, height: 0 }}
 animate={
 inView
 ? {
 opacity: 1,
 height: p.height,
 transition: {
 height: {
 duration: reduced ? 0 : 0.6,
 ease: [0.16, 1, 0.3, 1],
 delay: reduced ? 0 : 0.5 + i * 0.3,
 },
 opacity: {
 duration: 0.01,
 delay: reduced ? 0 : 0.5 + i * 0.3,
 },
 },
 }
 : { opacity: 0, height: 0 }
 }`;

if (!content.includes(oldText)) {
 console.error('ERROR: Pattern not found in file');
 console.log('Looking for:', JSON.stringify(oldText));
 process.exit(1);
}

content = content.replace(oldText, newText);
fs.writeFileSync(filePath, content, 'utf8');
console.log('SUCCESS: ProcessCinematic.jsx updated');
